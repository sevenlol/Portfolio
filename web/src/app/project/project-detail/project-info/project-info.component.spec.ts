import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectInfoComponent } from './project-info.component';
import { MatCardModule, MatChipsModule, MatIconModule, MatTooltipModule, MatListModule } from '@angular/material';

import { Project } from '../../../shared/project/project.model';
import { MainMetadata, KeywordMetadata } from '../../../core/metadata.model';

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

describe('ProjectInfoComponent', () => {
  let component: ProjectInfoComponent;
  let fixture: ComponentFixture<ProjectInfoComponent>;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [
        MatCardModule,
        MatChipsModule,
        MatIconModule,
        MatListModule,
        MatTooltipModule
      ],
      declarations: [ ProjectInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectInfoComponent);
    component = fixture.componentInstance;
    component.project = PROJECT;
    component.keywords = KEYWORD_METADATA.keywords;
    component.languages = MAIN_METADATA.languages;
    component.types = MAIN_METADATA.types;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display project name and description correctly', () => {
    const nameEle = de.query(By.css('mat-card-title span'));
    expect(nameEle).toBeTruthy();
    expect(nameEle.nativeElement.textContent).toContain(component.project.name);

    const desEle = de.query(By.css('.description'));
    expect(desEle).toBeTruthy();
    expect(desEle.nativeElement.textContent).toContain(component.project.description);
  });

  it('should generate display categories correctly', () => {
    expect(component.displayCategories).toBeTruthy();
    expect(component.displayCategories.length).toBe(Object.keys(component.project.types).length);

    const categories = component.displayCategories;
    categories.forEach((category, index) => {
      expect(category.key).toBeTruthy();
      const categoryObj = component.types[category.key];
      expect(categoryObj).toBeTruthy();
      expect(category.displayName).toBe(categoryObj.displayName);
      expect(category.description).toBe(categoryObj.description);
      if (category.key === component.project.primaryType) {
        // primary category has different color
        expect(category.color).toBe(ProjectInfoComponent.PRIMARY_COLOR);
        expect(category.fontColor).toBe(ProjectInfoComponent.PRIMARY_FONT_COLOR);
      } else {
        expect(category.color).toBe(categoryObj.color);
        expect(category.fontColor).toBe(categoryObj.fontColor);
      }
    });
  });

  it('should display project categories correctly', () => {
    const listEle = de.query(By.css('.category-list'));
    expect(listEle).toBeTruthy();
    const itemEles = listEle.queryAll(By.css('mat-chip'));
    expect(itemEles).toBeTruthy();
    // category item length
    expect(itemEles.length).toBe(Object.keys(component.project.types).length);
  });

  // check documentation link template
  it('should display documentation list correctly', checkLinks('doc-list', 'doc'));

  // check github link template
  it('should display github list correctly', checkLinks('github-list', 'github'));

  // cssName is used to query the specific list
  // linkKey is used to retrieve links from link map
  function checkLinks(cssName: string, linkKey: string) {
    return () => {
      const listEle = de.query(By.css('mat-nav-list'));
      expect(listEle).toBeTruthy();
      const linkEle = listEle.query(By.css(`.${cssName}`));
      expect(linkEle).toBeTruthy();
      const linkItemsEle = linkEle.queryAll(By.css('a[mat-list-item]'));
      expect(linkItemsEle).toBeTruthy();
      expect(linkItemsEle.length).toBe(component.project.links[linkKey].length);

      // check doc properties
      linkItemsEle.forEach((doc, index) => {
        const linkObj = component.project.links[linkKey][index];
        const nameEle = doc.query(By.css('h4'));
        expect(nameEle).toBeTruthy();
        expect(nameEle.nativeElement.textContent).toContain(linkObj.name);
        const desEle = doc.query(By.css('span'));
        expect(desEle).toBeTruthy();
        if (linkObj.description) {
          expect(desEle.nativeElement.textContent).toContain(linkObj.description);
        }

        const url = doc.nativeElement.getAttribute('href');
        expect(url).toBe(linkObj.url);
      });
    };
  }
});
