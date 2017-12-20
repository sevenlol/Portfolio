import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import {
  MatGridListModule,
  MatButtonModule,
  MatExpansionModule,
  MatIconModule,
  MatTooltipModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProjectService } from './project.service';
import { FilterPanelComponent } from './filter-panel/filter-panel.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FlexLayoutModule,
    MatButtonModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatTooltipModule,
    ProjectRoutingModule
  ],
  providers : [ProjectService],
  declarations: [ProjectListComponent, ProjectDetailComponent, FilterPanelComponent]
})
export class ProjectModule { }
