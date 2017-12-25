import 'rxjs/add/operator/takeUntil';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Info } from '../core/info/info.model';
import { InfoService } from '../core/info/info.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit, OnDestroy {

  info: Info;
  showSpinner = true;

  private unSub$: Subject<boolean> = new Subject();

  constructor(private infoService: InfoService) { }

  ngOnInit() {
    this.infoService
      .getInfo()
      .takeUntil(this.unSub$)
      .subscribe(info => {
        this.info = info;
        this.showSpinner = false;
      });
  }

  ngOnDestroy() {
    this.unSub$.next(true);
    this.unSub$.complete();
  }
}
