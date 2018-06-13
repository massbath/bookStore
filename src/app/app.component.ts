import { Component } from '@angular/core';
import * from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

constructor(){
  // Initialize Firebase
 var config = {
   apiKey: "AIzaSyAnvroHBp0TulmPODVljjKrr6c11QYqeHs",
   authDomain: "bookstore-fb8d8.firebaseapp.com",
   databaseURL: "https://bookstore-fb8d8.firebaseio.com",
   projectId: "bookstore-fb8d8",
   storageBucket: "",
   messagingSenderId: "812544879084"
 };
 firebase.initializeApp(config);
}

}
