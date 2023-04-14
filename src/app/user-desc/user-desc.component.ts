import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpSerService } from '../http-ser.service';

@Component({
  selector: 'app-user-desc',
  templateUrl: './user-desc.component.html',
  styleUrls: ['./user-desc.component.css']
})
export class UserDescComponent {
  constructor(private http:HttpSerService,private activated:ActivatedRoute){}



 // Déclaration des variables
data!: any;
matricule!: string | null;

// Méthode appelée lors de l'initialisation du composant
ngOnInit(): void {
// Récupération du matricule depuis l'URL
this.matricule = this.activated.snapshot.paramMap.get('matricule');
this.http.getEmploye(this.matricule!).subscribe(
  (data) => {
    console.log(data);
    this.data = data; // Affectation des données récupérées à la variable 'data'
  },
  (err) => {
    console.log(err);
  }
);
}


}
