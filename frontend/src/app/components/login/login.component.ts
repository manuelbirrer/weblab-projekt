import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {FormsModule, NgForm} from "@angular/forms";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  model = {
    username: "",
    password: ""
  }

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigateByUrl(this.redirectUrl());
    }
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.authService.login(this.model.username, this.model.password)
        .subscribe((data) => {
          this.router.navigateByUrl(this.redirectUrl());
        });
    }
  }

  redirectUrl(): string {
    return this.route.snapshot.queryParams["returnUrl"] || "/";
  }
}
