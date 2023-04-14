import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ServiceService } from '../service.service';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
   // Injection de dépendances pour ServiceService et Router
  constructor(
    private service:ServiceService,
    private router:Router,
   ){}


  canActivate(route:ActivatedRouteSnapshot):boolean
  {    
// Récupération des rôles autorisés et exceptionnels à partir de l'objet de la route
 const expectedRole =  route.data['expectedRole'];
 const exceptionRole = route.data['exceptionRole'];
// Récupération du token stocké localement
 var token =  localStorage.getItem('token') ;
 // Décodage du token
 const decodedToken:any = jwt_decode(JSON.stringify(token))
 // Vérification du rôle exceptionnel
 if(decodedToken.role===exceptionRole){
   return true;
 }
 // Vérification de l'authentification et du rôle attendu
 if(!this.service.isAuth || decodedToken.role!==expectedRole  ){
   console.log('no autorised')
   this.router.navigate(['login'])
   return false;
 }
  // Si tout est ok, retourne true
  return true;
}
  
}


