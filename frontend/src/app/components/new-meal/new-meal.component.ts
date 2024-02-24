import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../models/user";
import {FormsModule, NgForm} from "@angular/forms";
import {Meal} from '../../models/meal';
import {DateHelper} from "../../calendar";
import {MealService} from "../../services/meal.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-new-meal',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './new-meal.component.html',
  styleUrl: './new-meal.component.css'
})
export class NewMealComponent implements OnInit {
  users: User[] = [];
  model = {
    cook: "",
    date: "",
    time: "",
    note: "",
    recipe: ""
  }
  error: string | undefined;

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService, private mealService: MealService) {
  }

  ngOnInit() {
    this.getUsers();
    const date = this.route.snapshot.queryParamMap.get('date');
    if (date) {
      this.model.date = date;
    }
  }

  getUsers() {
    this.userService.getUsers().subscribe(users => this.users = users);
  }

  onSubmit(form: NgForm) {
    delete this.error;
    if (form.valid) {
      const meal: Meal = {
        cook: this.model.cook,
        date: DateHelper.combineDateAndTimeString(this.model.date, this.model.time),
        recipe: this.model.recipe,
        note: this.model.note
      }
      this.mealService.addMeal(meal)
        .subscribe({
          next: response => {
            this.router.navigateByUrl(`/meal/${response.id}`);
          },
          error: error => {
            this.error = error.error.message;
          }
        });
    }
  }

}
