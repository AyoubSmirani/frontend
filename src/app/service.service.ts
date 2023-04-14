import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})

export class ServiceService {

  // Constructeur de la classe, prend en paramètre un objet JwtHelperService
  constructor(
    private JwtHelper:JwtHelperService) { }

  // Méthode qui vérifie si l'utilisateur est authentifié ou non, retourne un booléen
  isAuth(): boolean {

    // Récupération du token stocké dans le local storage
    const token = localStorage.getItem('token');

    // Vérification si le token est expiré ou n'existe pas dans le local storage
    if (this.JwtHelper.isTokenExpired(token) || !localStorage.getItem('token')) {

      // Si le token est expiré ou n'existe pas, retourne false
      return false;
    }

    // Si le token est valide, retourne true
    return true;
  }
}
