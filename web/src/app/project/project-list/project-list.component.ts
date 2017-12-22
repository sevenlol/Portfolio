import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/combineLatest';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ObservableMedia } from '@angular/flex-layout';

import { Project } from '../../shared/project/project.model';
import { KeywordMetadata, MainMetadata, Keyword, Language, Type } from '../../core/metadata.model';
import { ProjectComponent } from '../../shared/project/project.component';
import { ProjectService, QueryType, Query } from '../project.service';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

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

  filterPanelExpanded: boolean = false;
  isLoading: boolean = false;
  hasMoreData: boolean = true;
  cols$: Observable<number>;
  private nextPage$: Subject<void> = new Subject();
  private queryChange$: Subject<Query> = new Subject();
  private unSub$: Subject<void> = new Subject();
  private currQuery: Query;

  keywords: Keyword;
  languages: Language;
  types: Type;

  projects: Project[] = [];

  constructor(
    private media: ObservableMedia,
    private route: ActivatedRoute,
    private service: ProjectService,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.registerIcon('filter-list', 'assets/icons/filter_list.svg');
    this.registerIcon('clear', 'assets/icons/clear.svg');

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
      .combineLatest(this.queryChange$
        .distinctUntilChanged((q1, q2) => {
          if (!q1 || !q2) {
            // both have to be falsy
            return !q1 && !q2;
          }

          // both truthy, compare fields
          return q1.type === q2.type &&
            q1.active === q2.active &&
            q1.value === q2.value;
        })
        // clear current data when query changed
        .do(() => this.projects = []))
      .map(([ nextPage, query ]) => query)
      // show spinner
      .do(() => this.isLoading = true)
      .switchMap((query) => {
        this.currQuery = query;
        if (this.projects.length === 0) {
          // initial query, no endDate/startDate cursor
          return this.service.queryProjects(ProjectListComponent.BATCH_COUNT, query);
        }

        // retrieve the last item as cursor
        let last = this.projects[this.projects.length - 1];
        return this.service.queryProjects(ProjectListComponent.BATCH_COUNT, query, last);
      })
      // component descruction
      .takeUntil(this.unSub$)
      .subscribe(this.handleData.bind(this));

    // initial query
    this.nextPage$.next();
    this.queryChange$.next();
  }

  public loadNext() {
    // TODO implement infinite scrolling
    // user triggers load next page event
    this.nextPage$.next();
  }

  public toggleFilterPanel() {
    this.filterPanelExpanded = !this.filterPanelExpanded;
  }

  public queryChanged(query: Query) {
    // collapse filter panel
    this.filterPanelExpanded = false;
    this.queryChange$.next(query);
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

  // TODO move to utility class
  private registerIcon(name: string, path: string) {
    this.iconRegistry.addSvgIcon(
      name,
      this.sanitizer.bypassSecurityTrustResourceUrl(path));
  }
}
