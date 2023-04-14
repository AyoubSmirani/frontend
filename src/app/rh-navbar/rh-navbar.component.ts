import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpSerService } from '../http-ser.service';
import { LoadingSerService } from '../loading-ser.service';

@Component({
  selector: 'app-rh-navbar',
  templateUrl: './rh-navbar.component.html',
  styleUrls: ['./rh-navbar.component.css']
})
export class RhNavbarComponent {
  constructor(private http:HttpSerService,private activated:ActivatedRoute,private router:Router,private load:LoadingSerService){}

  data!:any 
  matricule!:string | null
  NotificationNotSeenCount:number = 0
  Notification:boolean = false

  ngOnInit(): void {

    
    this.matricule = this.activated.snapshot.paramMap.get('matricule')
    this.http.getEmploye(this.matricule!).subscribe( (data)=>{
              this.http.getNotification(this.matricule).subscribe((data:any)=>{

                     for(let i=0;i<data.length;i++){
                         if(!data[i].vu){
                          this.NotificationNotSeenCount += 1
                         }
                     } 

              },(err)=>{
                      console.log(err)
              }) 
      this.data = data   
    },
    (err)=>{
      console.log(err)
    } )
  }
  



  
  RhListCongee(){
    if( this.router.url!=`/RhListCongee/${this.matricule}`){
      this.load.showLoader();
      }
     this.router.navigate(['RhListCongee/',this.matricule])
  }

  Rh(){
    if( this.router.url!=`/Rh/${this.matricule}`){
      this.load.showLoader();
      }
    this.router.navigate(['Rh/',this.matricule])
  }

  RhAffectFormation(){
    if( this.router.url!=`/RhAffectFormation/${this.matricule}`){
      this.load.showLoader();
      }
    this.router.navigate(['RhAffectFormation/',this.matricule])
  }
  
  openCloseNotification(){
    this.Notification = !this.Notification
    console.log(this.Notification)
  }
  

  deconnection(){
    localStorage.removeItem('token')
    this.router.navigate(['login'])
  }

}
