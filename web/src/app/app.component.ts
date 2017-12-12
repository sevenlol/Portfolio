import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';

import { Component, OnInit } from '@angular/core';
import {
  Router,
  RouterEvent,
  NavigationStart,
  NavigationCancel,
  NavigationEnd,
  NavigationError
} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  showSpinner: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events
      .filter(e => this.isStart(e) || this.isEnd(e))
      .map(e => this.isStart(e))
      .distinctUntilChanged()
      .subscribe((isStart) => this.showSpinner = isStart);
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
