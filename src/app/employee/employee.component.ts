import { Component, OnInit} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { delay } from 'rxjs';
import { DialogDataExampleDialogComponent } from '../dialog-data-example-dialog/dialog-data-example-dialog.component';
import { LoadingSerService } from '../loading-ser.service';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})




export class EmployeeComponent implements OnInit{
  // Constructor qui initialise la variable dialog avec le service MatDialog et la variable load avec le service LoadingSerService
  constructor(public dialog: MatDialog,private load:LoadingSerService) {}

  // ngOnInit est une méthode du cycle de vie Angular qui s'exécute lorsqu'un composant est initialisé.
  // Elle cache le loader en appelant la méthode hideLoader() du service LoadingSerService.
  ngOnInit(): void {
   this.load.hideLoader();
  }


 // Fonction qui ouvre une boîte de dialogue en
 // appelant la méthode open() du service MatDialog avec comme composant la classe DialogDataExampleDialogComponent
  openDialog() {
    this.dialog.open(DialogDataExampleDialogComponent);
  }
  
 

}





