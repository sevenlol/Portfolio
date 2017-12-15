import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { MainMetadata, KeywordMetadata, Language, Type, Keyword } from './metadata.model';

const METADATA_COLL = 'metadata';

const METADATA_DOCS = {
  MAIN : 'main',
  KEYWORD : 'keyword'
};

@Injectable()
export class MetadataService {

  // TODO figure out if this is a good idea
  public static readonly MAIN_METADATA_PATH = `${METADATA_COLL}/${METADATA_DOCS.MAIN}`;
  public static readonly KEYWORD_METADATA_PATH = `${METADATA_COLL}/${METADATA_DOCS.KEYWORD}`;

  private main$: BehaviorSubject<MainMetadata>;
  private keyword$: BehaviorSubject<KeywordMetadata>;

  constructor(private afs: AngularFirestore) {
    this.main$ = new BehaviorSubject(null);
    this.keyword$ = new BehaviorSubject(null);
    afs.doc<MainMetadata>(MetadataService.MAIN_METADATA_PATH).valueChanges().subscribe((res) => this.main$.next(res));
    afs.doc<KeywordMetadata>(MetadataService.KEYWORD_METADATA_PATH).valueChanges().subscribe((res) => this.keyword$.next(res));
  }

  getMainMetadata(): Observable<MainMetadata> {
    return this.main$;
  }

  getKeywordMetadata(): Observable<KeywordMetadata> {
    return this.keyword$;
  }
}
