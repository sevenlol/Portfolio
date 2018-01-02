import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from '../../environments/environment';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MetadataService } from './metadata.service';
import { InfoService } from './info/info.service';
import { MainMetadataResolverService } from './main-metadata-resolver.service';
import { KeywordMetadataResolverService } from './keyword-metadata-resolver.service';
import { BasicInfoResolverService } from './info/basic-info-resolver.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

/**
 * Core angular module, containing components that are only used
 * once and services required by the whole application.
 *
 * Including [[MetadataService]], [[InfoService]], [[MainMetadataResolverService]],
 *  [[KeywordMetadataResolverService]], [[BasicInfoResolverService]], [[NavBarComponent]],
 *  [[PageNotFoundComponent]]
 */
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule
  ],
  exports : [
    NavBarComponent
  ],
  providers : [
    MetadataService,
    InfoService,
    MainMetadataResolverService,
    KeywordMetadataResolverService,
    BasicInfoResolverService
  ],
  declarations: [NavBarComponent, PageNotFoundComponent]
})
export class CoreModule { }
