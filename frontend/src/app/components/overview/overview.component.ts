import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {MealService} from "../../services/meal.service";
import {DateHelper, DayOfMeals, Week} from "../../calendar";
import {DatePipe, formatDate, UpperCasePipe} from "@angular/common";
import {ActivatedRoute, RouterLink} from "@angular/router";

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [
    DatePipe,
    UpperCasePipe,
    RouterLink
  ],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css'
})
export class OverviewComponent implements OnInit {
  days: DayOfMeals[] = [];
  today: Date = new Date();
  week: Week | undefined;

  constructor(private route: ActivatedRoute, private mealService: MealService, @Inject(LOCALE_ID) public locale: string) {
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.week = new Week(this.sanitizeDate(params['date']));
      this.getMeals(this.week);
    });
  }

  sanitizeDate(dateString: string) {
    if (!dateString) {
      return new Date();
    }
    const date = new Date(dateString);
    if (isNaN(date.valueOf())) {
      return new Date();
    }
    return date;
  }

  getMeals(week: Week) {
    this.mealService.getMealsOf(week).subscribe(days => {
      this.days = days;
    });
  }

  isToday(date: Date) {
    return DateHelper.isSameDay(this.today, date);
  }

  protected readonly DateHelper = DateHelper;
  protected readonly DatePipe = DatePipe;
  protected readonly formatDate = formatDate;
}
