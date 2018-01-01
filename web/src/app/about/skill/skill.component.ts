import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/do';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Skill } from '../../core/info/info.model';
import { InfoService } from '../../core/info/info.service';

/**
 * Angular Module: [[AboutModule]]
 *
 * Component to display my software development skills.
 */
@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent implements OnInit, OnDestroy {

  /**
   * Whether skill data is being loaded
   */
  isLoading = true;
  /**
   * skill information
   */
  skills: Skill[] = [];
  /**
   * Trigger to stop receiving skill data
   */
  unSub$: Subject<void> = new Subject();

  constructor(private infoService: InfoService) { }

  /**
   * @hidden
   */
  ngOnInit() {
    // TODO decide whether to use pagination here
    // skill category is unlikely to grow too much (if any)
    this.infoService
      .querySkills()
      .do(() => this.isLoading = false)
      .takeUntil(this.unSub$)
      .subscribe(skills =>
        this.skills = skills.filter(skill => {
          if (!skill || !skill.items) {
            return false;
          }
          return skill.items.length > 0;
        }));
  }

  /**
   * @hidden
   */
  ngOnDestroy() {
    this.unSub$.next();
    this.unSub$.complete();
  }

  // FIXME remove when the issue below is merged
  // https://github.com/angular/material2/pull/9043
  /**
   * Open the specified url in a new browser tab.
   * As a workaround for {@link https://github.com/angular/material2/pull/9043}
   * @param link url to be open
   */
  openLink(link: string) {
    window.open(link, '_blank');
  }

}
