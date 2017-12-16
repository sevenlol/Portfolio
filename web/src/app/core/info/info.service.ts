import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import { BasicInfo } from './info.model';

const INFO_COLL = 'info';
const BASIC_INFO_DOC = 'basic';

@Injectable()
export class InfoService {

  public static readonly BASIC_INFO_PATH = `${INFO_COLL}/${BASIC_INFO_DOC}`;

  private basicInfoDoc: AngularFirestoreDocument<BasicInfo>;

  constructor(private afs: AngularFirestore) {
    this.basicInfoDoc = afs.doc(InfoService.BASIC_INFO_PATH);
  }

  // TODO add projection when the sdk supports it
  getBasicInfo(): Observable<BasicInfo> {
    return this.basicInfoDoc.valueChanges();
  }
}
