import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { EducationComponent } from './education.component';
import { MatCardModule, MatIconModule, MatListModule } from '@angular/material';
import { Education } from '../../core/info/info.model';

const EDUCATIONS: Education[] = [
  {
    area : 'Electrical Engineering',
    institution : 'National Chiao Tung University',
    studyType : 'Bachelor',
    startDate : new Date(2008, 8, 1),
    endDate : new Date(2012, 5, 30)
  }
];

describe('EducationComponent', () => {
  let component: EducationComponent;
  let fixture: ComponentFixture<EducationComponent>;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [
        MatCardModule,
        MatIconModule,
        MatListModule,
        HttpClientModule
      ],
      declarations: [ EducationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationComponent);
    component = fixture.componentInstance;
    component.educations = EDUCATIONS;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display education title correctly', () => {
    let titleEle = de.query(By.css('mat-card-title span'));
    expect(titleEle).toBeTruthy();
    expect(titleEle.nativeElement.textContent).toContain('Education');
  });

  it('should display the correct number of education items', () => {
    let eduItemListEle = de.queryAll(By.css('mat-list'));
    expect(eduItemListEle).toBeTruthy();
    // one for desktop layout, another for mobile
    expect(eduItemListEle.length).toBe(2);
    eduItemListEle.forEach(listEle => {
      let eduItemEles = listEle.queryAll(By.css('mat-list-item'));
      expect(eduItemEles).toBeTruthy();
      expect(eduItemEles.length).toBe(EDUCATIONS.length);
      eduItemEles.forEach((ele, i) => {
        expect(ele).toBeTruthy();
        let institutionEle = ele.query(By.css('h4[mat-line]'));
        expect(institutionEle).toBeTruthy();
        // institution of this education item
        expect(institutionEle.nativeElement.textContent).toContain(EDUCATIONS[i].institution);
      });
    });
  });
});
