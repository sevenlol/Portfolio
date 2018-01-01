import { Component, OnInit, Input } from '@angular/core';
import { Info } from '../../core/info/info.model';

/**
 * Angular Module: [[AboutModule]]
 *
 * Component to display personal summary
 */
@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  /**
   * @input information about me
   */
  @Input() info: Info;

  constructor() { }

  /**
   * @hidden
   */
  ngOnInit() {
  }

}
