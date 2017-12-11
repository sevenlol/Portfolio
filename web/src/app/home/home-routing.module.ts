import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { MainMetadataResolverService } from '../core/main-metadata-resolver.service';

const routes: Routes = [
  {
    path : 'home',
    component : HomeComponent,
    resolve : {
      mainMetadata : MainMetadataResolverService
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
