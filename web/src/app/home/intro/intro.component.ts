import { Component, OnInit, Input } from '@angular/core';

import { BasicInfo } from '../../core/info/info.model';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css']
})
export class IntroComponent implements OnInit {

  @Input() basicInfo: BasicInfo;

  constructor() { }

  ngOnInit() {
  }

}
