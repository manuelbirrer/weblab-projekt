import {Component} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {LogoutComponent} from "../logout/logout.component";
import {UserComponent} from "../user/user.component";
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    LogoutComponent,
    UserComponent,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  userId: string;
  pages = [
    {
      link: "/",
      name: "Overview"
    }
  ];

  constructor(private authService: AuthService) {
    this.userId = this.authService.getUserId();
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }
}
