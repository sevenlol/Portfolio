import { TestBed, inject } from '@angular/core/testing';

import { MetadataResolverService } from './metadata-resolver.service';

describe('MetadataResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MetadataResolverService]
    });
  });

  it('should be created', inject([MetadataResolverService], (service: MetadataResolverService) => {
    expect(service).toBeTruthy();
  }));
});
