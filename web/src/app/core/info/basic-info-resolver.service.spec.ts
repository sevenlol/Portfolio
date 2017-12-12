import { TestBed, inject } from '@angular/core/testing';

import { BasicInfoResolverService } from './basic-info-resolver.service';

describe('BasicInfoResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BasicInfoResolverService]
    });
  });

  it('should be created', inject([BasicInfoResolverService], (service: BasicInfoResolverService) => {
    expect(service).toBeTruthy();
  }));
});
