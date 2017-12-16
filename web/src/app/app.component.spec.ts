import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Router, NavigationStart, NavigationEnd, Event } from '@angular/router'
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { AppComponent } from './app.component';

class RouterStub {
  private static readonly URL: string = 'https://localhost:4200/home';
  private sub: Subject<Event> = new Subject();
  public events: Observable<Event> = this.sub.asObservable();

  constructor() {}

  start() {
    this.sub.next(new NavigationStart(0, RouterStub.URL));
  }

  end() {
    this.sub.next(new NavigationEnd(0, RouterStub.URL, null));
  }
}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let de: DebugElement;
  let router = new RouterStub();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [
      ],
      declarations: [
        AppComponent
      ],
      providers : [
        {
          provide : Router,
          useValue : router
        }
      ],
      schemas : [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  }));

  it('should create the app', async(() => {
    expect(component).toBeTruthy();
  }));

  it('should have the correct showSpinner value during routing', async(() => {
    expect(component.showSpinner).toBe(false);

    // simulate routing starts
    router.start();
    fixture.detectChanges();
    expect(component.showSpinner).toBe(true);

    // simulate routing ends
    router.end();
    fixture.detectChanges();
    expect(component.showSpinner).toBe(false);
  }));

  it('should display spinner during routing', async(() => {
    let spinnerEle = de.query(By.css('app-spinner'));
    // not displaying spinner before routing starts
    expect(spinnerEle).toBeFalsy();

    router.start();
    fixture.detectChanges();
    spinnerEle = de.query(By.css('app-spinner'));
    // display spinner during routing
    expect(spinnerEle).toBeTruthy();

    router.end();
    fixture.detectChanges();
    spinnerEle = de.query(By.css('app-spinner'));
    // not displaying spinner fater routing starts
    expect(spinnerEle).toBeFalsy();
  }));
});
