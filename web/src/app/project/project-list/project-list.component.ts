import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/takeUntil';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ObservableMedia } from '@angular/flex-layout';

import { Project } from '../../shared/project/project.model';
import { KeywordMetadata, MainMetadata, Keyword, Language, Type } from '../../core/metadata.model';
import { ProjectComponent } from '../../shared/project/project.component';
import { ProjectService, QueryType } from '../project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit, OnDestroy {

  static readonly HEIGHT_GAP: number = 30;
  static readonly DEFAULT_COLS: number = 1;
  static readonly BATCH_COUNT = 3;

  rowHeight: number = ProjectComponent.HEIGHT + ProjectListComponent.HEIGHT_GAP;

  isLoading: boolean = false;
  hasMoreData: boolean = true;
  cols$: Observable<number>;
  private nextPage$: Subject<void> = new Subject();
  private unSub$: Subject<void> = new Subject();

  keywords: Keyword;
  languages: Language;
  types: Type;

  projects: Project[] = [];

  constructor(
    private media: ObservableMedia,
    private route: ActivatedRoute,
    private service: ProjectService
  ) { }

  ngOnInit() {
    let cols = Object.keys(ProjectComponent.COLS)
      .reduce((col, mqAlias) =>
        // check current width
        (this.media.isActive(mqAlias) ? ProjectComponent.COLS[mqAlias] : col),
        ProjectListComponent.DEFAULT_COLS);
    this.cols$ = this.media.asObservable()
      // window width change
      .map(change => ProjectComponent.COLS[change.mqAlias])
      .startWith(cols)
      .takeUntil(this.unSub$);

    // retrieve metadata (already resolved)
    this.route.data.subscribe(( data : {
      mainMetadata : MainMetadata,
      keywordMetadata : KeywordMetadata }) => {
      this.languages = data.mainMetadata.languages;
      this.types = data.mainMetadata.types;
      this.keywords = data.keywordMetadata.keywords;
    });

    this.nextPage$
      // show spinner
      .do(() => this.isLoading = true)
      .mergeMap(() => {
        if (this.projects.length === 0) {
          // initial query, no endDate/startDate cursor
          return this.service.queryProjects(ProjectListComponent.BATCH_COUNT, null);
        }

        // retrieve the last item as cursor
        let last = this.projects[this.projects.length - 1];
        return this.service.queryProjects(ProjectListComponent.BATCH_COUNT, null, last);
      })
      // component descruction
      .takeUntil(this.unSub$)
      .subscribe(this.handleData.bind(this));

    this.nextPage$.next();
  }

  public loadNext() {
    // TODO implement infinite scrolling
    // user triggers load next page event
    this.nextPage$.next();
  }

  ngOnDestroy() {
    this.unSub$.next();
    this.unSub$.complete();
  }

  private handleData(projects: Project[]) {
    // hide spinner
    this.isLoading = false;
    // if # of results is less than batch count, no more data
    this.hasMoreData = projects.length === ProjectListComponent.BATCH_COUNT;
    projects.forEach(project => this.projects.push(project));
  }
}
