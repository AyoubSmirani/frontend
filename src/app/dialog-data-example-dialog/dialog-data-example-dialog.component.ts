import { Component } from '@angular/core';
import { HttpSerService } from '../http-ser.service';

@Component({
  selector: 'app-dialog-data-example-dialog',
  templateUrl: './dialog-data-example-dialog.component.html',
  styleUrls: ['./dialog-data-example-dialog.component.css']
})
export class DialogDataExampleDialogComponent {
  constructor(private service:HttpSerService){}
  user ={
  message:''
  }

  messageStorage:any = []
  chatSR = {
    send:'',
    receive:''
  } 

  

  sendMessage(){
     this.service.chat(this.user).subscribe((data:any)=>{
      this.chatSR.send = this.user.message
      this.chatSR.receive = data.message
      console.log(this.messageStorage)
      this.messageStorage.push(this.chatSR)
          console.log(data)
     },
     (err)=>{
      console.log(err)
     }
     )
  }


}
