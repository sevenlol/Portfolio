import { Component, OnInit, Input } from '@angular/core';
import { Info } from '../../core/info/info.model';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  @Input() info: Info;

  constructor() { }

  ngOnInit() {
  }

}
