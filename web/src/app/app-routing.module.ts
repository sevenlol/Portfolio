import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path : '',
    redirectTo : '/home',
    pathMatch : 'full'
  },
  {
    path : 'projects',
    loadChildren : 'app/project/project.module#ProjectModule'
  },
  {
    path : 'about',
    loadChildren : 'app/about/about.module#AboutModule'
  },
  // FIXME restore this once app shell bug is fixed
  // https://github.com/angular/angular-cli/issues/8929
  /*{
    path : '**',
    component : PageNotFoundComponent
  }*/
];

/**
 * Angular Module: [[AppModule]]
 *
 * Contains root level routing information
 */
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports : [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
