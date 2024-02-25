import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RegistrationComponent} from './registration.component';
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute} from "@angular/router";

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let authService: jasmine.SpyObj<AuthService>;


  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj("authService", ["register"]);

    await TestBed.configureTestingModule({
      imports: [RegistrationComponent],
      providers: [
        {provide: ActivatedRoute, useValue: {}},
        {provide: AuthService, useValue: authServiceSpy}
      ]
    })
      .compileComponents();

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;

    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
