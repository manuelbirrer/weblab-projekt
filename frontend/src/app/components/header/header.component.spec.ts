import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import {AuthService} from "../../services/auth.service";
import {BehaviorSubject} from "rxjs";

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj("authService", ['getUserId', 'isLoggedIn']);

    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [{ provide: AuthService, useValue: authServiceSpy}]
    })
    .compileComponents();

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    authService.getUserId.and.returnValue(new BehaviorSubject<string | undefined>("testUserId"));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getUserId on initialization', () => {
    component.ngOnInit();

    expect(authService.getUserId).toHaveBeenCalled();
    expect(component.userId).toBe('testUserId');
  });

  it('should check if user is logged in', () => {
    authService.isLoggedIn.and.returnValue(true);
    const result = component.isLoggedIn();
    expect(result).toBe(true);
  });

  it('should not show header if user is not logged in', () => {
    authService.isLoggedIn.and.returnValue(false);
    fixture.detectChanges();
    const headerElement = fixture.nativeElement.querySelector('header');
    expect(headerElement).toBeNull();
  });
});
