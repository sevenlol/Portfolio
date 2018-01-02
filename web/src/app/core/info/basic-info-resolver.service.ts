import 'rxjs/add/operator/take';
import 'rxjs/add/operator/filter';

import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { BasicInfo } from './info.model';
import { InfoService } from './info.service';

/**
 * Angular Module: [[CoreModule]]
 *
 * Help router to retrieve basic information about me.
 */
@Injectable()
export class BasicInfoResolverService implements Resolve<BasicInfo> {

  constructor(private service: InfoService) { }

  /**
   * Generate an observable that completed once my basic information is
   * retrieved.
   * @param route route being navigated, not used here
   * @param state router state, not used here
   * @returns observable of basic information (complete when received data)
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<BasicInfo> {
    return this.service.getBasicInfo().filter(val => !!val).take(1);
  }
}
