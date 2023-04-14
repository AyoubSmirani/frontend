import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpSerService } from '../http-ser.service';
import { LoadingSerService } from '../loading-ser.service';
import jwt_decode from "jwt-decode";
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
   
data:any = []  
        
        constructor(private http:HttpSerService,private router:Router,private load:LoadingSerService){}
   
     user = {
      email : '',
      oldPassword : '',
      newPassword : '',
      matricule:''
     }

  ngOnInit(): void {
      this.http.AdminGetAllAccount().subscribe((data)=>{
        console.log(data)
        this.data = data;
        this.load.hideLoader()
      },(err)=>{
         console.log(err)
      })
  }

  goToAccount(matricule:string,role:string){
    console.log(matricule)
       if(role === 'RH'){
        this.router.navigate(['Rh/',matricule])
       }else{
        this.router.navigate(['employee/',matricule])           
       }
  } 
  update(email:string,oldpassword:string,matricule:string){
     this.user.email = email
     this.user.oldPassword = oldpassword
     this.user.matricule = matricule
  }

  updated(){
     this.http.updateAccount(this.user).subscribe((data)=>{
          console.log(data)
     },(err)=>{
          console.log(err)
     }) 
  }
  decode(password:any):string{
      let obj = {password:password}
      
      const decodedToken = jwt_decode(JSON.stringify(obj))
      console.log(decodedToken)
       return ''
  }


}
