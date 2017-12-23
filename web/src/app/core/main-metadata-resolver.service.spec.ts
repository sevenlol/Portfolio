import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';

import { TestBed, inject, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { MetadataService } from './metadata.service';
import { MainMetadata, KeywordMetadata } from './metadata.model';
import { MainMetadataResolverService } from './main-metadata-resolver.service';

const MAIN_METADATA: MainMetadata = {
  languages : {
    javascript : {
      displayName : 'Javascript'
    }
  },
  types : {
    web : {
      displayName : 'Web'
    }
  }
};

describe('MetadataResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MainMetadataResolverService,
        {
          provide : MetadataService,
          useValue : new MetadataServiceStub(MAIN_METADATA, 1000)
        }
      ]
    });
  });

  it('should be created', inject([MainMetadataResolverService], (service: MainMetadataResolverService) => {
    expect(service).toBeTruthy();
  }));

  it('should resolve after metadata emit', async(inject([MainMetadataResolverService], (service: MainMetadataResolverService) => {
    expect(service).toBeTruthy();

    service.resolve(null, null).subscribe((metadata) => {
      expect(metadata).toBe(MAIN_METADATA);
    });
  })));
});

class MetadataServiceStub {
  constructor(
    private main: MainMetadata,
    private delay: number) {
  }

  getMainMetadata(): Observable<MainMetadata> {
    return Observable.of(this.main);
  }

  getKeywordMetadata(): Observable<KeywordMetadata> {
    return null;
  }
}
