import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OverviewComponent} from './overview.component';
import {ActivatedRoute} from "@angular/router";
import {MealService} from "../../services/meal.service";
import {of} from "rxjs";
import {DayOfMeals, Week} from "../../calendar";

describe('OverviewComponent', () => {
  let component: OverviewComponent;
  let fixture: ComponentFixture<OverviewComponent>;
  let mealService: jasmine.SpyObj<MealService>;

  beforeEach(async () => {
    const mealServiceSpy = jasmine.createSpyObj("mealService", ["getMealsOf"]);

    await TestBed.configureTestingModule({
      imports: [OverviewComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({date: "2024-02-25"})
          }
        },
        {provide: MealService, useValue: mealServiceSpy}
      ]
    })
      .compileComponents();

    mealService = TestBed.inject(MealService) as jasmine.SpyObj<MealService>;

    fixture = TestBed.createComponent(OverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with meals of current week', () => {
    const mockDays: DayOfMeals[] = [
      {
        date: new Date("2024-01-01"),
        meals: [
          {
            date: new Date("2024-01-01T18:00:00"),
            recipe: "something",
            cook: "testCookId",
          }
        ]
      }
    ];
    mealService.getMealsOf.and.returnValue(of(mockDays));
    component.ngOnInit();
    expect(mealService.getMealsOf).toHaveBeenCalled();
    expect(component.days).toBe(mockDays);
  });

  it('should be today', () => {
    const today = new Date("2024-01-01");
    component.today = new Date("2024-01-01T18:00:00");
    expect(component.isToday(today)).toBe(true);
  });

  it('should not be today', () => {
    const notToday = new Date("1999-01-01");
    component.today = new Date("2024-01-01");
    expect(component.isToday(notToday)).toBe(false);
  });

  it('should sanitize valid date string', () => {
    const dateString = "2024-01-01";
    const sanitizedDate = component.sanitizeDate(dateString);
    expect(sanitizedDate).toEqual(new Date(dateString));
  });

  it('should sanitize invalid date string', () => {
    const dateString = 'invalid-date-string';
    const sanitizedDate = component.sanitizeDate(dateString);
    expect(isNaN(sanitizedDate.valueOf())).toBe(false);
  });
});
