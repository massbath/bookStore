import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import * as firebase from 'firebase';


/**
* Composant gérant le header de l'application
**/
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isAuth : boolean;
  email: string;

  constructor(private authService : AuthService) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(
      (user) => {
        this.isAuth = false;
        if(user){
          this.isAuth = true;
          this.email = user.email;
        }
      }
    )
  }

  onSignOut(){
    this.authService.signOutUser();
  }

}
