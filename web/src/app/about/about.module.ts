import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about.component';
import { BasicInfoComponent } from './basic-info/basic-info.component';
import { MatButtonModule, MatTooltipModule } from '@angular/material';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatTooltipModule,
    SharedModule,
    AboutRoutingModule
  ],
  declarations: [AboutComponent, BasicInfoComponent]
})
export class AboutModule { }
