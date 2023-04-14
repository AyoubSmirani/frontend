
import { Component, OnInit, ViewChild,Inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpSerService } from '../http-ser.service';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { LoadingSerService } from '../loading-ser.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chef-list-conge',
  templateUrl: './chef-list-conge.component.html',
  styleUrls: ['./chef-list-conge.component.css']
})
export class ChefListCongeComponent implements OnInit{
  matricule: any;
  
  // Tableau qui va contenir les demandes de congés
  public data: any = [];
  perPage: number = 4;
  currentPage: number = 1;
  totalRecords: number = this.data.length;
  // Instance de la classe DatePipe pour formater les dates
  datePipe = new DatePipe('en-US');
// Injection de dépendances pour HttpSerService et ActivatedRoute
  constructor(
    private http: HttpSerService,
    private Activated:ActivatedRoute,
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
    this.matricule = this.Activated.snapshot.paramMap.get('matricule')  // récupération du matricule depuis la route
     this.http.getAllChefDemande(this.matricule).subscribe((data)=>{
      this.load.hideLoader(); // Masquage du loader
      this.data = data;
     },(err)=>{
      console.log(err);
     }) 

  }

  // Fonction appelée lorsqu'on répond à une demande de congé
  repondre(matricule: string, id: number, confirmation: string,EnvoieRh:boolean) {


    this.http.UpdateCongeeChef({ id, confirmation, EnvoieRh }).subscribe((data) => {
      console.log(data)
      let notif = {
        message: '',
        matricule: matricule
      }
      // Si la demande de congé est confirmée
      if (confirmation === 'confirmé par le chef') {
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

  
  navigateToFirstPage(): void {
    this.currentPage = 1;
  }


  // Fonction appelée lorsqu'on veut afficher la justification d'une demande de congé
  public toggleContent(justification: any) {
    this.dialog.open(imageJust, {
      data: {
        justification: justification,
      },
    });
  }
}
// Interface pour la boîte de dialogue qui affiche la justification d'une demande de congé
export interface DialogData {
  justification: string;
}

@Component({
  selector: 'image-just',
  templateUrl: '../rh-list-congee/image-just.html',
})

// Classe de la boîte de dialogue qui affiche la justification d'une demande de congé
export class imageJust {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) { }
}