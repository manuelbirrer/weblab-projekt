import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutComponent } from './logout.component';
import {AuthService} from "../../services/auth.service";
import {BehaviorSubject} from "rxjs";

describe('LogoutComponent', () => {
  let component: LogoutComponent;
  let fixture: ComponentFixture<LogoutComponent>;
  let authService: jasmine.SpyObj<AuthService>;


  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj("authService", ['logout']);

    await TestBed.configureTestingModule({
      imports: [LogoutComponent],
      providers: [{ provide: AuthService, useValue: authServiceSpy}]
    })
    .compileComponents();

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;

    fixture = TestBed.createComponent(LogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should log out', () => {
    component.logout();
    expect(authService.logout).toHaveBeenCalled();
  });

  it('should redirect after logout', () => {
    authService.logout.and.returnValue();
    spyOn(component['router'], 'navigateByUrl');
    component.logout();
    expect(component['router'].navigateByUrl).toHaveBeenCalled();
  });
});
