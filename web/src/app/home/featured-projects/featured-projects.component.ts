import 'rxjs/add/operator/takeUntil';

import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Project } from '../../shared/project/project.model';
import { MainMetadata, KeywordMetadata, Type, Language, Keyword } from '../../core/metadata.model';
import { FeaturedProjectService } from './featured-project.service';
import { Subject } from 'rxjs/Subject';

const PROJECT = {
  id : 'sssss',
  name : 'Portfolio',
  description : 'Personal Website',
  highlights : [
      'Basic Information',
      'Personal Projects'
  ],
  keywords : {
    angular : Date.now(),
    firebase : Date.now()
  },
  startDate : new Date(2017,11,1),
  endDate : new Date(2017,11,31),
  featured : true,
  active : true,
  url : 'https://sevenloldev.com',
  coverImageUrl : 'https://avatars3.githubusercontent.com/u/6497884?s=400&u=14a9be7c3afc0a1e0d797db1d9a7c86c5aac7a83&v=4',
  languages : {
    javascript : Date.now(),
    nodejs : Date.now()
  },
  primaryLanguage : 'javascript',
  primaryType : 'web',
  types : {
    web : Date.now(),
    backend : Date.now()
  },
  links : {
      doc : [],
      github : [
          {
              name : 'Portfolio Website',
              url : 'https://github.com/sevenlol/Portfolio',
              description : 'Code of the main website'
          }
      ],
      demoVideo : [],
      demoImage : []
  }
};

const NUM_PROJECTS_PER_ROW = 3;

@Component({
  selector: 'app-featured-projects',
  templateUrl: './featured-projects.component.html',
  styleUrls: ['./featured-projects.component.css']
})
export class FeaturedProjectsComponent implements OnInit, OnDestroy {

  featuredProjects: Project[][];

  keywords: Keyword;
  languages: Language;
  types: Type;
  showSpinner: boolean = true;

  private unSub$: Subject<boolean> = new Subject();

  @Input() mainMetadata: MainMetadata;
  @Input() keywordMetadata: KeywordMetadata;

  constructor(private projectService: FeaturedProjectService) { }

  ngOnInit() {
    this.languages = this.mainMetadata.languages;
    this.types = this.mainMetadata.types;
    this.keywords = this.keywordMetadata.keywords;

    this.projectService
      .get(NUM_PROJECTS_PER_ROW)
      .takeUntil(this.unSub$)
      .subscribe(projects => {
        this.showSpinner = false;
        this.featuredProjects = projects;
      });
  }

  ngOnDestroy() {
    this.unSub$.next(true);
    this.unSub$.complete();
  }
}
