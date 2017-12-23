import { Component, OnInit, Input } from '@angular/core';

import { Project } from '../../../shared/project/project.model';

@Component({
  selector: 'app-project-highlight',
  templateUrl: './project-highlight.component.html',
  styleUrls: ['./project-highlight.component.css']
})
export class ProjectHighlightComponent implements OnInit {

  @Input() project: Project;

  constructor() { }

  ngOnInit() {
  }

}
