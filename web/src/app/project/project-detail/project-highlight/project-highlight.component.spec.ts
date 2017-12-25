import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectHighlightComponent } from './project-highlight.component';
import { Project } from '../../../shared/project/project.model';
import { MatCardModule } from '@angular/material';

const PROJECT: Project = {
  id : '123',
  name : 'Test Project',
  description : 'Project description',
  keywords : {
    angular : Date.now(),
    firebase : Date.now(),
    firestore : Date.now(),
    material : Date.now()
  },
  url : 'https://www.google.com',
  startDate : new Date(2017, 11, 1),
  endDate : new Date(2017, 11, 3),
  featured : true,
  active : false,
  primaryLanguage : 'javascript',
  primaryType : 'web',
  languages : {
    javascript : Date.now()
  },
  types : {
    web : Date.now()
  },
  highlights : [
    'item 1',
    'itme 2',
    'item 3',
    'item 4'
  ]
};

describe('ProjectHighlightComponent', () => {
  let component: ProjectHighlightComponent;
  let fixture: ComponentFixture<ProjectHighlightComponent>;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [
        MatCardModule
      ],
      declarations: [ ProjectHighlightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectHighlightComponent);
    component = fixture.componentInstance;
    component.project = PROJECT;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display highlight list correctly', () => {
    let listEle = de.query(By.css('ul'));
    // list
    expect(listEle).toBeTruthy();
    let highlightItemEles = listEle.queryAll(By.css('li'));
    // item
    expect(highlightItemEles).toBeTruthy();
    expect(highlightItemEles.length).toBe(component.project.highlights.length);

    highlightItemEles.forEach((ele, index) => {
      let item = component.project.highlights[index];
      // each item's content
      expect(ele).toBeTruthy();
      expect(ele.nativeElement.textContent).toContain(item);
    });
  });
});
