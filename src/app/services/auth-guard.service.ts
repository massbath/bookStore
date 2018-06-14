import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot,Router} from '@angular/router';
import { Observable} from 'rxjs/Observable';
import * as firebase from 'firebase';

@Injectable()
export class AuthGuardService implements CanActivate{

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state : RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return new Promise(
        (resolve, reject) => {
            firebase.auth().onAuthStateChanged(
               (user) =>{
                 if(user){
                   resolve(true);
                 }else{
                   this.router.navigate(['/auth','signin']);
                   resolve(false);
                 }
               }
            );
        }
      )
  }

}
