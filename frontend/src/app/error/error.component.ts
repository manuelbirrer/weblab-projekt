import {Component, OnInit} from '@angular/core';
import {AuthService} from "@auth0/auth0-angular";
import {Observable} from "rxjs";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [
    AsyncPipe
  ],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css'
})
export class ErrorComponent implements OnInit {

  public error$: Observable<Error>;

  constructor(private auth: AuthService) {
    this.error$ = this.auth.error$;
  }

  ngOnInit() {
    this.error$.subscribe(error => {
      console.log(error);
    })
  }
}
