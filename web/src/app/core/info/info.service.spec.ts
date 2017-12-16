import { TestBed, inject, async } from '@angular/core/testing';

import { FirebaseApp } from 'angularfire2';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, QueryFn, Action } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import { BasicInfo } from './info.model';
import { InfoService } from './info.service';

const BASIC_INFO: BasicInfo = {
  name : 'Stephen Lin',
  summary : 'Java Backend Developer',
  image : 'https://www.google.com',
  profile : {}
};

describe('InfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        InfoService,
        {
          provide : AngularFirestore,
          useValue : new FirestoreStub(
            new FirestoreDocumentStub(BASIC_INFO))
        }
      ]
    });
  });

  it('should be created', inject([InfoService], (service: InfoService) => {
    expect(service).toBeTruthy();
  }));

  it('should return the correct basic info', async(inject([InfoService], (service: InfoService) => {
    expect(service).toBeTruthy();

    service.getBasicInfo().subscribe((info) => {
      expect(info).toBe(BASIC_INFO);
    });
  })));
});

// FIXME move to a helper file
class FirestoreStub {
  app: FirebaseApp;
  readonly firestore: firebase.firestore.Firestore;
  readonly persistenceEnabled$: Observable<boolean>;

  constructor(private value: AngularFirestoreDocument<any>) {}

  collection<T>(path: string, queryFn?: QueryFn): AngularFirestoreCollection<T> {
    // not used
    return notImplemented();
  }
  doc<T>(path: string): AngularFirestoreDocument<T> {
    if (path === InfoService.BASIC_INFO_PATH) {
      return this.value;
    } else {
      return null;
    }
  }
  createId(): string {
    // not used
    return notImplemented();
  }
}

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
  collection<T>(path: string, queryFn?: QueryFn): AngularFirestoreCollection<T> {
    // not used
    return notImplemented();
  }
  snapshotChanges(): Observable<Action<firebase.firestore.DocumentSnapshot>> {
    // not used
    return notImplemented();
  }
}

function notImplemented(): any {
  throw new Error('Not implemented');
}

