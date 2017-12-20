import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.css']
})
export class FilterPanelComponent implements OnInit {

  @Input() expanded: boolean = false;

  constructor() { }

  ngOnInit() {
  }
}
