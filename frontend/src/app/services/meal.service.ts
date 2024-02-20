import {Injectable} from '@angular/core';
import {DateHelper, DayOfMeals, Week} from "../calendar";
import {Meal} from "../models/meal";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";
import {environment as env} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MealService {

  constructor(private http: HttpClient) {}

  getMealsOf(week: Week) {
    const from = week.monday.toISOString();
    const to = week.sunday.toISOString();
    return this.http.get<Meal[]>(`${env.apiUrl}/meals?from=${from}&to=${to}`)
      .pipe(
        map(data => {
          return this.structureInDays(data, week);
        })
      );
  }

  getMeal(id: string) {
    return this.http.get<Meal>(`${env.apiUrl}/meals/${id}`);
  }

  addMeal(meal: Meal) {
    return this.http.post<any>(`${env.apiUrl}/meals`, meal);
  }

  structureInDays(meals: Meal[], week: Week): DayOfMeals[] {
    const date: Date = week.monday;
    const days: DayOfMeals[] = [];
    for (let i = 0; i < 7; i++) {
      days.push({date: new Date(date), meals: []});
      date.setDate(date.getDate() + 1);
    }
    meals.forEach(meal => {
      meal.date = new Date(meal.date);
      days.find(day => DateHelper.isSameDay(meal.date, day.date))
        ?.meals.push(meal);
    });
    return days;
  }
}
