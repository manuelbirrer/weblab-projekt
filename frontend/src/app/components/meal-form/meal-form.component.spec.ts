import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MealFormComponent} from './meal-form.component';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../services/user.service";
import {MealService} from "../../services/meal.service";
import {of, throwError} from "rxjs";
import {MockInstance} from "ng-mocks";
import {HttpErrorResponse} from "@angular/common/http";

describe('MealFormComponent', () => {
  let component: MealFormComponent;
  let fixture: ComponentFixture<MealFormComponent>;
  let userService: jasmine.SpyObj<UserService>;
  let mealService: jasmine.SpyObj<MealService>;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    const userServiceSpy = jasmine.createSpyObj("userService", ["getUsers"]);
    const mealServiceSpy = jasmine.createSpyObj("mealService", ["getMeal", "addMeal", "updateMeal"]);

    await TestBed.configureTestingModule({
      imports: [MealFormComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
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
    activatedRoute = TestBed.inject(ActivatedRoute);

    fixture = TestBed.createComponent(MealFormComponent);
    component = fixture.componentInstance;
    userService.getUsers.and.returnValue(of([]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get users', () => {
    const testUsers = [{_id: "testUser1", username: "testUser1"}]
    userService.getUsers.and.returnValue(of(testUsers));
    component.getUsers();
    expect(component.users).toBe(testUsers);
  });

  it('should init new form if no id', () => {
    spyOn(component, 'initNewForm');
    component.ngOnInit();
    expect(component.initNewForm).toHaveBeenCalled();
  });

  it('should get meal if id set', () => {
    activatedRoute.snapshot.paramMap.get = () => {
      return "testMealId"
    };
    spyOn(component, 'initFormFor');
    component.ngOnInit();
    expect(component.initFormFor).toHaveBeenCalledWith("testMealId");
  });

  it('should fill out date in new form if param set', () => {
    activatedRoute.snapshot.queryParamMap.get = () => {
      return "2024-01-01"
    };
    component.ngOnInit();
    expect(component.model.date).toBe("2024-01-01");
  });

  it('should not submit if form is invalid', () => {
    component.onSubmit({valid: false} as any);
    expect(mealService.updateMeal).not.toHaveBeenCalled();
    expect(mealService.addMeal).not.toHaveBeenCalled();
  });

  it('should add meal if id is set', () => {
    activatedRoute.snapshot.paramMap.get = () => {
      return "testMealId"
    };
    mealService.addMeal.and.returnValue(of({id: "newMealId"}));
    component.onSubmit({valid: true} as any);
    expect(mealService.addMeal).toHaveBeenCalled();
  });

  it('should redirect after new form is submitted', () => {
    mealService.addMeal.and.returnValue(of({id: "newMealId"}));
    spyOn(component['router'], 'navigateByUrl');
    component.onSubmit({valid: true} as any);
    expect(component['router'].navigateByUrl).toHaveBeenCalledWith('/meal/newMealId');
  });

  it('should redirect after update form is submitted', () => {
    component.id = "testMealId";
    mealService.updateMeal.and.returnValue(of({}));
    spyOn(component['router'], 'navigateByUrl');
    component.onSubmit({valid: true} as any);
    expect(component['router'].navigateByUrl).toHaveBeenCalledWith('/meal/testMealId');
  });

  it('should set error message on new form failure', () => {
    const errorMessage = "an error";
    mealService.addMeal.and.returnValue(
      throwError(
        () => new HttpErrorResponse({error: {message: errorMessage}})
      )
    );
    component.onSubmit({valid: true} as any);
    expect(component.error).toBe(errorMessage);
  });

  it('should set error message on update form failure', () => {
    const errorMessage = "an error";
    component.id = "testMealId";
    mealService.updateMeal.and.returnValue(
      throwError(
        () => new HttpErrorResponse({error: {message: errorMessage}})
      )
    );
    component.onSubmit({valid: true} as any);
    expect(component.error).toBe(errorMessage);
  });
});
