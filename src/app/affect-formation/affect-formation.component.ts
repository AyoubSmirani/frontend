    import { Component, OnInit, ViewChild } from '@angular/core';
import { IgxSelectComponent } from 'igniteui-angular';
import { heartHalf } from 'ngx-bootstrap-icons';
import { HttpSerService } from '../http-ser.service';

@Component({
  selector: 'app-affect-formation',
  templateUrl: './affect-formation.component.html',
  styleUrls: ['./affect-formation.component.css']
})
export class AffectFormationComponent implements OnInit{
// Déclaration des variables
  
  formationA = {
    idformation:0,
    poste:''
  }
    listF:any = [] 
    listP:any = []

// declaration des services
    constructor(private http:HttpSerService) { }
// Fonction ngOnInit qui se lance à l'initialisation du composant
  ngOnInit(): void {
        // Récupération de la liste des formations
         this.http.getListFormation().subscribe((data)=>{
            this.listF = data
               // Récupération de la liste des postes
               this.http.getListePoste().subscribe((data)=>{
                          this.listP = data
               },
                 // Affichage d'une erreur en cas de problème de récupération des postes  
                 (err)=>{  
                           
                            console.log(err)
                        })
         },
         // Affichage d'une erreur en cas de problème de récupération des formations
         (err)=>{
             console.log(err)
         })
  }


  // Fonction affect pour affecter une formation à un poste
  affect(formationA:any){
        // Appel de la fonction AffectFormation de HttpSerService pour réaliser l'affectation
        this.http.AffectFormation(formationA).subscribe((data)=>{
        console.log(data)
               },
               // Affichage d'une erreur en cas de problème lors de l'affectation
               (err)=>{
                      console.log(err)
               })
       }



 

}
