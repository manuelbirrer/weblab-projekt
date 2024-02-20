import { Component } from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  model = {
    username: "",
    password: ""
  }

  constructor(private authService: AuthService) {
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.authService.register(this.model.username, this.model.password)
        .subscribe((data) => {
          console.log(data);
        });
    }
  }
}
