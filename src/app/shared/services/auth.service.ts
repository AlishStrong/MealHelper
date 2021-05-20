import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user$: Observable<firebase.User>;
  public authState$: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth) {
    this.user$ = afAuth.user;
    this.authState$ = afAuth.authState;
   }

  login(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
    .then((uc: firebase.auth.UserCredential) => {
      console.log(`User with UID ${uc.user.uid} has logged in`);
    })
    .catch(console.error)
    .finally(() => console.log(`AuthService.login(${email}, ${password}) finished`));
  }

  logout() {
    this.afAuth.auth.signOut()
    .catch(console.error)
    .finally(() => console.log(`User has signed out`))
  }
}
