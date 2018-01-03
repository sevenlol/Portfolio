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

/**
 * Angular Module: [[ProjectModule]]
 *
 * Component to display a list of [[Project]] based on current filter
 * options.
 */
@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit, OnDestroy {

  static readonly HEIGHT_GAP: number = 30;
  static readonly DEFAULT_COLS: number = 1;
  static readonly BATCH_COUNT = 3;

  /**
   * row height for project grid
   */
  rowHeight: number = ProjectComponent.HEIGHT + ProjectListComponent.HEIGHT_GAP;

  /**
   * flag to expand/collapse the filter panel
   */
  filterPanelExpanded = false;
  /**
   * flag to indicate whether there is data being loaded
   */
  isLoading = false;
  /**
   * flag to indicate whether there are projects to be loaded
   */
  hasMoreData = true;
  /**
   * latest query object
   */
  currQuery: Query;
  /**
   * number of columns in the project grid, based on current device width
   */
  cols$: Observable<number>;
  /**
   * observable to trigger loading the next batch of projects
   */
  private nextPage$: Subject<void> = new Subject();
  /**
   * observable to indicate query object is changed
   */
  private queryChange$: Subject<Query> = new Subject();
  /**
   * trigger to stop loading data
   */
  private unSub$: Subject<void> = new Subject();

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
   * current loaded (cached) projects
   */
  projects: Project[] = [];

  constructor(
    private media: ObservableMedia,
    private route: ActivatedRoute,
    private service: ProjectService,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) { }

  /**
   * @hidden
   * 1. Register icons
   * 2. Retrieve language, keyword and category resource map
   *    from router (already resolved)
   * 3. Configure project list observable based on current query,
   *    current loaded projects and number of projects per batch
   */
  ngOnInit() {
    this.registerIcon('filter-list', 'assets/icons/filter_list.svg');
    this.registerIcon('clear', 'assets/icons/clear.svg');

    const cols = Object.keys(ProjectComponent.COLS)
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
    this.route.data.subscribe(( data: {
      mainMetadata: MainMetadata,
      keywordMetadata: KeywordMetadata }) => {
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
        const last = this.projects[this.projects.length - 1];
        return this.service.queryProjects(ProjectListComponent.BATCH_COUNT, query, last);
      })
      // component descruction
      .takeUntil(this.unSub$)
      .subscribe(this.handleData.bind(this));

    // initial query
    this.nextPage$.next();
    this.queryChange$.next();
  }

  /**
   * Load next batch of projects
   */
  public loadNext() {
    // TODO implement infinite scrolling
    // user triggers load next page event
    this.nextPage$.next();
  }

  /**
   * Toggle filter panel
   */
  public toggleFilterPanel() {
    this.filterPanelExpanded = !this.filterPanelExpanded;
  }

  /**
   * Handler for queryChange event.
   * Collapse filter panel and propagate the event
   * @param query query object of in the change event
   */
  public queryChanged(query: Query) {
    // collapse filter panel
    this.filterPanelExpanded = false;
    this.queryChange$.next(query);
  }

  /**
   * Clear current filter option by emiting an empty
   * queryChange event
   */
  public clearQuery() {
    this.queryChange$.next();
  }

  /**
   * @hidden
   */
  ngOnDestroy() {
    this.unSub$.next();
    this.unSub$.complete();
  }

  /**
   * Set isLoading flag and hasMoreData flag based on the received
   * project list
   * @param projects received project list
   */
  private handleData(projects: Project[]) {
    // hide spinner
    this.isLoading = false;
    // if # of results is less than batch count, no more data
    this.hasMoreData = projects.length === ProjectListComponent.BATCH_COUNT;
    // FIXME handle duplication
    projects.forEach(project => this.projects.push(project));
  }

  // TODO move to utility class
  /**
   * Register svg icon to Angular Material
   * @param name name of the svg icon
   * @param path svg file path
   */
  private registerIcon(name: string, path: string) {
    this.iconRegistry.addSvgIcon(
      name,
      this.sanitizer.bypassSecurityTrustResourceUrl(path));
  }
}
