import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryComponent } from './summary.component';
import { MatCardModule, MatButtonModule } from '@angular/material';
import { Info } from '../../core/info/info.model';

const INFO: Info = {
  email : 'sevenlol1007@gmail.com',
  name : 'Stephen Lin',
  label : 'Backend Developer',
  image : 'https://avatars3.githubusercontent.com/u/6497884?s=400&u=14a9be7c3afc0a1e0d797db1d9a7c86c5aac7a83&v=4',
  location : {
    city : 'Hsinchu',
    region : 'Taiwan'
  },
  phone : '0912345678',
  url : 'https://sevenloldev.com',
  resumeUrl : 'https://sevenloldev.com/resume',
  summary : 'A backend developer that uses Java & NodeJS',
  education : [],
  profile : {}
};

describe('SummaryComponent', () => {
  let component: SummaryComponent;
  let fixture: ComponentFixture<SummaryComponent>;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [
        MatCardModule,
        MatButtonModule
      ],
      declarations: [ SummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    component.info = INFO;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display summary correctly', () => {
    let summaryEle = de.query(By.css('mat-card-content p'));
    expect(summaryEle).toBeTruthy();
    expect(summaryEle.nativeElement.textContent).toContain(INFO.summary);
  });

  it('should display resume link correctly', () => {
    let resumeEle = de.query(By.css('mat-card-actions a'));
    expect(resumeEle).toBeTruthy();
    expect(resumeEle.nativeElement.textContent).toContain('View My Resume');
    // link matches mocked resume url
    expect(resumeEle.nativeElement.getAttribute('href')).toBe(INFO.resumeUrl);
  });
});
