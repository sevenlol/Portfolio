import { TestBed, inject, async } from '@angular/core/testing';

import { FirebaseApp } from 'angularfire2';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, QueryFn, Action, DocumentChangeAction } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import { ProjectService, QueryType } from './project.service';
import { Project } from '../shared/project/project.model';

class FirestoreStub {
  app: FirebaseApp;
  readonly firestore: firebase.firestore.Firestore;
  readonly persistenceEnabled$: Observable<boolean>;

  query: QueryFn;

  constructor(private value: AngularFirestoreCollection<any>) {}

  collection<T>(path: string, queryFn?: QueryFn): AngularFirestoreCollection<T> {
    // save the query
    this.query = queryFn;
    return this.value;
  }
  doc<T>(path: string): AngularFirestoreDocument<T> {
    // not used
    return notImplemented();
  }
  createId(): string {
    // not used
    return notImplemented();
  }
}

class FirestoreCollectionStub<T> extends AngularFirestoreCollection<T> {
  constructor(private values: T[]) {
    super(null, null);
  }

  valueChanges(events?: firebase.firestore.DocumentChangeType[]): Observable<T[]> {
    return Observable.of(this.values);
  }

  // not used
  stateChanges(events?: firebase.firestore.DocumentChangeType[]): Observable<any>{
    return notImplemented();
  }
  auditTrail(events?: firebase.firestore.DocumentChangeType[]): Observable<any> {
    return notImplemented();
  }
  snapshotChanges(events?: firebase.firestore.DocumentChangeType[]): Observable<DocumentChangeAction[]> {
    return Observable.of(this.values).map(values => {
      return values.map(val => {
        return {
          type : null,
          payload : {
            type : null,
            doc : {
              exists : true,
              ref : null,
              id : '123',
              metadata : null,
              data : () => {
                return val;
              },
              get : () => {}
            },
            oldIndex : 1,
            newIndex : 2
          }
        };
      });
    });
  }
  add(data): Promise<any> {
    return notImplemented();
  }
  doc<Project>(path): AngularFirestoreDocument<Project> {
    return notImplemented();
  }
}

describe('ProjectService', () => {
  let projects: Project[] = [];

  let collStub = new FirestoreCollectionStub<Project>(projects)
  let firestoreStub = new FirestoreStub(collStub);
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProjectService,
        {
          provide : AngularFirestore,
          useValue : firestoreStub
        }
      ]
    });
  });

  it('should be created', inject([ProjectService], (service: ProjectService) => {
    expect(service).toBeTruthy();
  }));

  it('should reject invalid limit parameter', inject([ProjectService], (service: ProjectService) => {
    expect(service).toBeTruthy();

    // negative numbers
    expect(() => service.queryProjects(-1, null)).toThrow();
    expect(() => service.queryProjects(-123, null)).toThrow();
    expect(() => service.queryProjects(-135, null)).toThrow();

    // zero and falsy values
    expect(() => service.queryProjects(0, null)).toThrow();
    expect(() => service.queryProjects(null, null)).toThrow();
    expect(() => service.queryProjects(undefined, null)).toThrow();

    // floating numbers
    expect(() => service.queryProjects(-0.123, null)).toThrow();
    expect(() => service.queryProjects(1.2334, null)).toThrow();
    expect(() => service.queryProjects(12345.011, null)).toThrow();
  }));

  it('should reject invalid query', inject([ProjectService], (service: ProjectService) => {
    expect(service).toBeTruthy();

    // invalid type
    expect(() => service.queryProjects(1, { type : 5, value : 'test' })).toThrow();
    expect(() => service.queryProjects(1, { type : 4, value : 'test' })).toThrow();
    expect(() => service.queryProjects(1, { type : 100, value : 'test' })).toThrow();

    // invalid value
    expect(() => service.queryProjects(1, { type : QueryType.KEYWORD, value : '' })).toThrow();
    expect(() => service.queryProjects(1, { type : QueryType.KEYWORD, value : null })).toThrow();
    expect(() => service.queryProjects(1, { type : QueryType.KEYWORD, value : undefined })).toThrow();
  }));

  it('should return the predefined projects', async(inject([ProjectService], (service: ProjectService) => {
    expect(service).toBeTruthy();

    service.queryProjects(3, null).subscribe(res => {
      expect(res).toEqual(projects);
    });
  })));

  // TODO add unit tests to make sure firestore collection receives the correct query
});

function notImplemented(): any {
  throw new Error('Not implemented');
}
