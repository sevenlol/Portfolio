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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  showSpinner = false;

  private unSub$: Subject<boolean> = new Subject();

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events
      .filter(e => this.isStart(e) || this.isEnd(e))
      .map(e => this.isStart(e))
      .distinctUntilChanged()
      .takeUntil(this.unSub$)
      .subscribe((isStart) => this.showSpinner = isStart);
  }

  ngOnDestroy() {
    this.unSub$.next(true);
    this.unSub$.complete();
  }

  private isStart(e: any): boolean {
    return e instanceof NavigationStart;
  }

  private isEnd(e: any): boolean {
    return (e instanceof NavigationEnd) ||
      (e instanceof NavigationCancel) ||
      (e instanceof NavigationError);
  }
}
