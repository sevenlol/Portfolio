import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { BasicInfo } from '../../core/info/info.model';
import { IntroComponent } from './intro.component';

describe('IntroComponent', () => {
  let component: IntroComponent;
  let fixture: ComponentFixture<IntroComponent>;
  let de: DebugElement;

  const BASIC_INFO: BasicInfo = {
    name : 'Stephen Lin',
    summary : 'Backend Developer',
    image : 'https://avatars3.githubusercontent.com/u/6497884?s=400&u=14a9be7c3afc0a1e0d797db1d9a7c86c5aac7a83&v=4',
    profile : {}
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    component.basicInfo = BASIC_INFO;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // name
  it('should contain the correct name', () => {
    let nameEle: DebugElement = de.query(By.css('h1'));
    expect(nameEle.nativeElement.textContent).toContain(BASIC_INFO.name);
  });

  // summary
  it('should contain the correct summary', () => {
    let summaryEle: DebugElement = de.query(By.css('p'));
    expect(summaryEle.nativeElement.textContent).toContain(BASIC_INFO.summary);
  });

  // image
  it('should load the correct image link', () => {
    let imageEle: DebugElement = de.query(By.css('.img-circular'));
    // dom exists
    expect(imageEle).toBeTruthy();
    // image url matched
    expect(imageEle.nativeElement.style['background-image']).toBe(`url("${BASIC_INFO.image}")`);
  });
});
