import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OverviewComponent} from './overview.component';
import {ActivatedRoute} from "@angular/router";
import {MealService} from "../../services/meal.service";
import {of} from "rxjs";

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
});
