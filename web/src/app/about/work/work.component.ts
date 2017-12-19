import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/takeUntil';

import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs/Subject';

import { WorkExperience } from '../../core/info/info.model';
import { InfoService } from '../../core/info/info.service';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css']
})
export class WorkComponent implements OnInit, OnDestroy {

  static readonly BATCH_COUNT = 3;

  readonly DATE_FORMAT: string = 'MMM. yyyy';
  isLoading: boolean = false;
  experiences: WorkExperience[] = [];

  private nextPage$: Subject<void> = new Subject();
  private unSub$: Subject<void> = new Subject();
  private hasMoreData: boolean = true;

  constructor(private infoService: InfoService) { }

  ngOnInit() {
    this.nextPage$
      // show spinner
      .do(() => this.isLoading = true)
      .mergeMap(() => {
        if (this.experiences.length === 0) {
          // initial query, no endDate/startDate cursor
          return this.infoService.getWork(WorkComponent.BATCH_COUNT);
        }

        // retrieve the last item as cursor
        let last = this.experiences[this.experiences.length - 1];
        return this.infoService.getWork(WorkComponent.BATCH_COUNT, last.endDate, last.startDate);
      })
      // component descruction
      .takeUntil(this.unSub$)
      .subscribe(this.handleData.bind(this));
    this.nextPage$.next();
  }

  ngOnDestroy() {
    this.unSub$.next();
    this.unSub$.complete();
  }

  public loadNext() {
    // user triggers load next page event
    this.nextPage$.next();
  }

  private handleData(works: WorkExperience[]) {
    // hide spinner
    this.isLoading = false;
    // if # of results is less than batch count, no more data
    this.hasMoreData = works.length === WorkComponent.BATCH_COUNT;
    works.forEach(work => {
      if (!work) {
        return;
      }

      this.experiences.push(work);
    });
  }
}
