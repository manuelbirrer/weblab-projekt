import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment as env} from "../../environments/environment";
import {LoginResponse} from "../models/login-response";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post<LoginResponse>(`${env.apiUrl}/login`, {username: username, password: password})
      .pipe(map(this.setSession));
  }

  private setSession(loginResponse: LoginResponse) {
    if (loginResponse["jwt"]) {
      localStorage.setItem("access_token", loginResponse.jwt.access_token);
      localStorage.setItem("expires_at", loginResponse.jwt.expires_at);
    }
    return loginResponse;
  }

  logout(): void {
    localStorage.removeItem("access_token");
    localStorage.removeItem("expires_at");
  }

  isLoggedIn(): boolean {
    return this.getExpiration() > new Date();
  }

  canActivate(): boolean {
    return this.isLoggedIn();
  }

  getExpiration() {
    const expiresAt = Number(localStorage.getItem("expires_at") ?? 0);
    return new Date(expiresAt);
  }

  register(username: string, password: string) {
    return this.http.post<any>(`${env.apiUrl}/users`, {username: username, password: password});
  }

}
