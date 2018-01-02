import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { MainMetadataResolverService } from '../core/main-metadata-resolver.service';
import { KeywordMetadataResolverService } from '../core/keyword-metadata-resolver.service';
import { BasicInfoResolverService } from '../core/info/basic-info-resolver.service';

const routes: Routes = [
  {
    path : 'home',
    component : HomeComponent,
    resolve : {
      mainMetadata : MainMetadataResolverService,
      keywordMetadata: KeywordMetadataResolverService,
      basicInfo: BasicInfoResolverService
    }
  }
];

/**
 * Angular Module: [[HomeModule]]
 *
 * Contains routing information for [[HomeModule]]
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
