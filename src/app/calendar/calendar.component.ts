import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CalendarOptions, Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import multiMonthPlugin from '@fullcalendar/multimonth';
import { HttpSerService } from '../http-ser.service';
import { LoadingSerService } from '../loading-ser.service';
@Component({
  selector: 'app-calendar',
  template: `<div class="calendar">
    <div class="calendarInfoDescription">
         
         <div class="title" style="display: flex; align-items:center;">
         <i-bs name="calendar-range" style="color: #2865a7"  width="45"  height="45"></i-bs>
         <h4>Mon calendrier</h4> 
            </div>
         <div class="DesContain">

          <div class="description">
           <div><h4>{{this.formationTable.length}}</h4></div>
            <p>Formation</p>
          </div>
          <span></span>   
           
          <div class="description">
           <div><h4>{{totalDemmande - EnAttente}}</h4></div>
            <p>Répondu</p>
          </div>

          <span></span>  

          <div class="description">
           <div><h4>{{EnAttente}}</h4></div>
            <p>En attente</p>
          </div>

          <span></span>  

          <div class="description">
           <div><h4>{{totalDemmande}}</h4></div>
            <p>Total demmande du congée</p>
          </div>




         </div>
    </div>
    <div style="padding: 10px;" id="calendar"></div>

    </div>
  `,
  styleUrls:['./calendar.component.css']
})
export class CalendarComponent implements OnInit{

  // Déclaration des variables
  calendarOptions!:CalendarOptions // Options du calendrier
  data!:any // Données de l'employé
  matricule!:string | null // Matricule de l'employé
  totalDemmande:number = 0
  EnAttente:number = 0
   calendar!: Calendar;// Instance du calendrier
   congeeTable:any = [] // Tableau de congés
   formationTable:any =[] // Tableau de formations
// declaration des services
  constructor(private http:HttpSerService,private activated:ActivatedRoute,private load:LoadingSerService){}



// Fonction pour appeler le calendrier
  appelCalendar(data1:any,data2:any){
     let children = data1.concat(data2)  //Fusionner les tableaux de congés et de formations
     console.log(children)
    this.calendarOptions = {
      plugins: [dayGridPlugin, interactionPlugin, multiMonthPlugin], // Utiliser les plugins du calendrier
      initialView: 'multiMonthYear',// Afficher plusieurs mois et années
      dateClick: this.handleDateClick.bind(this),// Gérer le clic sur une date
      events:children // Ajouter les événements au calendrier
    };
    this.calendar = new Calendar( document.getElementById('calendar')!, this.calendarOptions); // Créer une instance du calendrier
    this.calendar.render(); // Afficher le calendrier
   }



  // Gérer le clic sur une date
  handleDateClick(arg:any) {
    // Afficher la date pour le débogage
    console.log('date clicked: ' + arg.dateStr);
  }





// Fonction ngOnInit qui se lance à l'initialisation du composant
  ngOnInit() {
    // Récupérer le matricule de l'employé à partir de l'URL
    this.matricule = this.activated.snapshot.paramMap.get('matricule')
    // Récupérer les données de l'employé
    this.http.getEmploye(this.matricule!).subscribe( (data)=>{
      this.data = data // Stocker les employe dans le tableau correspondant
      // Récupérer les formations de l'employé
       this.http.getEmployeFormation(this.matricule).subscribe( (data)=>{
        this.load.hideLoader(); // Cacher le spinner de chargement
        this.formationTable = data // Stocker les formations dans le tableau correspondant
        // Récupérer les congés de l'employé
        this.http.getLISTECongee(this.matricule!).subscribe((data:any)=>{
          this.totalDemmande = data.length
          for(var i=0; i<data.length; i++ ){   
            if(data[i].confirmation === 'confirmé'){
              // Ajouter le congé dans le tableau de congés confirmé
              this.congeeTable.push(
                        {color:'red',start:data[i].dateD,end:data[i].dateF,title:'congee'}
                                   )
              }
            if(data[i].confirmation === 'en attente'){
                     this.EnAttente += 1
            }  
          }
          this.appelCalendar(this.congeeTable,this.formationTable) // Appeler le calendrier avec les données récupérées
        },(err)=>{
          console.log(err)
        })
        

      },(err)=>{
        console.log(err)
      }
   
      )
    },
    (err)=>{
      console.log(err)
    } )

}



}