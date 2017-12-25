import 'rxjs/add/operator/takeUntil';

import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Project } from '../../shared/project/project.model';
import { MainMetadata, KeywordMetadata, Type, Language, Keyword } from '../../core/metadata.model';
import { FeaturedProjectService } from './featured-project.service';
import { Subject } from 'rxjs/Subject';

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
  showSpinner = true;

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
