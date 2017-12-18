import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule, MatIconModule } from '@angular/material';

import { Info } from '../../core/info/info.model';
import { BasicInfoComponent } from './basic-info.component';

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
  profile : {
    twitter : {
      url : 'https://twitter.com/sevenlol1007',
      username : 'test'
    },
    facebook : {
      url : 'https://www.facebook.com/fattselin',
      username : 'test'
    },
    github : {
      url : 'https://github.com/sevenlol',
      username : 'sevenlol'
    },
    linkedin : {
      url : 'https://www.linkedin.com/in/stephen-lin-b211aa109/',
      username : 'test'
    }
  }
};

describe('BasicInfoComponent', () => {
  let component: BasicInfoComponent;
  let fixture: ComponentFixture<BasicInfoComponent>;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [
        HttpClientModule,
        MatCardModule,
        MatIconModule
      ],
      declarations: [ BasicInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicInfoComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    component.info = INFO;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display name and label correctly', () => {
    let nameEle = de.query(By.css('mat-card-title'));
    expect(nameEle).toBeTruthy();
    expect(nameEle.nativeElement.textContent).toContain(INFO.name);

    let labelEle = de.query(By.css('mat-card-subtitle'));
    expect(labelEle).toBeTruthy();
    expect(labelEle.nativeElement.textContent).toContain(INFO.label);
  });

  it('should display info items correctly', () => {
    let infoEles = de.queryAll(By.css('.info-item'));
    expect(infoEles).toBeTruthy();
    expect(infoEles.length).toBe(3);

    let emailEle = infoEles[0];
    let locationEle = infoEles[1];
    let phoneEle = infoEles[2];

    // email info item
    expect(emailEle).toBeTruthy();
    expect(emailEle.nativeElement.textContent).toContain(INFO.email);

    // location info item
    expect(locationEle).toBeTruthy();
    expect(locationEle.nativeElement.textContent).toContain(INFO.location.city);
    expect(locationEle.nativeElement.textContent).toContain(INFO.location.region);

    // phone info item
    expect(phoneEle).toBeTruthy();
    expect(phoneEle.nativeElement.textContent).toContain(INFO.phone);
  });

  it('should display the correct number of profile items', () => {
    let profileItems = de.queryAll(By.css('.profile-item'));
    expect(profileItems).toBeTruthy();
    expect(profileItems.length).toBe(Object.keys(INFO.profile).length);
  });
});
