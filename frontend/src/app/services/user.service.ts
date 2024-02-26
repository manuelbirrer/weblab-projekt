import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment as env} from "../../environments/environment";
import {User} from "../models/user";
import {of, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private cache: Map<string, User> = new Map();

  constructor(private http: HttpClient) {
  }

  getUsers() {
    return this.http.get<User[]>(`${env.apiUrl}/users`)
      .pipe(tap(users => {
        users.forEach(user => {
          this.cache.set(user._id, user);
        });
      }));
  }

  getVerifiedUsers() {
    return this.http.get<User[]>(`${env.apiUrl}/users?verified=true`)
      .pipe(tap(users => {
        users.forEach(user => {
          this.cache.set(user._id, user);
        });
      }));
  }

  getUser(id: string) {
    if (this.cache.has(id)) {
      return of(this.cache.get(id));
    }
    return this.http.get<User>(`${env.apiUrl}/users/${id}`)
      .pipe(tap(user => {
        this.cache.set(user._id, user);
      }));
  }
}
