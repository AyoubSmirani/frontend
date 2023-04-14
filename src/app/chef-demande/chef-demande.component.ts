import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IButtonGroupEventArgs } from 'igniteui-angular';
import { delay } from 'rxjs';
import { HttpSerService } from '../http-ser.service';
import { LoadingSerService } from '../loading-ser.service';

@Component({
  selector: 'app-chef-demande',
  templateUrl: './chef-demande.component.html',
  styleUrls: ['./chef-demande.component.scss']
})
export class ChefDemandeComponent {
 // Variable pour le choix du mode d'affichage (linéaire ou non-linéaire)
 public linear = false;
 // Variable pour stocker les données de l'utilisateur
 data!:any 
 // Variable pour stocker le matricule de l'utilisateur
 matricule!:string | null
 chefMatricule!:string
 // Variables pour la vérification de la taille et du type du fichier sélectionné
 controleFileSize:boolean = true
 controleFileType:boolean = true
  Alerttitle!: string;
  message!: string;
// chouf il stepper fil site 5atar fasa5t minha controle saisie
// declaration des services
constructor(private http:HttpSerService,private activated:ActivatedRoute,private load:LoadingSerService){}
// Objet utilisateur avec des valeurs par défaut
 public user: any = {
   
     dateDepart: new Date(),
     item:'',
     items:['type1','type2','type3'] ,
     dateRetour: new Date(),
     image:'',
     duree:0,
     EnvoieRh:1
 };
 
 


// Méthode pour vérifier si la date de retour est supérieure ou égale à la date de départ
 isDateRetourSupDateDepart(): boolean {
   const today = new Date();
   const depart = new Date(this.user.dateDepart);
   const retour = new Date(this.user.dateRetour);
 
   return !!(this.user.dateDepart && this.user.dateRetour && depart >= today && retour >= depart && retour.getTime() !== depart.getTime());
 }
 // Méthode pour vérifier si le formulaire est valide
 isFormValid(): boolean {
   return !!this.user.dateDepart && !!this.user.dateRetour && this.isDateRetourSupDateDepart()
    && this.controleFileSize && this.controleFileType && this.user.item !== '' && this.user.image !== '';
 }

 ngOnInit(): void {

   // Récupération du numéro de matricule depuis l'URL
   this.matricule = this.activated.snapshot.paramMap.get('matricule')
   // Appel au serveur pour récupérer les informations de l'employé correspondant
   this.http.getEmploye(this.matricule!).subscribe( (data)=>{
     this.load.hideLoader() // Masquage du spinner de chargement
     delay(10000) // Attendre 10 secondes (Fonction 'delay' non définie)
     console.log(data)
     this.data = data
      // Stockage des informations de l'employé dans la variable 'data'     
   },
   (err)=>{
     // Affichage d'une erreur en cas de problème de récupération d'employe
     console.log(err)
   } )
 }









// Tableau de choix de mode d'affichage
 public modes: any[] = [
     {
         label: 'Linear', linear: true,
         selected: this.linear === true, togglable: true
     },
     {
         label: 'Non Linear', linear: false,
         selected: this.linear === false, togglable: true
     }
 ];
// Méthode pour changer le mode d'affichage
 public toggleModes(event: IButtonGroupEventArgs): void {
     this.linear = this.modes[event.index].linear;
 }

// Méthode pour sélectionner une image
 selectImage(e:any){
   console.log(e.target.files[0].type )
   // Vérification de la taille du fichier
   if(e.target.files[0].size > 2000704 ){   
        this.controleFileSize = false
        console.log('taille')
   }else{
     this.controleFileSize = true;
   }
   // Vérification du type du fichier
   if(e.target.files[0].type !== 'image/png'){
     if(e.target.files[0].type !== 'image/jpeg'){
       this.controleFileType = false
     }else{
       this.controleFileType = true
     }
   }else{
     this.controleFileType = true
   }
   // Stockage de l'image sélectionnée
   this.user.image = e.target.files[0];
   console.log(this.user.image)
  }



  


// Méthode pour envoyer les données du formulaire
  sendData(){



    if(!this.isFormValid()){
      this.Alerttitle = 'données incorrect'
       this.message = 'les données saisie sont incorrect'        
   }


   else{
    this.Alerttitle = 'confirmation'
   console.log(this.data.SchefEquipe)
   // Récupérer la date de départ sous forme de jour, mois et année séparés
   let day1 = this.user.dateDepart.getDate();
  let month1 = this.user.dateDepart.getMonth() + 1;
  let year1 = this.user.dateDepart.getFullYear();
  // Récupérer la date de retour sous forme de jour, mois et année séparés
  let day2 = this.user.dateRetour.getDate();
  let month2 = this.user.dateRetour.getMonth() + 1;
  let year2 = this.user.dateRetour.getFullYear();
  // Calculer la durée du congé en appelant la méthode 'datediff' du service 'HttpSerService'
  this.user.duree =this.http.datediff(this.user.dateDepart,this.user.dateRetour)
  // Formater la date de départ pour la convertir en chaîne de caractères au format 'AAAA-MM-JJ'
  this.user.dateDepart  = `${year1}-${month1}-${day1}`
  // Formater la date de retour pour la convertir en chaîne de caractères au format 'AAAA-MM-JJ'
  this.user.dateRetour  = `${year2}-${month2}-${day2}`

  // Création d'un nouveau FormData
   const file = new FormData()
   
   // Ajout des informations de la demande de congé dans le FormData
   file.append('matricule', this.data.matricule)
   file.append('dateDepart', this.user.dateDepart)
   file.append('dateRetour', this.user.dateRetour)
   file.append('type', this.user.item)
   file.append('nomPrenom', this.data.nomPrenom)
   file.append('image', this.data.image)
   file.append('SchefEquipe', 'Non'  )
   file.append('duree', this.user.duree)
   file.append('file', this.user.image)
   file.append('confirmation','en attente') 
   file.append('EnvoieRh',this.user.EnvoieRh) 
// Envoi de la demande de congé au serveur via une requête HTTP POST
   this.http.postCongee(file).subscribe((data)=>{
    this.message = 'votre demmande a été envoyé avec success'
       let notif ={
         message : `vous avez un nouvelle demande du congeé de la part de ${this.data.nomPrenom}`,
         matricule: '01103' }
   // Envoi d'une notification au responsable pour l'informer de la nouvelle demande de congé
      this.http.sendNotification(notif).subscribe( (data)=>{
       this.ngOnInit() // Actualisation de la page
      }
      ,(err)=>{
       console.log(err) // Affichage d'un message d'erreur dans la console en cas d'échec de l'envoi de la notification
      })
   },(err)=>{
         console.log(err) // Affichage d'un message d'erreur dans la console en cas d'échec de l'envoi de la demande de congé
   })

  } 
}



    
}
