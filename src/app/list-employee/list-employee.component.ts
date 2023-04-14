import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpSerService } from '../http-ser.service';
import { IgxExpansionPanelComponent } from 'igniteui-angular';
import { LoadingSerService } from '../loading-ser.service';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.scss']
})
export class ListEmployeeComponent implements OnInit{
  // Importation des dépendances et services nécessaires
  constructor(private http:HttpSerService ,private load:LoadingSerService){}
  // Initialisation d'une variable "data" avec une valeur initiale vide
  data:any = []
  searchText:string = ''
  perPage: number = 4;
  currentPage: number = 1;
  totalRecords: number = this.data.length;
  
  

  navigateToFirstPage(): void {
    this.currentPage = 1;
  }
  Updatedemployee:any = {
    nomPrenom:'',
    email:'',
    poste:'',
    statue:'',
    SchefEquipe:'',
    telephone:'',
    image:''
  }
  imagePath!:string 
  // Fonction exécutée lors de l'initialisation du composant
  ngOnInit(): void {
    // Récupération des données des employés depuis le serveur via une requête HTTP
    this.http.getEmployees().subscribe( (data)=>{
         // Masquage du loader
         this.load.hideLoader();
          // Affectation des données reçues dans la variable "data"
         this.data = data;
    },
    (err)=>{
        console.log(err) // cas error recupération des donnée
    }
    )
  }

  delete(matricule:string){
    this.http.DeleteEmlpoyee(matricule).subscribe((data)=>{
      this.ngOnInit()
    },(err)=>{
       console.log(err)
    })
  }
  
   update(matricule:string){
    this.http.getEmploye(matricule).subscribe((data)=>{
       this.Updatedemployee = data;
       this.imagePath = `http://127.0.0.1:5000/getImage/${this.Updatedemployee.image}`
      console.log(this.imagePath)
      },(err)=>{
       console.log(err);
    })  

   }



   selectImage(e:any){
    console.log(e.target.files[0].type )
    // Vérification de la taille du fichier
    const reader = new FileReader();
    // Stockage de l'image sélectionnée
    this.Updatedemployee.image = e.target.files[0];
    reader.readAsDataURL(this.Updatedemployee.image);

    reader.onload = () => {
      this.imagePath = reader.result as string;
    };

    console.log(this.Updatedemployee.image)
   }


  

   notifier(nomPrenom:string){
    this.http.sendEmail({to:'khalil.smirani.7@gmail.com',subject:'zzz',body:`<div style="
    width:250px; height:450px; background-color:yellow;"><h1>${nomPrenom}</h1>n'a pas encore un compte</div>`}).subscribe((data)=>{
        console.log(data)
    },(err)=>{
           console.log(err)
    }) 
   }




   updated(){
    let form = new FormData()
    form.append('matricule',this.Updatedemployee.matricule)
    form.append('nomPrenom',this.Updatedemployee.nomPrenom)
    form.append('email',this.Updatedemployee.email)
    form.append('poste',this.Updatedemployee.poste)
    form.append('statue',this.Updatedemployee.statue)
    form.append('telephone',this.Updatedemployee.telephone)
    form.append('SchefEquipe',this.Updatedemployee.SchefEquipe)
    form.append('file',this.Updatedemployee.image)
    console.log(form.get('file'))
    console.log(this.Updatedemployee)
    this.http.UpdateEmployees(form).subscribe((data)=>{
      this.ngOnInit()
    },(err)=>{
      console.log(err)
    })

   }

 // Récupération d'une référence à l'élément "IgxExpansionPanelComponent" à partir de la vue
  @ViewChild(IgxExpansionPanelComponent, { read: IgxExpansionPanelComponent, static: true })
  public panel!: IgxExpansionPanelComponent;


 
 
}
