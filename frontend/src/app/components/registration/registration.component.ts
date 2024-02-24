import {Component} from '@angular/core';
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
  };
  error: string | undefined;
  hasRegistered: boolean = false;

  constructor(private authService: AuthService) {
  }

  onSubmit(form: NgForm) {
    delete this.error;
    if (form.valid) {
      this.authService.register(this.model.username, this.model.password)
        .subscribe({
          next: () => {
            this.hasRegistered = true;
          },
          error: error => {
            this.error = error.error.message;
          }
        });
    }
  }
}
