import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatIconModule } from '@angular/material/icon';

import { BasicInfo } from '../core/info/info.model';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { Observable } from 'rxjs/Observable';

const BASIC_INFO: BasicInfo = {
  name : 'Stephen Lin',
  summary : 'Backend Developer',
  image : 'https://avatars3.githubusercontent.com/u/6497884?s=400&u=14a9be7c3afc0a1e0d797db1d9a7c86c5aac7a83&v=4',
  profile : {}
};

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [
        MatIconModule,
        HomeRoutingModule
      ],
      providers : [
        {
          provide : ActivatedRoute,
          useValue : {
            data : Observable.of({
              basicInfo : BASIC_INFO
            })
          }
        }
      ],
      declarations: [ HomeComponent ],
      schemas : [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
