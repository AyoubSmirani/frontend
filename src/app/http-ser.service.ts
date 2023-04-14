import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpSerService {

  constructor(private http:HttpClient,
    private JwtHelper:JwtHelperService) { }
 // url pour l'API
 url = 'https://congee-app-services-pro.onrender.com/api'

 // Méthode pour se connecter avec un utilisateur donné
 login(user:any){
 return this.http.post( this.url+'/signin' ,user)
 }
 //
 addAccount(user:any){
  return this.http.post( this.url+'/addAccount' ,user)
 }

 
 updateAccount(user:any){
  return this.http.put( this.url+'/updateCompte' ,user)
 }

 // Méthode pour envoyer un message dans le chat 
 chat(prompt:any){
  return this.http.post( this.url+'/message',prompt)
 } 
  // Méthode pour obtenir les informations d'un employé avec un matricule donné 
 getEmploye(matricule:string){
   return this.http.get(this.url+ '/Getemploye/' +matricule)
 }
 //
 GetEmployeeWithChefRole(){
 return this.http.get(this.url + '/GetChefEmployee' ) 
 }
 
 // Méthode pour obtenir la liste de tous les employés
  getEmployees(){
   return this.http.get(this.url+ '/Getemployees')
 }
//
 getEmployeWithoutAccount(){
  return this.http.get(this.url+ '/GetEmployeWithoutAccount/0')
}
//
SetCompteToTrue(option:any){
  return this.http.put(this.url + '/SetCompteToTrue',option )
} 
  // 
  UpdateEmployees(employee:any){
    return this.http.put(this.url + '/UpdateEmployee',employee )
  } 
  //
  DeleteEmlpoyee(matricule:string){
    return this.http.delete(this.url+ '/DeleteEmployee/' +matricule)
  }
  //
  AddEmployee(employee:any){
    return this.http.post(this.url + '/addEmployee',employee )
  }

 // Méthode pour obtenir la liste des formations d'un employé avec un matricule donné
 getEmployeFormation(matricule:any){
  return this.http.get(this.url+ '/getListFormation/'+matricule)
 }

// Méthode pour obtenir la liste de toutes les formations
 getListFormation(){
  return this.http.get(this.url+ '/getAllFormation')
 }

 // Méthode pour créer une nouvelle formation
 postFormation(formation:any){
  return this.http.post(this.url+ '/postFormation',formation)
 }

 
// Méthode pour affecter une formation à un poste
 AffectFormation(formationA:any){
  return this.http.post(this.url+ '/affctedFormationByPoste',formationA)
 }
 
// Méthode pour demander un congé
 postCongee(conge:any){
  return this.http.post(this.url+ '/postCongee',conge)
 }

// Méthode pour obtenir la liste de tous les congés
getAllRhCongee(){
  return this.http.get(this.url+ '/getAllRhCongee')
}
//
getAllChefDemande(chefEM:any){
  console.log(chefEM)
  return this.http.get(this.url+ `/getAllChefCongee/${chefEM}` )
}
getChefMatricule(nomPrenom:any){
  return this.http.get(this.url+ `/getChefMatricule/${nomPrenom}` )
}

// Méthode pour mettre à jour un congé
  UpdateCongeeChef(option:any){
  return this.http.put(this.url+ '/UpdateCongee',option)
 }
 RhUpdateCongee(option:any){
  return  this.http.put(this.url+ '/RhUpdateCongee',option)
 }


  // Méthode pour envoyer une notification
 sendNotification(notif:any){
  return this.http.post(this.url+ '/sendNotification',notif)
 }
 
 // Méthode pour obtenir toutes les notifications d'un employé avec un matricule donné
 getNotification(notif:any){
  return this.http.get(this.url+ `/GetNotification/${notif}`)
 }
 // Méthode pour marquer une notification comme "vue"
 SetNotificationVuTrue(option:any){
  return this.http.put(this.url+ '/putNotifications',option)
 }

 // Méthode pour calculer la différence entre deux dates
  datediff(first:Date, second:Date) {    
  var Difference_In_Time = second.getTime() - first.getTime();    
  return Difference_In_Time / (1000 * 3600 * 24);;
} 
 // Méthode pour obtenir la liste de tous les postes
 getListePoste(){
  return this.http.get(this.url+ '/getListPoste')
 }

// Méthode pour obtenir la liste de tous les congés d'un employé avec un matricule donné
 getLISTECongee(matricule:string){
  return this.http.get(this.url+ '/getAllCongee/' +matricule)
 }
 

 getDate(date: Date){
   let date1 = new Date(date)
   var day = date1.getDate();
   var month = date1.getMonth() + 1;
   var year = date1.getFullYear();
   return `${year}-${'month'}-${day}`
    }
 // Retourne une requête HTTP GET pour récupérer tous les comptes utilisateurs
  AdminGetAllAccount(){
    return this.http.get(this.url+ '/getAllAccount')
  } 
 // 
 sendEmail(email:any){
  return this.http.post(this.url +'/send-email',email)
 }
  
}
