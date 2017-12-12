import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/take';

import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { KeywordMetadata } from './metadata.model';
import { MetadataService } from './metadata.service';

@Injectable()
export class KeywordMetadataResolverService implements Resolve<KeywordMetadata> {

  constructor(private metaService: MetadataService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<KeywordMetadata> {
    return this.metaService.getKeywordMetadata().filter(item => !!item).take(1);
  }
}
