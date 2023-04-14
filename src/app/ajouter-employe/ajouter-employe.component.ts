import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpSerService } from '../http-ser.service';
import { IgxExpansionPanelComponent } from 'igniteui-angular';
import { LoadingSerService } from '../loading-ser.service';

@Component({
  selector: 'app-ajouter-employe',
  templateUrl: './ajouter-employe.component.html',
  styleUrls: ['./ajouter-employe.component.scss']
})
export class AjouterEmployeComponent {
   
   // Importation des dépendances et services nécessaires
   constructor(private http:HttpSerService ,private load:LoadingSerService){}
   // Initialisation d'une variable "data" avec une valeur initiale vide
   data:any = []
   searchText:string = ''
   perPage: number = 4;
   currentPage: number = 1;
   totalRecords: number = this.data.length;
   imagePath: string ='http://127.0.0.1:5000/getImage/use.png' ;
   SelectEmployeeSexe = ['homme','femme'];
   SelectEmployeeRole = ['employe','chef département'];
   SelectChef:any = []
   navigateToFirstPage(): void {
     this.currentPage = 1;
   }
   
   employee:any = {
    matricule:'',
     nomPrenom:'',
     email:'',
     role:'',
     sexe:'',
     poste:'',
     statue:'',
     SchefEquipe:'',
     telephone:'',
     image:'',
     compte:0
   }
   // Fonction exécutée lors de l'initialisation du composant
   ngOnInit(): void {
    this.http.GetEmployeeWithChefRole().subscribe((data)=>{
          console.log(data)
          this.SelectChef = data       
    },(err)=>{
         console.log(err)
    })
   }
 
 
 
 
 
    selectImage(e:any){
     console.log(e.target.files[0].type )
     // Vérification de la taille du fichier
     const reader = new FileReader();
     // Stockage de l'image sélectionnée
     this.employee.image = e.target.files[0];

     reader.readAsDataURL(this.employee.image);

     reader.onload = () => {
       this.imagePath = reader.result as string;
     };

     console.log(this.employee.image)
    }
 
 
 
 
 
 
 
 
 
    updated(){
     let MatriculeExist= false
    this.http.getEmployees().subscribe((data:any)=>{
      for(let i=0;i<data.length;i++){
        if(data[i].matricule==this.employee.matricule){
          MatriculeExist = true
        }else{
          MatriculeExist = false
        }
      } 

      if(!MatriculeExist){
        let form = new FormData()
        form.append('matricule',this.employee.matricule)
        form.append('nomPrenom',this.employee.nomPrenom)
        form.append('email',this.employee.email)
        form.append('poste',this.employee.poste)
        form.append('statue',this.employee.statue)
        form.append('telephone',this.employee.telephone)
        form.append('SchefEquipe',this.employee.SchefEquipe)
        form.append('file',this.employee.image)
        form.append('sexe',this.employee.sexe)
        form.append('role',this.employee.role)
        form.append('compte',this.employee.compte)
        console.log(form.get('file'))
        console.log(this.employee)
        this.http.AddEmployee(form).subscribe((data)=>{
            this.ngOnInit();
        },(err)=>{
           console.log(err)
        })
      }else{
        console.log('matricule exist')
      }


    },(err)=>{
      console.log(err)
    })
 







   
  
 
    }
 
  // Récupération d'une référence à l'élément "IgxExpansionPanelComponent" à partir de la vue
   @ViewChild(IgxExpansionPanelComponent, { read: IgxExpansionPanelComponent, static: true })
   public panel!: IgxExpansionPanelComponent;



}
