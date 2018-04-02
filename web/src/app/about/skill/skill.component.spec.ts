import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SkillComponent } from './skill.component';
import { BasicInfo, Info, Skill, WorkExperience } from '../../core/info/info.model';
import { InfoService } from '../../core/info/info.service';

class InfoServiceStub {
  constructor(private skills: Skill[]) {}

  getBasicInfo(): Observable<BasicInfo> {
    throw new Error('Not implemented');
  }
  getInfo(): Observable<Info> {
    throw new Error('Not implemented');
  }
  getWork(limit: number, lastEndDate?: Date, lastStartDate?: Date): Observable<WorkExperience[]> {
    throw new Error('Not implemented');
  }
  querySkills(limit?: number, lastSkill?: Skill): Observable<Skill[]> {
    return Observable.of(this.skills);
  }
}

const SKILLS: Skill[] = [
  {
    name : 'Backend',
    items : [
      {
        name : 'Redis',
        url : 'https://redis.io',
        description : 'In memory data store'
      }
    ],
    priority : 3,
    updatedAt : new Date()
  }
];

describe('SkillComponent', () => {
  let component: SkillComponent;
  let fixture: ComponentFixture<SkillComponent>;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillComponent ],
      imports : [ FlexLayoutModule ],
      providers : [
        {
          provide : InfoService,
          useValue : new InfoServiceStub(SKILLS)
        }
      ],
      schemas : [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display skill title', () => {
    const titleEle = de.query(By.css('.skill-title span'));
    expect(titleEle).toBeTruthy();
    expect(titleEle.nativeElement.textContent).toContain('Skills');
  });

  it('should display skills correctly', () => {
    const skillCategoryEles = de.queryAll(By.css('h3[mat-subheader]'));
    // skill category length match
    expect(skillCategoryEles).toBeTruthy();
    expect(skillCategoryEles.length).toBe(SKILLS.length);
    skillCategoryEles.forEach((ele, index) => {
      expect(ele).toBeTruthy();
      // skill category name
      expect(ele.nativeElement.textContent).toContain(SKILLS[index].name);
    });

    // skill item list
    const skillItemListEles = de.queryAll(By.css('mat-chip-list'));
    expect(skillItemListEles).toBeTruthy();
    expect(skillItemListEles.length).toBe(SKILLS.length);
    skillItemListEles.forEach((ele, index) => {
      expect(ele).toBeTruthy();
      const itemEles = ele.queryAll(By.css('mat-chip'));
      expect(itemEles).toBeTruthy();
      // skill item length match
      expect(itemEles.length).toBe(SKILLS[index].items.length);
      itemEles.forEach((item, itemIndex) => {
        const itemObj = SKILLS[index].items[itemIndex];
        expect(item).toBeTruthy();
        expect(item.nativeElement.textContent).toContain(itemObj.name);
      });
    });
  });
});
