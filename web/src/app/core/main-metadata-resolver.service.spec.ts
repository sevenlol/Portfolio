import { TestBed, inject } from '@angular/core/testing';

import { MainMetadataResolverService } from './main-metadata-resolver.service';

describe('MetadataResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MainMetadataResolverService]
    });
  });

  it('should be created', inject([MainMetadataResolverService], (service: MainMetadataResolverService) => {
    expect(service).toBeTruthy();
  }));
});
