import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { JWT_OPTIONS } from '@auth0/angular-jwt';
import { LoginComponent } from './login/login.component';
import { EmployeeComponent } from './employee/employee.component';
import { DirecteurComponent } from './directeur/directeur.component';
import { RHComponent } from './rh/rh.component';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { DialogDataExampleDialogComponent } from './dialog-data-example-dialog/dialog-data-example-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import { allIcons } from 'ngx-bootstrap-icons';
import { NavbarComponent } from './navbar/navbar.component';
import { MatTabsModule } from '@angular/material/tabs';
import { UserDescComponent } from './user-desc/user-desc.component';
import { CalendarComponent } from './calendar/calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { MatMenuModule } from '@angular/material/menu';
import { DemandecongeComponent } from './demandeconge/demandeconge.component';
import { IgxStepperModule, IgxIconModule, IgxButtonModule, IgxButtonGroupModule,
   IgxInputGroupModule, IgxRadioModule,IgxDatePickerModule,IgxSelectModule,IgxDialogModule,
   IgxExpansionPanelModule, IgxCardModule,IgxGridModule,
   IgxSwitchModule,IgxLayoutModule,
   IgxNavigationDrawerModule,
   IgxRippleModule, 
   IgxTabsModule, IgxToggleModule,IgxPaginatorModule } from "igniteui-angular";
import { HammerModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListEmployeeComponent } from './list-employee/list-employee.component';
import { ListFormationComponent } from './list-formation/list-formation.component';
import { AddFormationComponent } from './add-formation/add-formation.component';
import { AffectFormationComponent } from './affect-formation/affect-formation.component';
import { RhListCongeeComponent } from './rh-list-congee/rh-list-congee.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { EmpDemandeCongeComponent } from './emp-demande-conge/emp-demande-conge.component';
import { RhNavbarComponent } from './rh-navbar/rh-navbar.component';
import { MesDemandeComponent } from './mes-demande/mes-demande.component';
import { ListeFormationEmComponent } from './liste-formation-em/liste-formation-em.component';
import { LoadingComponent } from './loading/loading.component';
import { MesformationComponent } from './mesformation/mesformation.component';
import { AdminComponent } from './admin/admin.component';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { ChefListCongeComponent } from './chef-list-conge/chef-list-conge.component';
import { ChefNavbarComponent } from './chef-navbar/chef-navbar.component';
import { FilterPipe } from './rh-list-congee/pipe';
import {FilterPipeFormation} from './list-formation/pipeFormation'
import { NgxPaginationModule } from 'ngx-pagination';
import {filterEmploye }from './list-employee/pipeEmploye';
import { ChefDemandeComponent } from './chef-demande/chef-demande.component';
import { ChefVoirDemandeComponent } from './chef-voir-demande/chef-voir-demande.component';
import { AjouterEmployeComponent } from './ajouter-employe/ajouter-employe.component';
import { AjoutCompteComponent } from './ajout-compte/ajout-compte.component'













@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EmployeeComponent,
    DirecteurComponent,
    RHComponent,
    DialogDataExampleDialogComponent,
    NavbarComponent,
    UserDescComponent,
    CalendarComponent,
    DemandecongeComponent,
    ListEmployeeComponent,
    ListFormationComponent,
    AddFormationComponent,
    AffectFormationComponent,
    RhListCongeeComponent,
    NotificationsComponent,
    EmpDemandeCongeComponent,
    RhNavbarComponent,
    MesDemandeComponent,
    ListeFormationEmComponent,
    LoadingComponent,
    MesformationComponent,
    AdminComponent,
    AdminNavbarComponent,
    ChefListCongeComponent,
    ChefNavbarComponent,FilterPipe,FilterPipeFormation,filterEmploye, ChefDemandeComponent, ChefVoirDemandeComponent, AjouterEmployeComponent, AjoutCompteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatDialogModule,
    NgxBootstrapIconsModule.pick(allIcons),
    MatTabsModule,
    FullCalendarModule,
    MatMenuModule,
    IgxStepperModule,
	IgxIconModule,
	IgxButtonModule,
	IgxButtonGroupModule,
	IgxInputGroupModule,
	IgxRadioModule,
  IgxDatePickerModule,HammerModule,IgxSelectModule,IgxDialogModule,IgxExpansionPanelModule,IgxCardModule,IgxGridModule,
  IgxSwitchModule,IgxLayoutModule,
  IgxNavigationDrawerModule,
  IgxRippleModule,IgxTabsModule,IgxToggleModule,IgxPaginatorModule,NgxPaginationModule
 
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService
    //Token intercepter
    ,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
