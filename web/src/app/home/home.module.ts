import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { IntroComponent } from './intro/intro.component';
import { ContactInfoComponent } from './contact-info/contact-info.component';
import { FeaturedProjectsComponent } from './featured-projects/featured-projects.component';
import { FeaturedProjectService } from './featured-projects/featured-project.service';

/**
 * Angular Module in charge of all the information about me.
 *
 * Components:
 * [[HomeComponent]]
 * [[IntroComponent]]
 * [[ContactInfoComponent]]
 * [[FeaturedProjectsComponent]]
 *
 * Services:
 * [[FeaturedProjectService]]
 */
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    HomeRoutingModule,
  ],
  exports : [
    HomeComponent,
    HomeRoutingModule
  ],
  providers : [
    FeaturedProjectService
  ],
  declarations: [HomeComponent, IntroComponent, ContactInfoComponent, FeaturedProjectsComponent]
})
export class HomeModule { }
