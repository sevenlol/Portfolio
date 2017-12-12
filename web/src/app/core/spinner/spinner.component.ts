import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {

  // TODO add input
  diameter: number = 85;
  topMargin: string = '100px';

  constructor() { }

  ngOnInit() {
  }

}
