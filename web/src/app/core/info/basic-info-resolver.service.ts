import 'rxjs/add/operator/take';
import 'rxjs/add/operator/filter';

import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { BasicInfo } from './info.model';
import { InfoService } from './info.service';

@Injectable()
export class BasicInfoResolverService implements Resolve<BasicInfo> {

  constructor(private service: InfoService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<BasicInfo> {
    return this.service.getBasicInfo().filter(val => !!val).take(1);
  }
}
