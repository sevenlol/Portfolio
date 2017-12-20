import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { MatGridListModule, MatButtonModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProjectService } from './project.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FlexLayoutModule,
    MatButtonModule,
    MatGridListModule,
    ProjectRoutingModule
  ],
  providers : [ProjectService],
  declarations: [ProjectListComponent, ProjectDetailComponent]
})
export class ProjectModule { }
