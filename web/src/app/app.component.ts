import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/distinctUntilChanged';

import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  Router,
  RouterEvent,
  NavigationStart,
  NavigationCancel,
  NavigationEnd,
  NavigationError
} from '@angular/router';
import { Subject } from 'rxjs/Subject';

/**
 * Angular Module: [[AppModule]]
 *
 * Root component
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  /**
   * flag to display/hide spinner
   */
  showSpinner = false;

  /**
   * trigger to stop retrieving data
   */
  private unSub$: Subject<boolean> = new Subject();

  constructor(private router: Router) { }

  /**
   * @hidden
   * Show spinner when router starts a new route and
   * hide the spinner when the routing finished
   */
  ngOnInit() {
    this.router.events
      .filter(e => this.isStart(e) || this.isEnd(e))
      .map(e => this.isStart(e))
      .distinctUntilChanged()
      .takeUntil(this.unSub$)
      .subscribe((isStart) => this.showSpinner = isStart);
  }

  /**
   * @hidden
   */
  ngOnDestroy() {
    this.unSub$.next(true);
    this.unSub$.complete();
  }

  /**
   * Check if the incoming event indicates routing started
   * @param e event object
   * @returns true if the event is NavigationStart
   */
  private isStart(e: any): boolean {
    return e instanceof NavigationStart;
  }

  /**
   * Check if the incoming event indicates routing ended
   * @param e event object
   * @returns true if the event is NavigationCancel, NavigationError
   *  or NavigationError
   */
  private isEnd(e: any): boolean {
    return (e instanceof NavigationEnd) ||
      (e instanceof NavigationCancel) ||
      (e instanceof NavigationError);
  }
}
