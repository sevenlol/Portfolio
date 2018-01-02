import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/take';

import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { KeywordMetadata } from './metadata.model';
import { MetadataService } from './metadata.service';

/**
 * Angular Module: [[CoreModule]]
 *
 * Help router to retrieve keyword metadata.
 */
@Injectable()
export class KeywordMetadataResolverService implements Resolve<KeywordMetadata> {

  constructor(private metaService: MetadataService) { }

  /**
   * Generate an observable that completed once keyword metadata
   *  is retrieved.
   * @param route route being navigated, not used here
   * @param state router state, not used here
   * @returns observable of keyword metadata (complete when received data)
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<KeywordMetadata> {
    return this.metaService.getKeywordMetadata().filter(item => !!item).take(1);
  }
}
