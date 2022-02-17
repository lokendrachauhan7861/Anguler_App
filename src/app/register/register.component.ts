import { Component, OnInit } from '@angular/core';
import { Register } from './register.model';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  data:any;
  message:any;
  status:any;
  confirmpassword:any;
  pattern:any;
  register = new Register();

  constructor( private dataService:DataService ) { }

  ngOnInit(): void {
  }

 createuser()
 {
   this.dataService.createUser(this.register).subscribe((res:any)=>{
   this.data = res;
   this.message = this.data.message;
   this.status = this.data.status;
   this.register = new Register(); // create object because should be null  in form after success.
  })
 }

}
