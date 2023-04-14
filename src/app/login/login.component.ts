import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpSerService } from '../http-ser.service';
import jwt_decode from "jwt-decode";
import { delay } from 'rxjs';







@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

  user = {
    email:'',password:'' // Objet user initialisé avec les champs email et password vides
  }

  err:any = false // Initialisation de la variable err à faux
  // declaration des des services
  constructor(private AuthService:HttpSerService,private router :Router) {
  
  }

  // Fonction de redirection vers la page d'inscription
  goRegister(){
    this.router.navigate(['register'])
  }
  

  
  
  login(){
      
    this.AuthService.login(this.user).subscribe ((data:any)=>{
    console.log(data);
    localStorage.setItem('token',data.token); // Stockage du token dans le Local Storage
    var token =  localStorage.getItem('token') ;  // Récupération du token depuis le Local Storage
    const decodedToken:any = jwt_decode(JSON.stringify(token)) // Décodage du token grâce à la bibliothèque jwt_decode
   console.log(decodedToken)
   // Redirection vers la page correspondante en fonction du rôle de l'utilisateur 
   if(decodedToken.role==='chef département'){ 
    this.router.navigate(['directeurEquipe/',decodedToken.matricule])
   }
   else if(decodedToken.role==='employe'){
    this.router.navigate(['employee/',decodedToken.matricule])
   }else if(decodedToken.role==='RH'){
    this.router.navigate(['Rh/',decodedToken.matricule])
   }else{
    this.router.navigate(['admin/',decodedToken.matricule])
   }
     
  },
  (err)=>{
    console.log(err) // Affichage de l'erreur en cas d'échec de la méthode login() de AuthService
  },
  )
  delay(20000)
  this.err = true // Afficher le message d'erreur  
  }



}
