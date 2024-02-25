import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MealFormComponent} from './meal-form.component';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../services/user.service";
import {MealService} from "../../services/meal.service";
import {of} from "rxjs";

describe('MealFormComponent', () => {
  let component: MealFormComponent;
  let fixture: ComponentFixture<MealFormComponent>;
  let userService: jasmine.SpyObj<UserService>;
  let mealService: jasmine.SpyObj<MealService>;

  beforeEach(async () => {
    const userServiceSpy = jasmine.createSpyObj("userService", ["getUsers"]);
    const mealServiceSpy = jasmine.createSpyObj("mealService", ["getMeal", "addMeal", "updateMeal"]);

    await TestBed.configureTestingModule({
      imports: [MealFormComponent],
      providers: [
        {
          provide: ActivatedRoute, useValue: {
            snapshot:
              {
                paramMap: {
                  get: (key: string) => {
                    return null;
                  }
                },
                queryParamMap: {
                  get: (key: string) => {
                    return null;
                  }
                }
              }
          }
        },
        {provide: UserService, useValue: userServiceSpy},
        {provide: MealService, useValue: mealServiceSpy}
      ]
    })
      .compileComponents();

    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    mealService = TestBed.inject(MealService) as jasmine.SpyObj<MealService>;

    fixture = TestBed.createComponent(MealFormComponent);
    component = fixture.componentInstance;
    userService.getUsers.and.returnValue(of([]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
