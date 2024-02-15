import {Injectable} from '@angular/core';
import {DateHelper, DayOfMeals, Meal, Week} from "./calendar";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MealService {

  constructor(private http: HttpClient) {}

  getMeals(week: Week) {
    const from = week.monday.toISOString();
    const to = week.sunday.toISOString();
    return this.http.get<Meal[]>(`http://localhost:3000/meals?from=${from}&to=${to}`)
      .pipe(
        map(data => {
          return this.structureInDays(data, week);
        })
      );
  }

  getMeal(id: string) {
    return this.http.get<Meal>(`http://localhost:3000/meals/${id}`);
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
