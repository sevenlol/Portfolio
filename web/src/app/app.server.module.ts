import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { Routes, RouterModule, Router } from '@angular/router';
import { AppShellComponent } from './app-shell/app-shell.component';
import { SharedModule } from './shared/shared.module';

const routes: Routes = [
  { path: 'shell/home', component: AppShellComponent }
];

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    RouterModule.forRoot(routes),
  ],
  bootstrap: [AppComponent],
  declarations: [AppShellComponent],
})
export class AppServerModule {
  // prevent not found page to show up in app shell
  // https://github.com/angular/angular-cli/issues/8929
  constructor(private router: Router) {
    this.router.resetConfig(routes);
  }
}
