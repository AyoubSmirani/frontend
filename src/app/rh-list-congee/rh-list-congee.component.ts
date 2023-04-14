import { Component, OnInit, ViewChild,Inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpSerService } from '../http-ser.service';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { LoadingSerService } from '../loading-ser.service';
import { Pipe, PipeTransform } from '@angular/core';
import { FilterPipe } from './pipe';
import { IconName } from 'ngx-bootstrap-icons';
@Component({
  selector: 'app-rh-list-congee',
  templateUrl: './rh-list-congee.component.html',
  styleUrls: ['./rh-list-congee.component.css'],
 
})



export class RhListCongeeComponent implements OnInit {

  // Tableau qui va contenir les demandes de congés
  public data: any = [];
  //
  searchText: string = '';
  perPage: number = 6;
  currentPage: number = 1;
  totalRecords: number = this.data.length;
  selectedResponse:any = {confirmation:'',iconName:'',iconcolor:''}

  listResponse: { confirmation: string; iconName: IconName  ,iconcolor:string}[] = [
    {confirmation:'tout',iconName:'grid-3x3-gap-fill',iconcolor:''},
    {confirmation:'confirmé',iconName:'check-circle-fill',iconcolor:'color: #28a745;'},
    {confirmation:'refusé',iconName:'x-circle-fill',iconcolor:'color:#dc3545'},
    {confirmation:'confirmé par le chef',iconName:'check-circle-fill',iconcolor:'color:yellow;'}
  ]


  navigateToFirstPage(): void {
    this.currentPage = 1;
  }

  // Instance de la classe DatePipe pour formater les dates
  datePipe = new DatePipe('en-US');
// Injection de dépendances pour HttpSerService et ActivatedRoute
  constructor(
    private http: HttpSerService,
    public dialog: MatDialog,
    private load: LoadingSerService
  ) { }

  // Fonction pour formater une date
  formatDate(dateString: string) {
    const date = new Date(dateString);
    return this.datePipe.transform(date, 'dd-MM-yyyy');
  }

  ngOnInit(): void {
    // Récupération des demandes de congés depuis le serveur
    this.http.getAllRhCongee().subscribe((data) => {
      this.load.hideLoader(); // Masquage du loader
      this.data = data;
     
    }, (err) => {
      console.log(err);
    })
  }

  // Fonction appelée lorsqu'on répond à une demande de congé
  repondre(matricule: string, id: number, confirmation: string) {
    this.http.RhUpdateCongee({ id, confirmation }).subscribe((data) => {
      console.log(data)
      let notif = {
        message: '',
        matricule: matricule
      }
      console.log(this.selectedResponse)
      // Si la demande de congé est confirmée
      if (confirmation === 'confirmé') {
        notif.message = `votre demmande du congée id : ${id} est confirmée`;
      } else { // Si la demande de congé est refusée
        notif.message = `votre demmande du congée id : ${id} est refusé`;
      }

      // Envoi de la notification à l'utilisateur
      this.http.sendNotification(notif).subscribe((data) => {
        this.ngOnInit(); // Rafraîchissement des données
      }, (err) => {
        console.log(err);
      })
    }, (err) => {
      console.log(err);
    })
  }

  // Fonction appelée lorsqu'on veut afficher la justification d'une demande de congé
  public toggleContent(justification: any) {
    this.dialog.open(imageJust, {
      data: {
        justification: justification,
      },
    });
  }



  onSelect() {
   console.log(this.selectedResponse)
  }











}

// Interface pour la boîte de dialogue qui affiche la justification d'une demande de congé
export interface DialogData {
  justification: string;
}

@Component({
  selector: 'image-just',
  templateUrl: 'image-just.html',
})

// Classe de la boîte de dialogue qui affiche la justification d'une demande de congé
export class imageJust {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) { }
}