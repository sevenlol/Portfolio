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
import { MainMetadataResolverService } from './main-metadata-resolver.service';

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
    MainMetadataResolverService
  ],
  declarations: [NavBarComponent]
})
export class CoreModule { }
