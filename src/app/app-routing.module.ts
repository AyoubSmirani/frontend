import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { ChefDemandeComponent } from './chef-demande/chef-demande.component';
import { ChefVoirDemandeComponent } from './chef-voir-demande/chef-voir-demande.component';
import { DirecteurComponent } from './directeur/directeur.component';
import { EmpDemandeCongeComponent } from './emp-demande-conge/emp-demande-conge.component';
import { EmployeeComponent } from './employee/employee.component';
import { RoleGuard } from './guard/role.guard';
import { ListEmployeeComponent } from './list-employee/list-employee.component';
import { LoginComponent } from './login/login.component';
import { MesDemandeComponent } from './mes-demande/mes-demande.component';
import { MesformationComponent } from './mesformation/mesformation.component';
import { RhListCongeeComponent } from './rh-list-congee/rh-list-congee.component';
import { RHComponent } from './rh/rh.component';
import { AjoutCompteComponent } from './ajout-compte/ajout-compte.component';

const routes: Routes = [
    // Redirection vers la page de connexion si aucun chemin n'est spécifié
    {path:'', redirectTo:'login' ,pathMatch:'full'},

    // Chemin vers la page de connexion
    {path:'login',component:LoginComponent },

    // Chemin vers la page de profil de l'employé
    {path:'employee/:matricule',component:EmployeeComponent,canActivate:[RoleGuard] ,data:{expectedRole:'employe',exceptionRole:'admin'}},

    // Chemin vers la page de demande de congé de l'employé
    {path:'employeeDemande/:matricule',component:EmpDemandeCongeComponent,canActivate:[RoleGuard] ,data:{expectedRole:'employe',exceptionRole:'admin'}},

    // Chemin vers la page de formations de l'employé
    {path:'Mesformation/:matricule',component:MesformationComponent,canActivate:[RoleGuard] ,data:{expectedRole:'employe',exceptionRole:'admin'}},

    // Chemin vers la page de demandes de l'employé
    {path:'MesDemandes/:matricule',component:MesDemandeComponent,canActivate:[RoleGuard] ,data:{expectedRole:'employe',exceptionRole:'admin'}},

    // Chemin vers la page de profil du directeur
    {path:'directeurEquipe/:matricule',component:DirecteurComponent,canActivate:[RoleGuard] ,data:{expectedRole:'chef département',exceptionRole:'admin'}},
    //    
    {path:'directeurEquipeDemandecongee/:matricule',component:ChefDemandeComponent,canActivate:[RoleGuard] ,data:{expectedRole:'chef département',exceptionRole:'admin'}},
    //
    {path:'directeurEquipeVoirDemandecongee/:matricule',component:ChefVoirDemandeComponent,canActivate:[RoleGuard] ,data:{expectedRole:'chef département',exceptionRole:'admin'}},
    // Chemin vers la page du service RH
    {path:'Rh/:matricule',component:RHComponent,canActivate:[RoleGuard] ,data:{expectedRole:'RH',exceptionRole:'admin'}},

    // Chemin vers la page de gestion des demandes de congé par le service RH
    {path:'RhListCongee/:matricule',component:RhListCongeeComponent,canActivate:[RoleGuard] ,data:{expectedRole:'RH',exceptionRole:'admin'}},

    // Chemin vers la page de gestion des formations par le service RH
    {path:'RhAffectFormation/:matricule',component:ListEmployeeComponent,canActivate:[RoleGuard] ,data:{expectedRole:'RH',exceptionRole:'admin'}},
    
    // Chemin vers la page de profil de l'administrateur
    {path:'admin/:matricule',component:AdminComponent,canActivate:[RoleGuard] ,data:{expectedRole:'admin'}},
    // Chemin vers la page de profil de l'administrateur
    {path:'adminAjoutCompte',component:AjoutCompteComponent,canActivate:[RoleGuard] ,data:{expectedRole:'admin'}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
