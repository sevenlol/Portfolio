import 'rxjs/add/observable/of';
import 'rxjs/add/operator/take';
import { TestBed, inject } from '@angular/core/testing';
import { FirebaseApp } from 'angularfire2';
import * as firebase from 'firebase/app';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  QueryFn,
  DocumentChangeAction
} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Project } from '../../shared/project/project.model';
import { FeaturedProjectService } from './featured-project.service';

const INVALID_NUM_PER_ROW_ERROR = new Error('numPerRow should be a postive integer');

const PROJECT: Project = {
  name : 'Test Project',
  description : 'Project description',
  keywords : {
    angular : Date.now(),
    firebase : Date.now(),
    firestore : Date.now(),
    material : Date.now()
  },
  url : 'https://www.google.com',
  startDate : new Date(2017, 11, 1),
  endDate : new Date(2017, 11, 3),
  featured : true,
  active : false,
  primaryLanguage : 'javascript',
  primaryType : 'web',
  languages : {
    javascript : Date.now()
  },
  types : {
    web : Date.now()
  }
};

class FirestoreCollectionStub extends AngularFirestoreCollection<Project> {
  constructor(private fakeProjects: Project[]) {
    super(null, null);
  }

  valueChanges(events?: firebase.firestore.DocumentChangeType[]): Observable<Project[]> {
    return Observable.of(this.fakeProjects);
  }

  // not used
  stateChanges(events?: firebase.firestore.DocumentChangeType[]): Observable<any> {
    return notImplemented();
  }
  auditTrail(events?: firebase.firestore.DocumentChangeType[]): Observable<any> {
    return notImplemented();
  }
  snapshotChanges(events?: firebase.firestore.DocumentChangeType[]): Observable<DocumentChangeAction[]> {
    return Observable.of(this.fakeProjects).map(projects => {
      return projects.map((project, index) => {
        // return a DocumentChangeAction
        return {
          type : null,
          payload : {
            type : null,
            doc : {
              exists : true,
              ref : null,
              id : index.toString(),
              metadata : null,
              data : () => project,
              get : () => {}
            },
            oldIndex : index,
            newIndex : index
          }
        };
      });
    });
  }
  add(data): Promise<any> {
    return notImplemented();
  }
  doc<T>(path): AngularFirestoreDocument<T> {
    return notImplemented();
  }
}

// TODO get a better implementation
class FirestoreStub {
  app: FirebaseApp;
  readonly firestore: firebase.firestore.Firestore;
  readonly persistenceEnabled$: Observable<boolean>;

  constructor(private fakeProjects: Project[]) {}

