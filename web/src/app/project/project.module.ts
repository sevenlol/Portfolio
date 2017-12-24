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
  MatCardModule,
  MatExpansionModule,
  MatIconModule,
  MatTooltipModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatRadioModule,
  MatTabsModule,
  MatAutocompleteModule,
  MatInputModule,
  MatChipsModule,
  MatListModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProjectService } from './project.service';
import { FilterPanelComponent } from './filter-panel/filter-panel.component';
import { ProjectInfoComponent } from './project-detail/project-info/project-info.component';
import { ProjectHighlightComponent } from './project-detail/project-highlight/project-highlight.component';
import { ProjectDemoComponent } from './project-detail/project-demo/project-demo.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    FlexLayoutModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatTooltipModule,
    MatSelectModule,
    MatTabsModule,
    MatRadioModule,
    ProjectRoutingModule
  ],
  providers : [ProjectService],
  declarations: [ProjectListComponent, ProjectDetailComponent, FilterPanelComponent, ProjectInfoComponent, ProjectHighlightComponent, ProjectDemoComponent]
})
export class ProjectModule { }
