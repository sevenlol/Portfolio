import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ProjectComponent } from './project/project.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { ValidKeywordDirective } from './valid-keyword.directive';

/**
 * Angular Module for shared components
 *
 * Components:
 * [[ProjectComponent]]
 * [[SpinnerComponent]]
 * [[ValidKeywordDirective]]
 */
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatTooltipModule
  ],
  exports : [
    ProjectComponent,
    SpinnerComponent,
    ValidKeywordDirective
  ],
  declarations: [ProjectComponent, SpinnerComponent, ValidKeywordDirective]
})
export class SharedModule { }
