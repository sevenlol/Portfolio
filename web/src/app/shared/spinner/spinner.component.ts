import { Component, OnInit, Input } from '@angular/core';

/**
 * Angular Module: [[SharedModule]]
 *
 * Component of a spinner
 */
@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {

  /**
   * default diameter of the spinner
   */
  private static readonly DEFAULT_DIAMETER: number = 85;
  /**
   * default top margin
   */
  private static readonly DEFAULT_TOP_MARGIN: string = '100px';

  /**
   * @input diameter of the spinner
   */
  @Input() diameter: number = SpinnerComponent.DEFAULT_DIAMETER;
  /**
   * @input top margin of this component
   */
  @Input() topMargin: string = SpinnerComponent.DEFAULT_TOP_MARGIN;

  constructor() { }

  /**
   * @hidden
   */
  ngOnInit() {
  }

}
