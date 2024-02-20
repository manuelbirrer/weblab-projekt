import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
  @Input({required: true})
  id!: string;

  user: User | undefined;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.userService.getUser(this.id).subscribe(user => this.user = user);
  }

  getBackgroundColor() {
    const hash = [...this.id].reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);
    return `hsl(${hash % 360}, 100%, 75%`;
  }
}
