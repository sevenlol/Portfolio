import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedProjectsComponent } from './featured-projects.component';

describe('FeaturedProjectsComponent', () => {
  let component: FeaturedProjectsComponent;
  let fixture: ComponentFixture<FeaturedProjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeaturedProjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturedProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
