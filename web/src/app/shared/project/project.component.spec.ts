import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { By } from '@angular/platform-browser';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';

import { MainMetadata, KeywordMetadata } from '../../core/metadata.model';
import { Project } from './project.model';
import { ProjectComponent } from './project.component';

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
  }
};

describe('ProjectComponent', () => {
  let component: ProjectComponent;
  let fixture: ComponentFixture<ProjectComponent>;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [
        MatButtonModule,
        MatCardModule,
        MatChipsModule,
        MatTooltipModule
      ],
      declarations: [ ProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    // setup test data
    component.project = PROJECT;
    component.keywords = KEYWORD_METADATA.keywords;
    component.types = MAIN_METADATA.types;
    component.languages = MAIN_METADATA.languages;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // project name
  it('should display project name correctly', () => {
    let titleEle = de.query(By.css('mat-card-title'));
    expect(titleEle).toBeTruthy();
    expect(titleEle.nativeElement.textContent).toContain(PROJECT.name);
  });

  // project description
  it('should display project description correctly', () => {
    let desEle = de.query(By.css('mat-card-content'));
    expect(desEle).toBeTruthy();
    expect(desEle.nativeElement.textContent).toContain(PROJECT.description);
  });

  // language and project type
  it('should display primary language and type correctly', () => {
    let langTypeEle = de.query(By.css('.lang-type'));
    expect(langTypeEle).toBeTruthy();
    let chips = langTypeEle.queryAll(By.css('mat-chip'));
    expect(chips).toBeTruthy();
    // one for language, another for project type
    expect(chips.length).toBe(2);
    let langEle = chips[0];
    let typeEle = chips[1];
    expect(langEle).toBeTruthy();
    expect(langEle.nativeElement.textContent).toContain(
      MAIN_METADATA.languages[PROJECT.primaryLanguage].displayName);
    expect(typeEle).toBeTruthy();
    expect(typeEle.nativeElement.textContent).toContain(
      MAIN_METADATA.types[PROJECT.primaryType].displayName);
  });

  // keywords
  it('should display keywords correctly', () => {
    let keywordListEle = de.query(By.css('.project-footer'));
    expect(keywordListEle).toBeTruthy();
    let keywordEles = keywordListEle.queryAll(By.css('mat-chip'));
    expect(keywordEles).toBeTruthy();
    let keywordCount = Object.keys(PROJECT.keywords).length;
    // keywords displayed (min(MAX_DISPLAY, COUNT))
    expect(keywordEles.length).toBe(Math.min(component.displayKeywordCount, keywordCount));
    keywordEles.forEach((ele) => {
      let keyword = getKeywordKey(ele.nativeElement.textContent.trim());
      expect(keyword).toBeTruthy();
      expect(PROJECT.keywords[keyword]).toBeTruthy();
    });
  });

  it('should display keywords with correct count', () => {
    let keywordCount = Object.keys(PROJECT.keywords).length;

    // change max display count
    component.displayKeywordCount = 2;
    // reload
    component.ngOnInit();
    fixture.detectChanges();

    let keywordListEle = de.query(By.css('.project-footer'));
    expect(keywordListEle).toBeTruthy();
    let keywordEles = keywordListEle.queryAll(By.css('mat-chip'));
    expect(keywordEles).toBeTruthy();
    expect(keywordEles.length).toBe(Math.min(component.displayKeywordCount, keywordCount));

    // different value
    component.displayKeywordCount = 6;
    // reload
    component.ngOnInit();
    fixture.detectChanges();

    keywordListEle = de.query(By.css('.project-footer'));
    expect(keywordListEle).toBeTruthy();
    keywordEles = keywordListEle.queryAll(By.css('mat-chip'));
    expect(keywordEles).toBeTruthy();
    expect(keywordEles.length).toBe(Math.min(component.displayKeywordCount, keywordCount));
  });

  function getKeywordKey(displayName: string): string {
    for (let word in KEYWORD_METADATA.keywords) {
      if (KEYWORD_METADATA.keywords[word].displayName === displayName) {
        return word;
      }
    }
    // should not happen
    throw new Error('Keyword not found');
  }
});
