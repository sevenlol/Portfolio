import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { fakeAsync, discardPeriodicTasks, async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterPanelComponent } from './filter-panel.component';
import {
  MatExpansionModule,
  MatInputModule,
  MatAutocompleteModule,
  MatTabsModule,
  MatRadioModule,
  MatIconModule
} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { MainMetadata, KeywordMetadata, Keyword, Language, Type } from '../../core/metadata.model';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { QueryType } from '../project.service';

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

xdescribe('FilterPanelComponent', () => {
  let component: FilterPanelComponent;
  let fixture: ComponentFixture<FilterPanelComponent>;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [
        FormsModule,
        MatAutocompleteModule,
        MatInputModule,
        MatIconModule,
        MatExpansionModule,
        NoopAnimationsModule,
        MatTabsModule,
        MatRadioModule,
        SharedModule
      ],
      declarations: [ FilterPanelComponent ],
      schemas : [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterPanelComponent);
    component = fixture.componentInstance;
    component.keywords = KEYWORD_METADATA.keywords;
    component.languages = MAIN_METADATA.languages;
    component.categories = MAIN_METADATA.types;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the initial tab correctly', () => {
    let tabGroupEle = de.query(By.css('mat-tab-group'));
    expect(tabGroupEle).toBeTruthy();
    let tabEles = tabGroupEle.queryAll(By.css('.tab-content'));
    expect(tabEles.length).toBe(1);
    let keywordInputEle = tabEles[0].query(By.css('.keyword-input'));
    expect(keywordInputEle).toBeTruthy();
  });

  it('should change state correctly when tab switched', () => {
    // initially on keyword tab
    expect(component.type).toBe(QueryType.KEYWORD);
    expect(component.active).toBeUndefined();
    expect(component.value).toBeUndefined();

    // user set value
    component.active = true;
    component.value = 'Angular';

    // switch to language tab (state cleared)
    component.queryTypeChanged(1);
    expect(component.type).toBe(QueryType.LANGUAGE);
    expect(component.active).toBeUndefined();
    expect(component.value).toBeUndefined();

    // switch to category tab
    component.queryTypeChanged(2);
    expect(component.type).toBe(QueryType.TYPE);
    expect(component.active).toBeUndefined();
    expect(component.value).toBeUndefined();
  });

  it('should generate the options correctly', () => {
    // type, language and keyword options
    checkOptions(MAIN_METADATA.languages, component.languageOptions);
    checkOptions(MAIN_METADATA.types, component.categoryOptions);
    checkOptions(KEYWORD_METADATA.keywords, component.keywordOptions);
  });

  it('should filter keyword correctly', () => {
    // initially, display all of them
    expect(component.filteredKeywords).toBeTruthy();
    expect(component.filteredKeywords.length).toBe(component.keywordOptions.length);
    expect(component.filteredKeywords).toEqual(component.keywordOptions);

    // type 'fire' in the autocomplete input
    component.filteredKeywords = component.filterKeywords('fire');
    fixture.detectChanges();

    // firebase & firestore
    expect(component.filteredKeywords).toBeTruthy();
    expect(component.filteredKeywords.length).toBe(2);

    // type 'angu' in the autocomplete input
    component.filteredKeywords = component.filterKeywords('angu');
    fixture.detectChanges();

    // angular
    expect(component.filteredKeywords).toBeTruthy();
    expect(component.filteredKeywords.length).toBe(1);

    // type 'ttttt' in the autocomplete input
    component.filteredKeywords = component.filterKeywords('ttttt');
    fixture.detectChanges();

    // nothing matched
    expect(component.filteredKeywords).toBeTruthy();
    expect(component.filteredKeywords.length).toBe(0);
  });

  it('should emit query when apply() is called', async(() => {
    component.type = QueryType.LANGUAGE;
    component.active = true;
    component.value = 'javascript';

    component.queryChange.toPromise().then(query => {
      expect(query).toBeTruthy();
      expect(query.type).toBe(component.type);
      expect(query.active).toBe(component.active);
      expect(query.value).toBe(component.value);
    });
    component.apply();
  }));

  it('should emit empty query when clearFilterOptions() is called', async(() => {
    component.type = QueryType.LANGUAGE;
    component.active = true;
    component.value = 'javascript';

    component.queryChange.toPromise().then(query => {
      expect(query).toBeFalsy();
    });
    component.clearFilterOptions();

    // state cleared
    expect(component.active).toBeUndefined();
    expect(component.value).toBeUndefined();

    // query type not cleared
    expect(component.type).toBe(QueryType.LANGUAGE);
  }));
});

function checkOptions(map: Keyword | Type | Language, options: any[]) {
  expect(options).toBeTruthy();
  expect(options.length).toBe(Object.keys(map).length);
  options.forEach(opt => {
    expect(opt).toBeTruthy();
    expect(opt.key).toBeTruthy();
    expect(map[opt.key]).toBeTruthy();
  });
}
