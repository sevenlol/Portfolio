import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Observable } from 'rxjs/Observable';

import { Project } from '../../shared/project/project.model';
import { ProjectService, QueryType } from '../project.service';
import { Query } from '../project.service';
import { MainMetadata, KeywordMetadata, Language, Keyword, Type } from '../../core/metadata.model';
import { ProjectListComponent } from './project-list.component';

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

let PROJECT: Project = {
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
  }
};

fdescribe('ProjectListComponent, 5 projects', () => {
  let component: ProjectListComponent;
  let fixture: ComponentFixture<ProjectListComponent>;
  let de: DebugElement;

  // parameters of test data
  let SKIP = 0;
  let LIMIT = 3;
  let NUM_OF_TOTAL_PROJECTS = 5;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [
        HttpClientModule,
        MatButtonModule,
        MatIconModule,
        FlexLayoutModule
      ],
      providers : [
        {
          provide : ProjectService,
          useValue : new ProjectServiceStub(generateProjects(NUM_OF_TOTAL_PROJECTS), SKIP, LIMIT)
        },
        {
          provide : ActivatedRoute,
          useValue : new RouteStub(MAIN_METADATA, KEYWORD_METADATA)
        }
      ],
      declarations: [ ProjectListComponent ],
      schemas : [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectListComponent);
    component = fixture.componentInstance;

    component.languages = MAIN_METADATA.languages;

    // reset parameters
    let service = TestBed.get(ProjectService) as ProjectServiceStub;
    service.skipProjects = SKIP;
    service.limitProjects = LIMIT;

    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display personal project title', () => {
    let titleEle = de.query(By.css('h2.title'));
    expect(titleEle).toBeTruthy();
    expect(titleEle.nativeElement.textContent).toContain('Personal Projects');
  });

  it('should display filter panel', () => {
    let panelEle = de.query(By.css('app-filter-panel'));
    expect(panelEle).toBeTruthy();
  });

  it('should be able to toggle filter panel correctly', () => {
    // initial collapsed
    expect(component.filterPanelExpanded).toBe(false);

    // expand
    component.toggleFilterPanel();
    expect(component.filterPanelExpanded).toBe(true);

    // collapse
    component.toggleFilterPanel();
    expect(component.filterPanelExpanded).toBe(false);
  });

  it('should form the initial query correctly', async(() => {
    let service = TestBed.get(ProjectService) as ProjectServiceStub;

    expect(service.lastProject).toBeUndefined();
    expect(service.limit).toBe(ProjectListComponent.BATCH_COUNT);
    expect(service.query).toBeUndefined();
    expect(component.hasMoreData).toBe(true);
    expect(component.projects).toBeTruthy();
    expect(component.projects.length).toBe(3);
  }));
});

function generateProjects(num: number): Project[] {
  let res = [];
  for (let i = 0; i < num; i++) {
    let proj = JSON.parse(JSON.stringify(PROJECT));
    proj.id = i.toString();
    res.push(proj);
  }
  return res;
}

class ProjectServiceStub {
  // records for validation
  limit: number;
  query: Query;
  lastProject: Project;

  constructor(
    // projects that will be returned (by ovservable)
    public projects: Project[],
    // number of projects skipped
    public skipProjects: number,
    // number of projects returned
    public limitProjects: number) {}

  queryProjects(limit: number, query: Query, lastProject?: Project): Observable<Project[]> {
    this.lastProject = lastProject;
    this.limit = limit;
    this.query = query;
    // e.g., skip=3, limit=5 => index=[3,7] (< 3 || >= 8 filtered out)
    return Observable.of(this.getProjects());
  }

  getProjects(): Project[] {
    return this.projects.filter((project, index) => {
      if (index < this.skipProjects) {
        return false;
      }
      if (index >= this.skipProjects + this.limitProjects) {
        return false;
      }

      return true;
    });
  }
}

class RouteStub extends ActivatedRoute {
  constructor(private main: MainMetadata, private keyword: KeywordMetadata) {
    super();
  }

  data = Observable.of({
    mainMetadata : this.main,
    keywordMetadata : this.keyword
  });
}
