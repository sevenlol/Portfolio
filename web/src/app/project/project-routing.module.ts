import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { MainMetadataResolverService } from '../core/main-metadata-resolver.service';
import { KeywordMetadataResolverService } from '../core/keyword-metadata-resolver.service';

const routes: Routes = [
  {
    path : '',
    resolve : {
      mainMetadata : MainMetadataResolverService,
      keywordMetadata: KeywordMetadataResolverService
    },
    children : [
      {
        path : '',
        component : ProjectListComponent
      },
      {
        path : ':id',
        component : ProjectDetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
