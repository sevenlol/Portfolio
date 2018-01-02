import { Component, OnInit, Input } from '@angular/core';

import { BasicInfo } from '../../core/info/info.model';

/**
 * Angular Module: [[HomeModule]]
 *
 * Component to provide introduction about myself
 */
@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css']
})
export class IntroComponent implements OnInit {

  /**
   * @input basic information about me
   */
  @Input() basicInfo: BasicInfo;

  constructor() { }

  /**
   * @hidden
   */
  ngOnInit() {
  }

}
