import { Component } from '@angular/core';
import { LoadingSerService } from './loading-ser.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'project';
  
  Showloader = this.loader.loadingAction$;
  constructor(private loader:LoadingSerService)  {}

   

}
