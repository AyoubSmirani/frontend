
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';

import { HttpSerService } from '../http-ser.service';
import { LoadingSerService } from '../loading-ser.service';
@Component({
  selector: 'app-chef-navbar',
  templateUrl: './chef-navbar.component.html',
  styleUrls: ['./chef-navbar.component.css']
})
export class ChefNavbarComponent implements OnInit{
   
    
    // On injecte les services nécessaires pour le component
    constructor(private http:HttpSerService,private activated:ActivatedRoute,private router:Router,private load:LoadingSerService){}
    // On définit les propriétés nécessaires
     data!:any  // données de l'employé
     matricule!:string | null // matricule de l'employé connecté
     count:any // nombre de notifications non-lues
     Notification:boolean = false // variable pour afficher/cacher les notifications
     NotificationNotSeenCount:number = 0; // nombre de notifications non-lues
   
     ngOnInit(): void {
        // On récupère le matricule de l'employé connecté depuis l'URL
       this.matricule = this.activated.snapshot.paramMap.get('matricule')
       // On récupère les données de l'employé connecté
       this.http.getEmploye(this.matricule!).subscribe( (data)=>{
                 
           // On récupère les notifications de l'employé connecté 
                 this.http.getNotification(this.matricule).subscribe((data:any)=>{      
                   // On compte le nombre de notifications non-lues  
                   for(let i=0;i<data.length;i++){
                     if(!data[i].vu){
                      this.NotificationNotSeenCount += 1
                     }
                 } 
                 },(err)=>{
                         console.log(err)
                }) 
         // On stocke les données de l'employé dans la propriété 'data'        
         this.data = data   
       },
       (err)=>{
         console.log(err)
       } )
     }
   
   
   
   // Fonction pour ouvrir ou fermer la notification
   openCloseNotification(){
     // On utilise le négation (!) pour inverser la valeur de la variable "Notification"
     this.Notification = !this.Notification
     console.log(this.Notification)
   }
   

   
   // Fonction pour naviguer vers la page de profil de l'employé
   directeurEquipe(){
     // Vérifier si l'utilisateur n'est pas déjà sur la page de profil de directeur Equipe
     if( this.router.url!=`/directeurEquipe/${this.matricule}`){
         // Afficher le loader (indicateur de chargement) pendant le chargement de la page
         this.load.showLoader();
     }
     // Naviguer vers la page de profil de l'employé en incluant le matricule dans l'URL
     this.router.navigate(['directeurEquipe/',this.matricule])
   }

   directeurEquipeDemandeCongee(){
    // Vérifier si l'utilisateur n'est pas déjà sur la page de profil de directeur Equipe
    if( this.router.url!=`/directeurEquipeDemandecongee/${this.matricule}`){
      // Afficher le loader (indicateur de chargement) pendant le chargement de la page
      this.load.showLoader();
  }
  // Naviguer vers la page de profil de l'employé en incluant le matricule dans l'URL
  this.router.navigate(['directeurEquipeDemandecongee/',this.matricule])
   }
   directeurEquipeVoirDemandeCongee(){
        // Vérifier si l'utilisateur n'est pas déjà sur la page de profil de directeur Equipe
        if( this.router.url!=`/directeurEquipeVoirDemandecongee/${this.matricule}`){
          // Afficher le loader (indicateur de chargement) pendant le chargement de la page
          this.load.showLoader();
      }
      // Naviguer vers la page de profil de l'employé en incluant le matricule dans l'URL
      this.router.navigate(['directeurEquipeVoirDemandecongee/',this.matricule])
   }
   deconnection(){
    localStorage.removeItem('token')
    this.router.navigate(['login'])
  }
  

}