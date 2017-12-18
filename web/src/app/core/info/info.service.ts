import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import { BasicInfo, Info } from './info.model';

const INFO_COLL = 'info';
const BASIC_INFO_DOC = 'basic';

@Injectable()
export class InfoService {

  public static readonly BASIC_INFO_PATH = `${INFO_COLL}/${BASIC_INFO_DOC}`;

  private basicInfoDoc: AngularFirestoreDocument<BasicInfo>;
  private infoDoc: AngularFirestoreDocument<Info>;

  constructor(private afs: AngularFirestore) {
    this.basicInfoDoc = afs.doc(InfoService.BASIC_INFO_PATH);
    this.infoDoc = afs.doc(InfoService.BASIC_INFO_PATH);
  }

  // TODO add projection when the sdk supports it
  getBasicInfo(): Observable<BasicInfo> {
    return this.basicInfoDoc.valueChanges();
  }

  getInfo(): Observable<Info> {
    return this.infoDoc.valueChanges();
  }
}
