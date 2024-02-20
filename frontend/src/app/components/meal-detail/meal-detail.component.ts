import {Component, OnInit} from '@angular/core';
import {MealService} from "../../services/meal.service";
import {ActivatedRoute} from "@angular/router";
import {DatePipe} from "@angular/common";
import { Meal } from '../../models/meal';
import {UserService} from "../../services/user.service";
import {UserComponent} from "../user/user.component";

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

  constructor(private route: ActivatedRoute, private mealService: MealService, private userService: UserService) {}

  ngOnInit() {
    this.getMeal();
  }

  getMeal() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;
    this.mealService.getMeal(id)
      .subscribe(meal => {
        this.meal = meal
        this.userService.getUser(meal.cook).subscribe(user => console.log(user));
      });
  }
}
