import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpSerService } from '../http-ser.service';
import { LoadingSerService } from '../loading-ser.service';

@Component({
  selector: 'app-list-formation',
  templateUrl: './list-formation.component.html',
  styleUrls: ['./list-formation.component.css']
})
export class ListFormationComponent implements OnInit{
  // Initialisation d'une variable "data" avec une valeur initiale vide
  public data: any =[];
  searchText: string = '';
  // Date pipe to format dates
  datePipe = new DatePipe('en-US');

    constructor(private http:HttpSerService,private load:LoadingSerService) { }

    // Method to format date to 'dd-MM-yyyy' format
    formatDate(dateString: string) {
      const date = new Date(dateString);
      return this.datePipe.transform(date, 'dd-MM-yyyy');
    }
     
   // Fonction exécutée lors de l'initialisation du composant  
    ngOnInit(){
      // Récupération des données des listes formations depuis le serveur via une requête HTTP
         this.http.getListFormation().subscribe((data)=>{
          // masquage loader
            this.load.hideLoader()
            // Affectation des données reçues dans la variable "data"
            this.data = data
         },(err)=>{
             console.log(err) // cas error recupération des donnée
         })
    }

 
     








  perPage: number = 4;
  currentPage: number = 1;
  totalRecords: number = this.data.length;

  

  navigateToFirstPage(): void {
    this.currentPage = 1;
  }


}
