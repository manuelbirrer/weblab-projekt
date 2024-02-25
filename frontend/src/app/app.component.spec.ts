import {TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {Component} from "@angular/core";
import {HeaderComponent} from "./components/header/header.component";

describe('AppComponent', () => {
  beforeEach(async () => {
    TestBed.overrideComponent(AppComponent, {
      add: {imports: [HeaderStubComponent]},
      remove: {imports: [HeaderComponent]}
    })
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'weblab-frontend' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('weblab-frontend');
  });

  @Component({standalone: true, selector: 'app-header', template: ''})
  class HeaderStubComponent {}
});
