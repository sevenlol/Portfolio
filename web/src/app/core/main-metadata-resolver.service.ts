import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/take';

import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { MainMetadata } from './metadata.model';
import { MetadataService } from './metadata.service';

/**
 * Angular Module: [[CoreModule]]
 *
 * Help router to retrieve main metadata (language and project category).
 */
@Injectable()
export class MainMetadataResolverService implements Resolve<MainMetadata> {

  constructor(private metaService: MetadataService) { }

  /**
   * Generate an observable that completed once main metadata
   *  is retrieved.
   * @param route route being navigated, not used here
   * @param state router state, not used here
   * @returns observable of main metadata (complete when received data)
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MainMetadata> {
    return this.metaService.getMainMetadata().filter(item => !!item).take(1);
  }
}
