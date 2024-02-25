import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LoginComponent} from './login.component';
import {AuthService} from "../../services/auth.service";
import {BehaviorSubject, of, throwError} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;


  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj("authService", ['login', 'isLoggedIn']);

    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        {provide: AuthService, useValue: authServiceSpy},
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              queryParams: {}
            }
          }
        }
      ]
    })
      .compileComponents();

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect if logged in', () => {
    authService.isLoggedIn.and.returnValue(true);
    spyOn(component['router'], 'navigateByUrl');
    component.ngOnInit();
    expect(component['router'].navigateByUrl).toHaveBeenCalled();
  });

  it('should not redirect of not logged in', () => {
    authService.isLoggedIn.and.returnValue(false);
    spyOn(component['router'], 'navigateByUrl');
    component.ngOnInit();
    expect(component['router'].navigateByUrl).not.toHaveBeenCalled();
  });

  it('should not submit if form is invalid', () => {
    component.onSubmit({valid: false} as any);
    expect(authService.login).not.toHaveBeenCalled();
  });

  it('should redirect after successful login', () => {
    authService.login.and.returnValue(of({}));
    spyOn(component['router'], 'navigateByUrl');
    component.onSubmit({valid: true} as any);
    expect(component['router'].navigateByUrl).toHaveBeenCalled();
  });

  it('should set error message on failed login', () => {
    const errorMessage = 'An error';
    authService.login.and.returnValue(
      throwError(
        () => new HttpErrorResponse({error: {message: errorMessage}})
      )
    );
    component.onSubmit({valid: true} as any);
    expect(component.error).toBe(errorMessage);
  });
});
