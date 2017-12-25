import 'rxjs/add/observable/of';

import { TestBed, inject, async } from '@angular/core/testing';
import { FirebaseApp } from 'angularfire2';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, QueryFn, Action } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import { MainMetadata, KeywordMetadata } from './metadata.model';
import { MetadataService } from './metadata.service';

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

class FirestoreDocumentStub<T> {
  ref: firebase.firestore.DocumentReference;

  constructor(private value: T) {}

  valueChanges(): Observable<T> {
    return Observable.of(this.value);
  }

  set(data: T, options?: firebase.firestore.SetOptions): Promise<void> {
    // not used
    return notImplemented();
  }
  update(data: Partial<T>): Promise<void> {
    // not used
    return notImplemented();
  }
  delete(): Promise<void> {
    // not used
    return notImplemented();
  }
  collection<V>(path: string, queryFn?: QueryFn): AngularFirestoreCollection<V> {
    // not used
    return notImplemented();
  }
  snapshotChanges(): Observable<Action<firebase.firestore.DocumentSnapshot>> {
    // not used
    return notImplemented();
  }
}

class FirestoreStub {
  app: FirebaseApp;
  readonly firestore: firebase.firestore.Firestore;
  readonly persistenceEnabled$: Observable<boolean>;

  constructor(
    private main: AngularFirestoreDocument<any>,
    private keyword: AngularFirestoreDocument<any>
  ) {}

  collection<T>(path: string, queryFn?: QueryFn): AngularFirestoreCollection<T> {
    // not used
    return notImplemented();
  }
  doc<T>(path: string): AngularFirestoreDocument<T> {
    if (path === MetadataService.MAIN_METADATA_PATH) {
      return this.main;
    } else if (path === MetadataService.KEYWORD_METADATA_PATH) {
      return this.keyword;
    } else {
      return null;
    }
  }
  createId(): string {
    // not used
    return notImplemented();
  }
}

describe('MetadataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MetadataService,
        {
          provide : AngularFirestore,
          useValue : new FirestoreStub(
            new FirestoreDocumentStub<MainMetadata>(MAIN_METADATA),
            new FirestoreDocumentStub<KeywordMetadata>(KEYWORD_METADATA)
          )
        }
      ]
    });
  });

  it('should be created', inject([MetadataService], (service: MetadataService) => {
    expect(service).toBeTruthy();
  }));

  it('should return main metadata correctly', async(inject([MetadataService], (service: MetadataService) => {
    expect(service).toBeTruthy();

    service.getMainMetadata().subscribe((main) => {
      expect(main).toBe(MAIN_METADATA);
    });
  })));

  it('should return keyword metadata correctly', async(inject([MetadataService], (service: MetadataService) => {
    expect(service).toBeTruthy();

    service.getKeywordMetadata().subscribe((keyword) => {
      expect(keyword).toBe(KEYWORD_METADATA);
    });
  })));
});

function notImplemented(): any {
  throw new Error('Not implemented');
}
