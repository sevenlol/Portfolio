import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDetailComponent } from './project-detail.component';
import { Observable } from 'rxjs/Observable';

import { MainMetadata, KeywordMetadata } from '../../core/metadata.model';
import { MatIconModule } from '@angular/material';
import { Project } from '../../shared/project/project.model';
import { ProjectService, Query } from '../project.service';
import { Params } from '@angular/router/src/shared';

const MAIN_METADATA: MainMetadata = {
  languages : {
    javascript : {
      displayName : 'Javascript'
    }
  },
  types : {
    web : {
      displayName : 'Web'
    }
  }
};

const KEYWORD_METADATA: KeywordMetadata = {
  keywords : {
    angular : {
      displayName : 'Angular'
    },
    firebase : {
      displayName : 'Firebase'
    },
    firestore : {
      displayName : 'Firestore'
    },
    material : {
      displayName : 'Material'
    }
  }
};

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
  links : {
    doc : [
      {
        name : 'Documentation 1',
        url : 'doc url 1'
      },
      {
        name : 'Documentation 2',
        url : 'doc url 2'
      }
    ],
    github : [
      {
        name : 'Main Project',
        url : 'https://github.com/sevenlol/Portfolio'
      }
    ],
    demoImage : [],
    demoVideo : []
  }
};

class ProjectServiceStub {
  constructor(private project: Project) {}

  get(id: string): Observable<Project> {
    return Observable.of(this.project);
  }

  queryProjects(limit: number, query: Query, lastProject?: Project): Observable<Project[]> {
    // not used
    throw new Error('Not implemented');
  }
}

class ParamMapStub {
  readonly keys;
  constructor(private map: Params) {
    this.keys = Object.keys(map);
  }

  has(name: string): boolean {
    return name in this.map;
  }

  get(name: string): string | null {
    return this.map[name];
  }

  getAll(name: string): string[] {
    // not used
    throw new Error('Not implemented');
  }
}

class RouteStub extends ActivatedRoute {
  constructor(
    private main: MainMetadata,
    private keyword: KeywordMetadata,
    private id: string) {
    super();
  }

  params = Observable.of(new ParamMapStub({ id : this.id }));

  data = Observable.of({
    mainMetadata : this.main,
    keywordMetadata : this.keyword
  });
}

describe('ProjectDetailComponent', () => {
  let component: ProjectDetailComponent;
  let fixture: ComponentFixture<ProjectDetailComponent>;

  const FAKE_ID = 'fake-id';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [
        MatIconModule
      ],
      declarations: [ ProjectDetailComponent ],
      providers : [
        {
          provide : ActivatedRoute,
          useValue : new RouteStub(MAIN_METADATA, KEYWORD_METADATA, FAKE_ID)
        },
        {
          provide : ProjectService,
          useValue : new ProjectServiceStub(PROJECT)
        }
      ],
      schemas : [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the project correctly', () => {
    expect(component.project).toBe(PROJECT);
  });
});
