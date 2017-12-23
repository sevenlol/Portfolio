import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import { Project } from '../../shared/project/project.model';

const PROJECT_COLL = 'projects';

@Injectable()
export class FeaturedProjectService {

  constructor(private afs: AngularFirestore) { }

  public get(numPerRow: number): Observable<Project[][]> {
    if (!numPerRow || parseInt(numPerRow.toString()) !== numPerRow || numPerRow < 0) {
      throw new Error('numPerRow should be a postive integer');
    }
    return this.afs
      .collection<Project>(
        PROJECT_COLL,
        ref => ref.where('featured', '==', true).orderBy('endDate', 'desc'))
      .snapshotChanges().map(snapshots => {
        let rows = snapshots.reduce((rows, snapshot) => {
          if (rows.length === 0 || rows[rows.length - 1].length === numPerRow) {
            rows.push([]);
          }

          let project: Project = snapshot.payload.doc.data() as Project;
          project.id = snapshot.payload.doc.id;

          let col = rows[rows.length - 1];
          col.push(project);
          return rows;
        }, []);
        return rows;
      });
  }
}
