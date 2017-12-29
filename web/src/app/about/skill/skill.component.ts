import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/do';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Skill } from '../../core/info/info.model';
import { InfoService } from '../../core/info/info.service';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent implements OnInit, OnDestroy {

  isLoading = true;
  skills: Skill[] = [];

  unSub$: Subject<void> = new Subject();

  constructor(private infoService: InfoService) { }

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

  ngOnDestroy() {
    this.unSub$.next();
    this.unSub$.complete();
  }

  // FIXME remove when the issue below is merged
  // https://github.com/angular/material2/pull/9043
  openLink(link: string) {
    window.open(link, '_blank');
  }

}
