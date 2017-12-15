import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {

  private static readonly DEFAULT_DIAMETER: number = 85;
  private static readonly DEFAULT_TOP_MARGIN: string = '100px';

  @Input() diameter: number = SpinnerComponent.DEFAULT_DIAMETER;
  @Input() topMargin: string = SpinnerComponent.DEFAULT_TOP_MARGIN;

  constructor() { }

  ngOnInit() {
  }

}
