import { Component, OnInit, Input } from '@angular/core';

import { Project } from '../../../shared/project/project.model';

@Component({
  selector: 'app-project-demo',
  templateUrl: './project-demo.component.html',
  styleUrls: ['./project-demo.component.css']
})
export class ProjectDemoComponent implements OnInit {

  @Input() project: Project;

  constructor() { }

  ngOnInit() {
  }

}
