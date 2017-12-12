import { TestBed, inject } from '@angular/core/testing';

import { KeywordMetadataResolverService } from './keyword-metadata-resolver.service';

describe('KeywordMetadataResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KeywordMetadataResolverService]
    });
  });

  it('should be created', inject([KeywordMetadataResolverService], (service: KeywordMetadataResolverService) => {
    expect(service).toBeTruthy();
  }));
});
