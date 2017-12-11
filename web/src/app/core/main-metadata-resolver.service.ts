import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/take';

import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { MainMetadata } from './metadata.model';
import { MetadataService } from './metadata.service';

@Injectable()
export class MainMetadataResolverService implements Resolve<MainMetadata> {

  constructor(private metaService: MetadataService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MainMetadata> {
    return this.metaService.getMainMetadata().filter(item => !!item).take(1);
  }
}
