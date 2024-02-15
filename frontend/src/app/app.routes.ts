import { Routes } from '@angular/router';
import {OverviewComponent} from "./overview/overview.component";
import {MealDetailComponent} from "./meal-detail/meal-detail.component";
import {NewMealComponent} from "./new-meal/new-meal.component";
import {LoginComponent} from "./login/login.component";
import {ErrorComponent} from "./error/error.component";

export const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'overview', component: OverviewComponent},
  { path: 'week-of/:date', component: OverviewComponent},
  { path: 'meal/:id', component: MealDetailComponent},
  { path: 'meal/new', component: NewMealComponent},
  { path: 'error', component: ErrorComponent}
];
