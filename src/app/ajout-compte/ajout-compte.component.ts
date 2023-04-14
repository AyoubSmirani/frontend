import { Component, OnInit } from '@angular/core';
import { HttpSerService } from '../http-ser.service';
import { LoadingSerService } from '../loading-ser.service';

@Component({
  selector: 'app-ajout-compte',
  templateUrl: './ajout-compte.component.html',
  styleUrls: ['./ajout-compte.component.css']
})
export class AjoutCompteComponent implements OnInit{

  Employees:any = []
  Employe = {
    matricule:'',
    email:'',
    password:'',
    role:'',
    nomPrenom:''
  }
  setTrue = 1
  EmployeC:any = {
  }
  constructor(private http:HttpSerService,private load:LoadingSerService){}
  ngOnInit(): void {
    this.http.getEmployeWithoutAccount().subscribe((data)=>{
       console.log(data)
       this.Employees = data
       this.load.hideLoader()
    },
    (err)=>{
     console.log(err)
    }
    )
  }

  AjoutCompte(){
    this.Employe.nomPrenom = this.EmployeC.nomPrenom
    this.Employe.matricule = this.EmployeC.matricule
    this.Employe.role = this.EmployeC.role
    this.http.addAccount(this.Employe).subscribe((data)=>{
         console.log(data)
         this.http.SetCompteToTrue({matricule:this.Employe.matricule,compteUpdated:this.setTrue}).subscribe((data)=>{
             this.ngOnInit()
         },
         (err)=>{
              console.log(err)
         }

         )
    },(err)=>{
      console.log(err)
    })
  }


}
