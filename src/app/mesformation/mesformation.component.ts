import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpSerService } from '../http-ser.service';

@Component({
  selector: 'app-mesformation',
  templateUrl: './mesformation.component.html',
  styleUrls: ['./mesformation.component.css']
})

export class MesformationComponent implements OnInit {
  matricule!:string; // Initialisation de la variable matricule
  data:any = []; // Initialisation de la variable data
  searchText: string = '';
  datePipe = new DatePipe('en-US'); // Création d'une instance de la classe DatePipe pour formater les dates
  
  formatDate(dateString: string) { // Méthode pour formater une date au format dd-MM-yyyy
    const date = new Date(dateString);
    return this.datePipe.transform(date, 'dd-MM-yyyy');
  }
  
  constructor(private http:HttpSerService,private activated:ActivatedRoute){} // Injection de dépendances pour HttpSerService et ActivatedRoute

  ngOnInit(): void {
    this.matricule = this.activated.snapshot.paramMap.get('matricule')! // Récupération du matricule depuis l'URL
    this.http.getEmployeFormation(this.matricule).subscribe((data)=>{ // Appel d'une méthode HTTP pour récupérer les données de formation de l'employé
        this.data = data; // Affectation des données récupérées à la variable data
    },(err)=>{
      console.log(err) // Affichage d'une erreur éventuelle dans la console
    })
  }

  perPage: number = 4;
  currentPage: number = 1;
  totalRecords: number = this.data.length;

  

  navigateToFirstPage(): void {
    this.currentPage = 1;
  }


}
