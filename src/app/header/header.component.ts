import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  token:any;
  userData:any;
  username:any;
  constructor( private route:Router ) { }

  ngOnInit(): void {

    this.token = localStorage.getItem('token');
    this.userData = jwt_decode(this.token);
    this.username = this.userData.username;
    //console.log(this.username);
  }

  logout() 
  {
    localStorage.removeItem('token');
    this.route.navigate(['login']);
  }

}
