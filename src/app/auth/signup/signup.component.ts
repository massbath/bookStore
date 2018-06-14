import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {


  signupForm: FormGroup;
  errorMessage :string;

  constructor(private formBuilder : FormBuilder,private authService : AuthService, private router:Router) { }

  ngOnInit() {
    this.initForm();
    console.log("init signupComponent");
  }

  initForm(){
    this.signupForm = this.formBuilder.group({
        email : ['', [Validators.required, Validators.email]],
        password : ['',[Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }

  onSubmit(){
    const email = this.signupForm.get('email').value;
    const password = this.signupForm.get('password').value;

    this.authService.createNewUser(email,password).then(
      ()=>{
         this.router.navigate(['/books']);
      },(error)=>{
        this.errorMessage = error;
      })
  }



}
