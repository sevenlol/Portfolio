import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/combineLatest';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ObservableMedia } from '@angular/flex-layout';

import { Skill, SkillItem } from '../../core/info/info.model';
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

  // default # of items per row
  static DEFAULT_NUM_CHIPS_PER_ROW = 8;
  // # of skills items per row
  static readonly CHIPS_PER_ROW = {
    xs : 3,
    sm : 8,
    md : 8,
    lg : 8,
    xl : 8
  };

  /**
   * number of skill items per row, based on current device width
   */
  cols$: Observable<number>;

  /**
   * Whether skill data is being loaded
   */
  isLoading = true;
  /**
   * skill information
   */
  skills: Skill[] = [];
  items: SkillItem[][][] = [];

  /**
   * Trigger to stop receiving skill data
   */
  unSub$: Subject<void> = new Subject();

  constructor(
    private infoService: InfoService,
    private media: ObservableMedia,
  ) { }

  /**
   * @hidden
   */
  ngOnInit() {
    const cols = Object.keys(SkillComponent.CHIPS_PER_ROW)
      .reduce((col, mqAlias) =>
        // check current width
        (this.media.isActive(mqAlias) ? SkillComponent.CHIPS_PER_ROW[mqAlias] : col),
        SkillComponent.DEFAULT_NUM_CHIPS_PER_ROW);
    this.cols$ = this.media.asObservable()
      // window width change
      .map(change => SkillComponent.CHIPS_PER_ROW[change.mqAlias])
      .startWith(cols)
      .takeUntil(this.unSub$);

    // TODO decide whether to use pagination here
    // skill category is unlikely to grow too much (if any)
    this.infoService
      .querySkills()
      .do(() => this.isLoading = false)
      .combineLatest(this.cols$.distinctUntilChanged())
      .takeUntil(this.unSub$)
      .subscribe(item => {
        const skills = item[0];
        const nCols = item[1];
        this.skills = skills.filter(skill => {
          if (!skill || !skill.items) {
            return false;
          }
          return skill.items.length > 0;
        });
        this.items = this.populateSkillItems(nCols);
      });
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

  private populateSkillItems(numChipsPerRow: Number): SkillItem[][][] {
    return this.skills.map(skill => {
      return skill.items.reduce((rows, item) => {
        if (rows.length === 0 || rows[rows.length - 1].length === numChipsPerRow) {
          rows.push([]);
        }
        rows[rows.length - 1].push(item);
        return rows;
      }, []);
    });
  }
}
