import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/takeUntil';

import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs/Subject';

import { WorkExperience } from '../../core/info/info.model';
import { InfoService } from '../../core/info/info.service';

/**
 * Angular Module: [[AboutModule]]
 *
 * Component to display my work experience
 */
@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css']
})
export class WorkComponent implements OnInit, OnDestroy {

  /**
   * Number of items per page
   */
  static readonly BATCH_COUNT = 3;

  /**
   * Date format for work item's startDate/endDate
   */
  readonly DATE_FORMAT: string = 'MMM. yyyy';
  /**
   * Whether work data is being loaded
   */
  isLoading = false;
  /**
   * Flag to indicate whether there are remainging data
   */
  hasMoreData = true;
  /**
   * Work experience information
   */
  experiences: WorkExperience[] = [];

  /**
   * Trigger to load next page of work data
   */
  private nextPage$: Subject<void> = new Subject();
  /**
   * Trigger to stop loading work data
   */
  private unSub$: Subject<void> = new Subject();

  constructor(private infoService: InfoService) { }

  /**
   * @hidden
   */
  ngOnInit() {
    this.nextPage$
      // show spinner
      .do(() => this.isLoading = true)
      // use mergeMap so that every change will be updated immediately
      .mergeMap(() => {
        if (this.experiences.length === 0) {
          // initial query, no endDate/startDate cursor
          return this.infoService.getWork(WorkComponent.BATCH_COUNT);
        }

        // retrieve the last item as cursor
        const last = this.experiences[this.experiences.length - 1];
        return this.infoService.getWork(WorkComponent.BATCH_COUNT, last.endDate, last.startDate);
      })
      // component descruction
      .takeUntil(this.unSub$)
      .subscribe(this.handleData.bind(this));
    this.nextPage$.next();
  }

  /**
   * @hidden
   */
  ngOnDestroy() {
    this.unSub$.next();
    this.unSub$.complete();
  }

  /**
   * Load the next batch of work experience items
   */
  public loadNext() {
    // user triggers load next page event
    this.nextPage$.next();
  }

  /**
   * Update work experience list. Replace existing items and
   * append new items to the list.
   * @param works received work experience items
   */
  private handleData(works: WorkExperience[]) {
    // hide spinner
    this.isLoading = false;
    // if # of results is less than batch count, no more data
    this.hasMoreData = works.length === WorkComponent.BATCH_COUNT;
    works.forEach(work => {
      if (!work) {
        return;
      }

      const foundItem = this.experiences.reduce((exists, exp, index) => {
        if (exists) {
          // already updated
          return true;
        }
        if (exp.id === work.id) {
          // update this item
          this.experiences[index] = work;
          return true;
        }

        return false;
      }, false);
      if (!foundItem) {
        // item not in the list
        this.experiences.push(work);
      }
    });
  }
}
