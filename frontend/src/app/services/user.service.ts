import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment as env} from "../../environments/environment";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<User[]>(`${env.apiUrl}/users`);
  }

  getUser(id: string) {
    return this.http.get<User>(`${env.apiUrl}/users/${id}`);
  }
}
