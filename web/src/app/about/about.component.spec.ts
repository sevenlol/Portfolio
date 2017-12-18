import 'rxjs/add/observable/of';

import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { InfoService } from '../core/info/info.service';
import { AboutComponent } from './about.component';
import { BasicInfo, Info } from '../core/info/info.model';

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

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutComponent ],
      providers : [
        {
          provide : InfoService,
          useValue : new InfoServiceStub(INFO)
        }
      ],
      schemas : [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should have false showSpinner value until info received', async(() => {
    expect(component.showSpinner).toBeTruthy();
    fixture.detectChanges();
    expect(component.showSpinner).toBeFalsy();
  }));
});

class InfoServiceStub {

  constructor(private info: Info) {}

  getBasicInfo(): Observable<BasicInfo> {
    throw new Error('Not implemented');
  }
  getInfo(): Observable<Info> {
    return Observable.of(this.info);
  }
}
