import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealDetailComponent } from './meal-detail.component';
import {ActivatedRoute} from "@angular/router";
import {MealService} from "../../services/meal.service";
import {AuthService} from "../../services/auth.service";
import {BehaviorSubject} from "rxjs";

describe('MealDetailComponent', () => {
  let component: MealDetailComponent;
  let fixture: ComponentFixture<MealDetailComponent>;
  let mealService: jasmine.SpyObj<MealService>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const mealServiceSpy = jasmine.createSpyObj("mealService", ["getMeal", "addGuestToMeal", "removeGuestFromMeal"]);
    const authServiceSpy = jasmine.createSpyObj("authService", ["getUserId"]);

    await TestBed.configureTestingModule({
      imports: [MealDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => {
                  return null;
                }
              }
            }
          }
          },
        {provide: MealService, useValue: mealServiceSpy},
        {provide: AuthService, useValue: authServiceSpy}
      ]
    })
    .compileComponents();

    mealService = TestBed.inject(MealService) as jasmine.SpyObj<MealService>;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;

    fixture = TestBed.createComponent(MealDetailComponent);
    component = fixture.componentInstance;
    authService.getUserId.and.returnValue(new BehaviorSubject<string | undefined>(undefined));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
