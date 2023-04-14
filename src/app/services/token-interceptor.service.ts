import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class TokenInterceptorService  {

  constructor() { }

  // Intercepte les requêtes HTTP sortantes pour y ajouter le token d'authentification
  intercept(req: any, next: any) {
    const token = localStorage.getItem('token'); // Récupère le token stocké en local
    const tokenHeader = req.clone({ // Clone la requête pour y ajouter le header avec le token
      setHeaders: {
        Authorization: `Bearer ${token}` // Ajoute le token dans le header de la requête
      }
    });

    return next.handle(tokenHeader); // Passe la requête modifiée au prochain intercepteur ou au service de gestion des requêtes HTTP
  }
}