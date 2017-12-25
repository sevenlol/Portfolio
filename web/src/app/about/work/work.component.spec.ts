import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkComponent } from './work.component';
import { MatExpansionModule, MatButtonModule, MatCardModule, MatListModule } from '@angular/material';

import { InfoService } from '../../core/info/info.service';
import { WorkExperience, Info, BasicInfo } from '../../core/info/info.model';
import { Observable } from 'rxjs/Observable';

const EXPERIENCE: WorkExperience = {
  name : 'Company',
  location : 'Location',
  position : 'Position',
  summary : 'Summary',
  description : 'Description',
  startDate : new Date(),
  endDate : new Date(),
  highlights : [
    'item1',
    'item2'
  ]
};

class InfoServiceStub {

  getInfo(): Observable<Info> {
    throw new Error('Not implemented');
  }
  getBasicInfo(): Observable<BasicInfo> {
    throw new Error('Not implemented');
  }

  getWork(): Observable<WorkExperience[]> {
    // TODO set the data from constructor
    return Observable.of([ EXPERIENCE ]);
  }
}

describe('WorkComponent', () => {
  let component: WorkComponent;
  let fixture: ComponentFixture<WorkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [
        MatButtonModule,
        MatCardModule,
        MatListModule,
        MatExpansionModule,
        NoopAnimationsModule
      ],
      declarations: [ WorkComponent ],
      providers : [
        {
          provide : InfoService,
          useValue : new InfoServiceStub()
        }
      ],
      schemas : [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO test the component
});
