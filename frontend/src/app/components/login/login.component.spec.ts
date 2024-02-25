import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LoginComponent} from './login.component';
import {AuthService} from "../../services/auth.service";
import {BehaviorSubject} from "rxjs";
import {ActivatedRoute} from "@angular/router";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;


  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj("authService", ['getUserId', 'isLoggedIn']);

    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        {provide: AuthService, useValue: authServiceSpy},
        {provide: ActivatedRoute, useValue: {}}
      ]
    })
      .compileComponents();

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService.getUserId.and.returnValue(new BehaviorSubject<string | undefined>("testUserId"));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
