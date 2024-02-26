import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComponent } from './user.component';
import {UserService} from "../../services/user.service";
import {of} from "rxjs";

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let userService: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    const userServiceSpy = jasmine.createSpyObj("userService", ["getUser"]);

    await TestBed.configureTestingModule({
      imports: [UserComponent],
      providers: [{provide: UserService, useValue: userServiceSpy}]
    })
    .compileComponents();

    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    userService.getUser.and.returnValue(of(undefined));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getUser on initialization', () => {
    component.id = "testUserId";
    userService.getUser.and.returnValue(of({_id: "testUserId", username: "testUser"}));
    component.ngOnInit();
    expect(userService.getUser).toHaveBeenCalledWith("testUserId");
  });

  it('should return a valid hue', () => {
    component.id = "testUserId";
    const hue = component.getHue();
    expect(hue).toBeGreaterThanOrEqual(0);
    expect(hue).toBeLessThan(360);
  });
});
