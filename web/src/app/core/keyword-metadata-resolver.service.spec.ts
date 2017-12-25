import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import { TestBed, inject, async } from '@angular/core/testing';

import { Observable } from 'rxjs/Observable';

import { MetadataService } from './metadata.service';
import { MainMetadata, KeywordMetadata } from './metadata.model';
import { KeywordMetadataResolverService } from './keyword-metadata-resolver.service';

const KEYWORD_METADATA: KeywordMetadata = {
  keywords : {
    angular : {
      displayName : 'Angular'
    },
    firebase : {
      displayName : 'Firebase'
    },
    firestore : {
      displayName : 'Firestore'
    },
    material : {
      displayName : 'Material'
    }
  }
};

class MetadataServiceStub {
  constructor(
    private keyword: KeywordMetadata,
    private delay: number) {
  }

  getMainMetadata(): Observable<MainMetadata> {
    return ;
  }

  getKeywordMetadata(): Observable<KeywordMetadata> {
    return Observable.of(this.keyword);
  }
}

describe('KeywordMetadataResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        KeywordMetadataResolverService,
        {
          provide : MetadataService,
          useValue : new MetadataServiceStub(KEYWORD_METADATA, 1000)
        }
      ]
    });
  });

  it('should be created', inject([KeywordMetadataResolverService], (service: KeywordMetadataResolverService) => {
    expect(service).toBeTruthy();
  }));

  it('should resolve after metadata emit', async(inject([KeywordMetadataResolverService], (service: KeywordMetadataResolverService) => {
    expect(service).toBeTruthy();

    service.resolve(null, null).subscribe((metadata) => {
      expect(metadata).toBe(KEYWORD_METADATA);
    });
  })));
});
