import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpSerService } from '../http-ser.service';
import { LoadingSerService } from '../loading-ser.service';

@Component({
  selector: 'app-chef-voir-demande',
  templateUrl: './chef-voir-demande.component.html',
  styleUrls: ['./chef-voir-demande.component.css']
})
export class ChefVoirDemandeComponent {
  matricule!:string // Matricule de l'utilisateur
  data:any = []; // Liste des demandes de congé de l'utilisateur
  perPage: number = 4;
  currentPage: number = 1;
  totalRecords: number = this.data.length;
 
  datePipe = new DatePipe('en-US'); // Utilisation du pipe de date en format américain pour formater les dates
  // declaration des des services
 constructor(private http:HttpSerService,private Activated:ActivatedRoute,private load:LoadingSerService) { }

 // Fonction pour formater une date en string au format "dd-MM-yyyy"
 formatDate(dateString: string) {
   const date = new Date(dateString);
   return this.datePipe.transform(date, 'dd-MM-yyyy');
 }
 
   // Appelé au chargement de la page
 ngOnInit(): void {
    // Récupération du matricule de l'utilisateur depuis les paramètres de l'URL
   this.matricule = this.Activated.snapshot.paramMap.get('matricule')!
   // Appel du service Http pour récupérer la liste des demandes de congé de l'utilisateur
   this.http.getLISTECongee(this.matricule).subscribe( (data)=>{
     this.load.hideLoader() // Masquer le loader de chargement
     console.log(data)
     this.data = data // Enregistrer la liste des demandes de congé dans la variable "data" de la classe
   },(err)=>{
       console.log(err) // Afficher l'erreur dans la console pour debug
   })
   
 }

 navigateToFirstPage(): void {
   this.currentPage = 1;
 }
}
