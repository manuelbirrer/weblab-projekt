import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment as env} from "../../environments/environment";
import {LoginResponse} from "../models/login-response";
import {BehaviorSubject, map, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userId = new BehaviorSubject<string|undefined>(undefined);

  constructor(private http: HttpClient) {
    const userId = localStorage.getItem("user_id");
    if (userId) {
      this.userId.next(userId);
    }
  }

  login(username: string, password: string) {
    return this.http.post<LoginResponse>(`${env.apiUrl}/login`, {username: username, password: password})
      .pipe(map(this.setSession.bind(this)));
  }

  private setSession(loginResponse: LoginResponse) {
    if (loginResponse["jwt"]) {
      localStorage.setItem("access_token", loginResponse.jwt.access_token);
      localStorage.setItem("expires_at", loginResponse.jwt.expires_at);
      localStorage.setItem("user_id", loginResponse.jwt.user_id);
      this.userId.next(loginResponse.jwt.user_id);
    }
    return loginResponse;
  }

  logout(): void {
    localStorage.removeItem("access_token");
    localStorage.removeItem("expires_at");
    localStorage.removeItem("user_id");
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

  getUserId() {
    return this.userId;
  }
}
