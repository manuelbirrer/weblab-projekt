import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutComponent } from './logout.component';
import {AuthService} from "../../services/auth.service";
import {BehaviorSubject} from "rxjs";

describe('LogoutComponent', () => {
  let component: LogoutComponent;
  let fixture: ComponentFixture<LogoutComponent>;
  let authService: jasmine.SpyObj<AuthService>;


  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj("authService", ['getUserId', 'isLoggedIn']);

    await TestBed.configureTestingModule({
      imports: [LogoutComponent],
      providers: [{ provide: AuthService, useValue: authServiceSpy}]
    })
    .compileComponents();

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;

    fixture = TestBed.createComponent(LogoutComponent);
    component = fixture.componentInstance;
    authService.getUserId.and.returnValue(new BehaviorSubject<string | undefined>("testUserId"));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
