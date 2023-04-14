import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ServiceService } from '../service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
 // Injection de dépendances pour ServiceService et Router
    constructor(
      private service:ServiceService,
      private router:Router,
     ){}
    // Fonction canActivate() qui permet de vérifier si l'utilisateur est authentifié
     canActivate():boolean
       {
        // Si l'utilisateur n'est pas authentifié, il est redirigé vers la page de connexion et false est retourné
        if(!this.service.isAuth()){
         console.log('token n est plus valide')
         this.router.navigate(['/login'])
         return false
        }
       // Si l'utilisateur est authentifié, true est retourné
       return true;
     }
  
}
