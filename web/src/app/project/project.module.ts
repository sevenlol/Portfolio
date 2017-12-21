import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProjectRoutingModule } from './project-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import {
  MatGridListModule,
  MatButtonModule,
  MatExpansionModule,
  MatIconModule,
  MatTooltipModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatRadioModule,
  MatTabsModule,
  MatAutocompleteModule,
  MatInputModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProjectService } from './project.service';
import { FilterPanelComponent } from './filter-panel/filter-panel.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    FlexLayoutModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatTooltipModule,
    MatSelectModule,
    MatTabsModule,
    MatRadioModule,
    ProjectRoutingModule
  ],
  providers : [ProjectService],
  declarations: [ProjectListComponent, ProjectDetailComponent, FilterPanelComponent]
})
export class ProjectModule { }
