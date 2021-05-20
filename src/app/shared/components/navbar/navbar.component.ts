import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit {
  currentUser$: Observable<firebase.User>;
  
  constructor(private auth: AuthService) {
    this.currentUser$ = auth.user$;
  }

  ngOnInit() {
  }

  logout() {
    this.auth.logout();
  }
}
