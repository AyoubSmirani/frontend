import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpSerService } from '../http-ser.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit{
  matricule: any; // récupération du matricule depuis la route
  // On injecte les services nécessaires pour le component
  constructor(private http:HttpSerService,private activated:ActivatedRoute,private router:Router){}
  data:any = [] // tableau pour stocker les notifications
  datePipe = new DatePipe('en-US'); // utilisation du DatePipe pour formater la date
  formatDate(dateString: string) {
    const date = new Date(dateString); 
    return this.datePipe.transform(date, 'dd-MM-yyyy'); // formatage de la date au format 'dd-MM-yyyy'
  }

  ngOnInit(): void {
    this.matricule = this.activated.snapshot.paramMap.get('matricule')  // récupération du matricule depuis la route
    // appel du service pour récupérer les notifications
     this.http.getNotification(this.matricule).subscribe((data)=>{
         this.data = data  // stockage des notifications dans le tableau 'data'
         console.log(data)   
     },(err)=>{
          console.log(err)
     })
  }
  // fonction pour rediriger l'utilisateur vers la page correspondante
  goToNotifRedirect(goto:any,id:any){
    // modifier la notification pour la marquer comme vue
     var notifModif = {
       id:id,
       vu:true
     }
     this.http.SetNotificationVuTrue(notifModif).subscribe((data)=>{
            console.log(data)
     },
     (err)=>{
      console.log(err)
     })


    // redirection vers la page correspondante
    console.log(goto.substr(0,24))
    // si la notification concerne une demande de congé, rediriger l'utilisateur vers la page 'MesDemandes'
    if(goto.substr(0,24) === 'votre demmande du congée'  ){
          this.router.navigate(['MesDemandes/',this.matricule])
          // si la notification concerne une nouvelle demande de congé, rediriger l'utilisateur vers la page 'RhListCongee'
  }else if(goto.substr(0,39) ==='vous avez un nouvelle demande du congeé'){
    this.router.navigate(['RhListCongee/',this.matricule])
  }

}

}