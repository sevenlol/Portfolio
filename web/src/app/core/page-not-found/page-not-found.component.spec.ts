import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';

import { PageNotFoundComponent } from './page-not-found.component';

const ERROR_MESSAGES = {
  TITLE : 'Oops!',
  CONTENT : 'The page you are looking for cannot be found!'
};

describe('PageNotFoundComponent', () => {
  let component: PageNotFoundComponent;
  let fixture: ComponentFixture<PageNotFoundComponent>;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [
        MatIconModule,
        HttpClientModule
      ],
      declarations: [ PageNotFoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageNotFoundComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispaly error icon', () => {
    const errorEle = de.query(By.css('mat-icon[svgIcon="error"]'));
    expect(errorEle).toBeTruthy();
  });

  it('should display error messages', () => {
    const titleEle = de.query(By.css('h1'));
    expect(titleEle).toBeTruthy();
    expect(titleEle.nativeElement.textContent).toContain(ERROR_MESSAGES.TITLE);

    const contentEle = de.query(By.css('p'));
    expect(contentEle).toBeTruthy();
    expect(contentEle.nativeElement.textContent).toContain(ERROR_MESSAGES.CONTENT);
  });
});
