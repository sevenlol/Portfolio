import { Component, OnInit, Input } from '@angular/core';

import { Project } from '../../../shared/project/project.model';

/**
 * Angular Module: [[ProjectModule]]
 *
 * Component to display demo images and videos of this project
 */
@Component({
  selector: 'app-project-demo',
  templateUrl: './project-demo.component.html',
  styleUrls: ['./project-demo.component.css']
})
export class ProjectDemoComponent implements OnInit {

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
