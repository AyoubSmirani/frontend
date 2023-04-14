import { Component, OnInit } from '@angular/core';
import { HttpSerService } from '../http-ser.service';

@Component({
  selector: 'app-add-formation',
  templateUrl: './add-formation.component.html',
  styleUrls: ['./add-formation.component.css']
})
export class AddFormationComponent implements OnInit{
  constructor(private http:HttpSerService) { }
  ngOnInit(): void {
    
  }

// On initialise un objet formation avec des valeurs par défaut
formation = {
title:''	,
start	:new Date(),
duree	:0,
end	:new Date(),
color:'',	
nomCentre:''
}	

 // Cette fonction vérifie si la date de retour est supérieure ou égale à la date de départ
  // et si les deux dates ne sont pas dans le passé.
isDateRetourSupDateDepart(): boolean {
  const today = new Date();
  const depart = new Date(this.formation.start);
  const retour = new Date(this.formation.end);

  return !!(this.formation.start && this.formation.end && depart >= today && retour >= depart && retour.getTime() !== depart.getTime());
}
  // Cette fonction vérifie si le formulaire est valide, c'est-à-dire si les champs obligatoires
  // sont remplis et si les dates sont valides.
isFormValid(): boolean {
  return !!this.formation.start && !!this.formation.end && this.isDateRetourSupDateDepart() ;
}














// Cette fonction est appelée lors de la soumission du formulaire.
  public signIn(formation:any,alert:any):void {
    // On définit la couleur de la formation à "blue"
      this.formation.color = "blue"
      // On calcule la durée de la formation en jours en utilisant la fonction datediff du service HttpSerService
      formation.duree = this.http.datediff(formation.start,formation.end);
      console.log(formation)
      // On envoie la formation au serveur en utilisant la méthode postFormation du service HttpSerService    
      this.http.postFormation(formation).subscribe((data)=>{
             console.log(data)
             // On ouvre une boîte de dialogue pour confirmer l'ajout de la formation
             alert.open()        
      },
      (err)=>{
        console.log(err)
      }
      
      )
  }

  


}
