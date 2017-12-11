import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { IntroComponent } from './intro/intro.component';
import { ContactInfoComponent } from './contact-info/contact-info.component';
import { FeaturedProjectsComponent } from './featured-projects/featured-projects.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FlexLayoutModule,
    MatIconModule,
    MatButtonModule,
    HomeRoutingModule,
    SharedModule,
  ],
  exports : [
    HomeComponent,
    HomeRoutingModule
  ],
  declarations: [HomeComponent, IntroComponent, ContactInfoComponent, FeaturedProjectsComponent]
})
export class HomeModule { }
