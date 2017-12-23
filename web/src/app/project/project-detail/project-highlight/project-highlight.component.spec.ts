import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectHighlightComponent } from './project-highlight.component';

describe('ProjectHighlightComponent', () => {
  let component: ProjectHighlightComponent;
  let fixture: ComponentFixture<ProjectHighlightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectHighlightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectHighlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
