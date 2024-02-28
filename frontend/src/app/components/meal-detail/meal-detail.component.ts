import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {MealService} from "../../services/meal.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {DatePipe, formatDate, Location} from "@angular/common";
import { Meal } from '../../models/meal';
import {UserComponent} from "../user/user.component";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-meal-detail',
  standalone: true,
  imports: [
    DatePipe,
    UserComponent,
    RouterLink
  ],
  templateUrl: './meal-detail.component.html',
  styleUrl: './meal-detail.component.css'
})
export class MealDetailComponent implements OnInit {
  meal: Meal | undefined;
  isGuest: boolean = false;
  userId: string | undefined;

  constructor(private route: ActivatedRoute, private router: Router, private mealService: MealService, private authService: AuthService, @Inject(LOCALE_ID) public locale: string) {}

  ngOnInit() {
    this.getMeal();
    this.authService.getUserId().subscribe(userId => this.userId = userId);
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
    if (this.meal && this.meal._id && this.userId) {
      this.mealService.addGuestToMeal(this.meal._id, this.userId)
        .subscribe(() => {
          this.isGuest = true;
          this.meal?.guests?.push(this.userId as string);
        });
    }
  }

  leaveMeal() {
    if (this.meal && this.meal._id && this.userId) {
      this.mealService.removeGuestFromMeal(this.meal._id, this.userId)
        .subscribe(() => {
          this.isGuest = false;
          if (this.meal) {
            this.meal.guests = this.meal?.guests?.filter(guest => guest !== this.userId);
          }
        });
    }
  }

  back() {
    if (this.meal) {
      this.router.navigateByUrl(`/week-of/${formatDate(this.meal.date, "YYYY-MM-dd", this.locale)}`);
    } else {
      this.router.navigateByUrl('/');
    }
  }
}
