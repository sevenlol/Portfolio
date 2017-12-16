import 'rxjs/add/observable/of';
import { TestBed, inject, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { BasicInfo } from './info.model';
import { InfoService } from './info.service';
import { BasicInfoResolverService } from './basic-info-resolver.service';

const BASIC_INFO: BasicInfo = {
  name : 'Stephen Lin',
  summary : 'Java Backend Developer',
  image : 'https://www.google.com',
  profile : {}
};

describe('BasicInfoResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide : InfoService,
          useValue : new InfoServiceStub(BASIC_INFO);
        },
        BasicInfoResolverService
      ]
    });
  });

  it('should be created', inject([BasicInfoResolverService], (service: BasicInfoResolverService) => {
    expect(service).toBeTruthy();
  }));

  it('should return the correct basic info', async(inject([BasicInfoResolverService], (service: BasicInfoResolverService) => {
    expect(service).toBeTruthy();

    service.resolve(null, null).subscribe((info) => {
      expect(info).toBe(BASIC_INFO);
    });
  })));
});

class InfoServiceStub {
  constructor(private info: BasicInfo) {}

  getBasicInfo(): Observable<BasicInfo> {
    return Observable.of(this.info);
  }
}
