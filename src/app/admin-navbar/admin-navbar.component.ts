import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpSerService } from '../http-ser.service';
import { LoadingSerService } from '../loading-ser.service';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.Less']
})
export class AdminNavbarComponent {
  matricule!:string | null
  constructor(private http:HttpSerService,private activated:ActivatedRoute,private router:Router,private load:LoadingSerService){}
   


  ngOnInit(): void {
    this.matricule = '01441'
    console.log(this.matricule)
  };
  admin(){
    if( this.router.url!=`/admin/${this.matricule}`){
      this.load.showLoader();
      }
     this.router.navigate(['admin',this.matricule])
  }
  AjoutCompte(){
    if( this.router.url!=`/adminAjoutCompte`){
     this.load.showLoader();
      }
    this.router.navigate(['adminAjoutCompte'])
  }
  

  

  deconnection(){
    localStorage.removeItem('token')
    this.router.navigate(['login'])
  }

}
