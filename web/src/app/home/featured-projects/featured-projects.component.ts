import 'rxjs/add/operator/takeUntil';

import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Project } from '../../shared/project/project.model';
import { MainMetadata, KeywordMetadata, Type, Language, Keyword } from '../../core/metadata.model';
import { FeaturedProjectService } from './featured-project.service';
import { Subject } from 'rxjs/Subject';

const NUM_PROJECTS_PER_ROW = 3;

/**
 * Angular Module: [[HomeModule]]
 *
 * Component to display featured projects
 */
@Component({
  selector: 'app-featured-projects',
  templateUrl: './featured-projects.component.html',
  styleUrls: ['./featured-projects.component.css']
})
export class FeaturedProjectsComponent implements OnInit, OnDestroy {

  /**
   * Already retrieved featured projects
   * (in two dimension array [row][column])
   */
  featuredProjects: Project[][];

  /**
   * keyword resource map
   */
  keywords: Keyword;
  /**
   * language resource map
   */
  languages: Language;
  /**
   * project category resource map
   */
  types: Type;
  /**
   * whether to display spinner or not
   */
  showSpinner = true;

  /**
   * trigger to stop retrieving featured projects
   */
  private unSub$: Subject<boolean> = new Subject();

  /**
   * @input Main metadata resource, containing language &
   * project category
   */
  @Input() mainMetadata: MainMetadata;
  /**
   * @input Keyword metadata resource
   */
  @Input() keywordMetadata: KeywordMetadata;

  constructor(private projectService: FeaturedProjectService) { }

  /**
   * @hidden
   */
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

  /**
   * @hidden
   */
  ngOnDestroy() {
    this.unSub$.next(true);
    this.unSub$.complete();
  }
}
