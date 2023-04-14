import { Injectable } from '@angular/core';
import { Subject} from 'rxjs';
@Injectable({
  providedIn: 'root'
})


export class LoadingSerService {
  constructor() { }
  
  /**
  Un sujet qui émet un booléen à chaque fois que l'état de chargement doit être changé.
  */
  private loading = new Subject<boolean>();
  /**
  
  Un observable qui permet de suivre les changements d'état de chargement.
  */
  loadingAction$ = this.loading.asObservable()
  /**
  Cette méthode permet d'afficher le loader.
  */
  showLoader(){
  this.loading.next(true);
  }
  /**
  
  Cette méthode permet de cacher le loader.
  */
  hideLoader(){
  this.loading.next(false);
  }
  
  }