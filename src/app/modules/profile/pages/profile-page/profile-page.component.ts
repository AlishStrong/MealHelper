import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as firebase from 'firebase';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  edit = false;
  edit$ = of(this.edit);
  userForm$: Observable<FormGroup>;
  constructor(private auth: AuthService) {
    this.userForm$ = auth.user$.pipe(
      map((user: firebase.User) => {
        return new FormGroup({
          displayName: new FormControl(user.displayName),
          email: new FormControl(user.email, [Validators.email, Validators.required])
        });
      })
    );
  }

  ngOnInit() {
  }

  editProfile() {
    this.edit = true;
    this.edit$ = of(this.edit);
  }

  save(formValue: { [key: string]: any }) {
    this.edit = false;
    this.edit$ = this.auth.user$.pipe(
      map((user: firebase.User) => {
        user.updateProfile({...formValue})
          .then(_ => {
            console.log('Profile updated');
            alert('Profile updated');
          })
          .catch(err => {
            console.error(err);
            alert(err);
          });
        return this.edit;
      })
    );
  }
  
  cancel() {
    this.edit = false;
    this.edit$ = of(this.edit);
  }
}
