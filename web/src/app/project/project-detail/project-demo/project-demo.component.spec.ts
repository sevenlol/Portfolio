import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDemoComponent } from './project-demo.component';
import { MatIconModule, MatCardModule, MatChipsModule } from '@angular/material';
import { Project } from '../../../shared/project/project.model';

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
    demoImage : [
      {
        name : 'Stuwart',
        url : 'https://www.google.com'
      }
    ],
    demoVideo : [
      {
        name : 'Demo Video 1',
        url : 'url1'
      },
      {
        name : 'Demo Video 2',
        url : 'url2',
        description : 'xxx'
      }
    ],
    doc : [],
    github : []
  }
};

fdescribe('ProjectDemoComponent', () => {
  let component: ProjectDemoComponent;
  let fixture: ComponentFixture<ProjectDemoComponent>;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [
        MatCardModule,
        MatChipsModule,
        MatIconModule
      ],
      declarations: [ ProjectDemoComponent ],
      schemas : [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDemoComponent);
    component = fixture.componentInstance;
    component.project = PROJECT;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display demo video links correctly', () => {
    let linkEles = de.queryAll(By.css('a[mat-list-item]'));
    // length of videos
    expect(linkEles).toBeTruthy();
    expect(linkEles.length).toBe(component.project.links.demoVideo.length);

    let videos = component.project.links.demoVideo;
    linkEles.forEach((ele, index) => {
      let video = videos[index];
      expect(ele).toBeTruthy();
      // video name
      let nameEle = ele.query(By.css('h4'));
      expect(nameEle).toBeTruthy();
      expect(nameEle.nativeElement.textContent).toContain(video.name);
      // video description
      let descriptionEle = ele.query(By.css('span'));
      if (video.description) {
        expect(descriptionEle.nativeElement.textContent).toContain(video.description);
      } else {
        expect(descriptionEle).toBeFalsy();
      }
      // url of the link
      expect(ele.nativeElement.getAttribute('href')).toBe(video.url);
    });
  });

  it('should display demo images correctly', () => {
    let images = component.project.links.demoImage;

    // image names
    let imageNameEles = de.queryAll(By.css('mat-card-content .demo-image-name'));
    expect(imageNameEles).toBeTruthy();
    expect(imageNameEles.length).toBe(images.length);
    imageNameEles.forEach((ele, index) => {
      let image = images[index];
      expect(ele).toBeTruthy();
      expect(ele.nativeElement.textContent).toContain(image.name);
    });

    // image urls
    let urlEles = de.queryAll(By.css('mat-card-content .demo-image'));
    expect(urlEles).toBeTruthy();
    expect(urlEles.length).toBe(images.length);
    urlEles.forEach((ele, index) => {
      let image = images[index];
      expect(ele).toBeTruthy();
      // image src
      expect(ele.nativeElement.getAttribute('src')).toBe(image.url);
    });
  });
});
