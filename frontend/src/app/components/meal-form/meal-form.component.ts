import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../models/user";
import {FormsModule, NgForm} from "@angular/forms";
import {Meal} from '../../models/meal';
import {DateHelper} from "../../calendar";
import {MealService} from "../../services/meal.service";
import {ActivatedRoute, Router} from "@angular/router";
import {formatDate, Location} from "@angular/common";

@Component({
  selector: 'app-meal-form',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './meal-form.component.html',
  styleUrl: './meal-form.component.css'
})
export class MealFormComponent implements OnInit {
  users: User[] = [];
  id: string | undefined;
  model = {
    date: "",
    time: "",
    cook: "",
    recipe: "",
    note: ""
  }
  error: string | undefined;

  constructor(private route: ActivatedRoute, private router: Router, private location: Location, private userService: UserService, private mealService: MealService, @Inject(LOCALE_ID) public locale: string) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.initFormFor(id);
    } else {
      this.initNewForm();
    }
    this.getUsers();
  }

  initNewForm() {
    const date = this.route.snapshot.queryParamMap.get('date');
    if (date) {
      this.model.date = date;
    }
  }

  initFormFor(id: string) {
    this.id = id;
    this.mealService.getMeal(id)
      .subscribe({
        next: meal => {
          this.model = {
            date: formatDate(meal.date, "yyyy-MM-dd", this.locale),
            time: formatDate(meal.date, "HH:mm", this.locale),
            cook: meal.cook,
            recipe: meal.recipe,
            note: meal.note ?? "",
          };
        },
        error: error => {

        }
      });
  }

  getUsers() {
    this.userService.getVerifiedUsers().subscribe(users => this.users = users);
  }

  onSubmit(form: NgForm) {
    delete this.error;
    if (!form.valid) {
      return;
    }
    const meal: Meal = {
      cook: this.model.cook,
      date: DateHelper.combineDateAndTimeString(this.model.date, this.model.time),
      recipe: this.model.recipe,
      note: this.model.note
    }
    if (this.id) {
      this.submitUpdate(this.id, meal);
    } else {
      this.submitNew(meal);
    }
  }

  private submitNew(meal: Meal) {
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
  private submitUpdate(id: string, meal: Meal) {
    this.mealService.updateMeal(id, meal)
      .subscribe({
        next: () => {
          this.router.navigateByUrl(`/meal/${this.id}`);
        },
        error: error => {
          this.error = error.error.message;
        }
      });
  }

  back() {
    this.location.back();
  }
}
