import { Routes } from '@angular/router';
import {OverviewComponent} from "./components/overview/overview.component";
import {MealDetailComponent} from "./components/meal-detail/meal-detail.component";
import {NewMealComponent} from "./components/new-meal/new-meal.component";
import {LoginComponent} from "./components/login/login.component";
import {authGuard} from "./auth-guard";
import {RegistrationComponent} from "./components/registration/registration.component";

export const routes: Routes = [
  { path: '', component: OverviewComponent, canActivate: [authGuard]},
  { path: 'week-of/:date', component: OverviewComponent, canActivate: [authGuard]},
  { path: 'meal/new', component: NewMealComponent, canActivate: [authGuard]},
  { path: 'meal/:id', component: MealDetailComponent, canActivate: [authGuard]},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegistrationComponent}
];
