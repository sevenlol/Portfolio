import 'rxjs/add/observable/of';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/take';

import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed, fakeAsync, tick, discardPeriodicTasks } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { By } from '@angular/platform-browser';

import { SharedModule } from '../../shared/shared.module';
import { MainMetadata, KeywordMetadata } from '../../core/metadata.model';
import { Project } from '../../shared/project/project.model';
import { FeaturedProjectService } from './featured-project.service';
import { FeaturedProjectsComponent } from './featured-projects.component';

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
    }
  }
};

const BASE_PROJECT: Project = {
  id : '1',
  name : 'test project',
  description : 'test description',
  keywords : {
    angular : Date.now()
  },
  url : 'https://www.google.com',
  startDate : new Date(),
  endDate : new Date(),
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

fdescribe('FeaturedProjectsComponent', () => {
  let projects: Project[][];
  let component: FeaturedProjectsComponent;
  let fixture: ComponentFixture<FeaturedProjectsComponent>;
  let de: DebugElement;

  beforeEach(() => setProjects(3, 5));
  beforeEach(init(projects, 1000));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturedProjectsComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    component.mainMetadata = MAIN_METADATA;
    component.keywordMetadata = KEYWORD_METADATA;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // personal project title
  it('should display personal project title', () => {
    let titleEle = de.query(By.css('h1'));
    expect(titleEle).toBeTruthy();
    expect(titleEle.nativeElement.textContent).toContain('Personal Project');
  })

  // component properties

  it('should display spinner and hide it after projects emit', async(() => {
    fixture.detectChanges();
    expect(component.showSpinner).toBe(true);
    expect(component.featuredProjects).toBeFalsy();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.showSpinner).toBe(false);
      expect(component.featuredProjects === projects);
    });
  }));

  it('should display spinner and hide it after projects emit (fakeAsync)', fakeAsync(() => {
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.showSpinner).toBe(true);
    expect(component.featuredProjects).toBeFalsy();

    // wait for the mock service to emit projects
    tick(1000);

    fixture.detectChanges();
    expect(component.showSpinner).toBe(false);
    expect(component.featuredProjects === projects);
    component.ngOnDestroy();
  }));

  // component templates

  it('should display spinner component before the projects emit', fakeAsync(() => {
    component.ngOnInit();
    fixture.detectChanges();

    let spinnerEle = de.query(By.css('app-spinner'));
    expect(spinnerEle).toBeTruthy();

    // wait for the mock service to emit projects
    tick(1000);

    fixture.detectChanges();
    spinnerEle = de.query(By.css('app-spinner'));
    expect(spinnerEle).toBeFalsy();
  }));

  it('should contains the correct number of project row container', async(() => {
    fixture.detectChanges();

    // no project dom yet
    let rowEles = de.queryAll(By.css('.project-row-container'));
    expect(rowEles.length).toBe(0);

    fixture.whenRenderingDone().then(() => {
      rowEles = de.queryAll(By.css('.project-row-container'));
      expect(rowEles.length).toBe(projects.length);
      rowEles.forEach((ele, i) => {
        // check the number of project component in each row
        let projectEles = de.queryAll(By.css('app-project'));
        expect(projectEles.length).toBe(projects[i].length);
      });
    });
  }));

  // configure the testing projects
  function setProjects(numPerRow: number, count: number) {
    projects = [];
    for (let i = 0; i < count; i++) {
      if (projects.length === 0 || projects[projects.length - 1].length === numPerRow) {
        projects.push([]);
      }
      let proj = JSON.parse(JSON.stringify(BASE_PROJECT));
      proj.id = '' + i;
      projects[projects.length - 1].push(proj);
    }
  }
});

function init(projects: Project[][], delay: number) {
  return async(() => {
    TestBed.configureTestingModule({
      imports : [ SharedModule ],
      providers : [
        {
          provide : FeaturedProjectService,
          useValue : new FeaturedProjectServiceStub(projects, delay)
        }
      ],
      declarations: [ FeaturedProjectsComponent ],
      schemas : [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  });
}

class FeaturedProjectServiceStub extends FeaturedProjectService {
  constructor(private projects: Project[][], private delay: number) {
    super(null);
  }

  get(numPerRow: number): Observable<Project[][]> {
    return Observable.timer(this.delay).take(1).map(val => this.projects);
  }
}
