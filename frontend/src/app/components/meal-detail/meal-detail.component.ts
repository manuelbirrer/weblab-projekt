import {Component, OnInit} from '@angular/core';
import {MealService} from "../../services/meal.service";
import {ActivatedRoute} from "@angular/router";
import {DatePipe} from "@angular/common";
import { Meal } from '../../models/meal';
import {UserService} from "../../services/user.service";
import {UserComponent} from "../user/user.component";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-meal-detail',
  standalone: true,
  imports: [
    DatePipe,
    UserComponent
  ],
  templateUrl: './meal-detail.component.html',
  styleUrl: './meal-detail.component.css'
})
export class MealDetailComponent implements OnInit {
  meal: Meal | undefined;
  isGuest: boolean = false;
  userId: string;

  constructor(private route: ActivatedRoute, private mealService: MealService, private authService: AuthService) {
    this.userId = this.authService.getUserId();
  }

  ngOnInit() {
    this.getMeal();
  }

  getMeal() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;
    this.mealService.getMeal(id)
      .subscribe(meal => {
        this.meal = meal;
        this.isGuest = meal.guests?.some(guest => guest == this.userId) ?? false;
      });
  }

  joinMeal() {
    if (this.meal && this.meal._id) {
      this.mealService.addGuestToMeal(this.meal._id, this.userId)
        .subscribe(() => {
          this.isGuest = true;
          this.meal?.guests?.push(this.userId);
        });
    }
  }

  leaveMeal() {
    if (this.meal && this.meal._id) {
      this.mealService.removeGuestFromMeal(this.meal._id, this.userId)
        .subscribe(() => {
          this.isGuest = false;
          if (this.meal) {
            this.meal.guests = this.meal?.guests?.filter(guest => guest !== this.userId);
          }
        });
    }
  }
}