  collection<T>(path: string, queryFn?: QueryFn): AngularFirestoreCollection<any> {
    return new FirestoreCollectionStub(this.fakeProjects);
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

// no projects exist in the database
describe('FeaturedProjectService: empty project in database', () => {
  const PROJECTS: Project[] = [];
  beforeEach(initFirestoreStub(PROJECTS));

  it('should be created', inject([FeaturedProjectService], (service: FeaturedProjectService) => {
    expect(service).toBeTruthy();
  }));

  it('should emit one empty array', inject([FeaturedProjectService], (service: FeaturedProjectService) => {
    let result: Project[][] = null;
    service.get(3).subscribe((projects) => {
      result = projects;
    });

    expect(result).toBeTruthy();
    expect(result.length).toBe(0);

    result = null;
    // different numPerRow value
    service.get(1).subscribe((projects) => {
      result = projects;
    });
    expect(result).toBeTruthy();
    expect(result.length).toBe(0);
  }));

  it('should throw error with invalid numPerRow value', inject([FeaturedProjectService], (service: FeaturedProjectService) => {
    // non-positive
    expect(() => service.get(0)).toThrow(INVALID_NUM_PER_ROW_ERROR);
    expect(() => service.get(-1)).toThrow(INVALID_NUM_PER_ROW_ERROR);
    expect(() => service.get(-100)).toThrow(INVALID_NUM_PER_ROW_ERROR);
    // not integer
    expect(() => service.get(1.2)).toThrow(INVALID_NUM_PER_ROW_ERROR);
    expect(() => service.get(345.123)).toThrow(INVALID_NUM_PER_ROW_ERROR);

    expect(() => service.get(null)).toThrow(INVALID_NUM_PER_ROW_ERROR);
    expect(() => service.get(undefined)).toThrow(INVALID_NUM_PER_ROW_ERROR);
  }));
});

// test with different # of projects returned from stub
describe('FeaturedProjectService: different # of projects in database', () => {
  let PROJECTS: Project[] = [];
  describe(getTestTitle(5), () => {
    setProjects(5);
    beforeEach(initFirestoreStub(PROJECTS));

    it('numPerRow = 1', inject([FeaturedProjectService], (service: FeaturedProjectService) => {
      let result: Project[][] = null;
      service.get(1).subscribe((projects) => {
        result = projects;
      });

      expect(result).toBeTruthy();
      expect(result.length).toBe(5);
      result.forEach((row) => {
        expect(row.length).toBe(1);
      });
    }));

    it('numPerRow = 3', inject([FeaturedProjectService], (service: FeaturedProjectService) => {
      let result: Project[][] = null;
      service.get(3).subscribe((projects) => {
        result = projects;
      });

      expect(result).toBeTruthy();
      expect(result.length).toBe(2);
      expect(result[0].length).toBe(3);
      expect(result[1].length).toBe(2);
    }));

    it('numPerRow = 5', inject([FeaturedProjectService], (service: FeaturedProjectService) => {
      let result: Project[][] = null;
      service.get(5).subscribe((projects) => {
        result = projects;
      });

      expect(result).toBeTruthy();
      expect(result.length).toBe(1);
      expect(result[0].length).toBe(5);
    }));

    it('numPerRow = 10', inject([FeaturedProjectService], (service: FeaturedProjectService) => {
      let result: Project[][] = null;
      service.get(10).subscribe((projects) => {
        result = projects;
      });

      expect(result).toBeTruthy();
      expect(result.length).toBe(1);
      expect(result[0].length).toBe(5);
    }));
  });

  describe(getTestTitle(10), () => {
    setProjects(10);
    beforeEach(initFirestoreStub(PROJECTS));

    it('numPerRow = 3', inject([FeaturedProjectService], (service: FeaturedProjectService) => {
      let result: Project[][] = null;
      service.get(3).subscribe((projects) => {
        result = projects;
      });

      expect(result).toBeTruthy();
      expect(result.length).toBe(4);
      expect(result[0].length).toBe(3);
      expect(result[1].length).toBe(3);
      expect(result[2].length).toBe(3);
      expect(result[3].length).toBe(1);
    }));

    it('numPerRow = 6', inject([FeaturedProjectService], (service: FeaturedProjectService) => {
      let result: Project[][] = null;
      service.get(6).subscribe((projects) => {
        result = projects;
      });

      expect(result).toBeTruthy();
      expect(result.length).toBe(2);
      expect(result[0].length).toBe(6);
      expect(result[1].length).toBe(4);
    }));
  });

  function setProjects(count: number) {
    PROJECTS = [];
    for (let i = 0; i < count; i++) {
      PROJECTS.push(PROJECT);
    }
  }

  function getTestTitle(count: number): string {
    return `should partition the project array correctly => (count) = (${count})`;
  }
});

// TODO test with non-null projects

// init firestore stub with the given projects
function initFirestoreStub(projects: Project[]) {
  return function() {
    TestBed.configureTestingModule({
      providers: [
        FeaturedProjectService,
        { provide : AngularFirestore, useValue : getFirestoreStub(projects) }
      ]
    });
  };
}

// return a firestore stub that returns an observable, when collection is called,
// which emits the given projects (sync)
function getFirestoreStub(projects: Project[]): AngularFirestore {
  return new FirestoreStub(projects);
}

function notImplemented(): any {
  throw new Error('Not implemented');
}
