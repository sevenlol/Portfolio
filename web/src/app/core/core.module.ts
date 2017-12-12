import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from '../../environments/environment';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MetadataService } from './metadata.service';
import { InfoService } from './info/info.service';
import { MainMetadataResolverService } from './main-metadata-resolver.service';
import { KeywordMetadataResolverService } from './keyword-metadata-resolver.service';
import { BasicInfoResolverService } from './info/basic-info-resolver.service';

@NgModule({
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    MatToolbarModule,
    MatButtonModule,
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
  declarations: [NavBarComponent]
})
export class CoreModule { }
