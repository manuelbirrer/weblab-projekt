import {Component, OnInit} from '@angular/core';
import {AuthService} from "@auth0/auth0-angular";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  constructor(public auth: AuthService) {}

  ngOnInit() {
    this.auth.user$.subscribe((profile) => {
      console.log("profile", profile);
    });
    this.auth.isAuthenticated$.subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        console.log("authenticated");
      }
    });
  }

  login() {
    this.auth.loginWithRedirect();
  }
}
