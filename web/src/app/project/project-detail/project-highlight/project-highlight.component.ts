import { Component, OnInit, Input } from '@angular/core';

import { Project } from '../../../shared/project/project.model';

/**
 * Angular Module: [[ProjectModule]]
 *
 * Component to display highlight text items of this project
 */
@Component({
  selector: 'app-project-highlight',
  templateUrl: './project-highlight.component.html',
  styleUrls: ['./project-highlight.component.css']
})
export class ProjectHighlightComponent implements OnInit {

  /**
   * @input target project instance
   */
  @Input() project: Project;

  constructor() { }

  /**
   * @hidden
   */
  ngOnInit() {
  }

}
