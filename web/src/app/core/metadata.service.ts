import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { MainMetadata, Language, Type, Keyword } from './metadata.model';

const METADATA_COLL = 'metadata';

const METADATA_DOCS = {
  MAIN : 'main',
  KEYWORD : 'keyword'
};

@Injectable()
export class MetadataService {

  private main$: BehaviorSubject<MainMetadata>;

  constructor(private afs: AngularFirestore) {
    this.main$ = new BehaviorSubject(null);
    afs.doc<MainMetadata>(`${METADATA_COLL}/${METADATA_DOCS.MAIN}`).valueChanges().subscribe((res) => this.main$.next(res));
  }

  getMainMetadata(): Observable<MainMetadata> {
    return this.main$;
  }
}
