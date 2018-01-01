import 'rxjs/add/operator/takeUntil';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Info } from '../core/info/info.model';
import { InfoService } from '../core/info/info.service';

/**
 * Angular Module: [[AboutModule]]
 *
 * Container component for [[BasicInfoComponent]],
 * [[EducationComponent]], [[SkillComponent]], [[SummaryComponent]]
 * and [[WorkComponent]]
 */
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit, OnDestroy {

  /**
   * information about me
   */
  info: Info;
  /**
   * indicate if the spinner should be displayed
   */
  showSpinner = true;

  /**
   * Trigger to stop receiving info data
   */
  private unSub$: Subject<boolean> = new Subject();

  constructor(private infoService: InfoService) { }

  /**
   * @hidden
   */
  ngOnInit() {
    this.infoService
      .getInfo()
      .takeUntil(this.unSub$)
      .subscribe(info => {
        this.info = info;
        this.showSpinner = false;
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
