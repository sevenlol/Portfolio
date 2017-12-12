import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import { Project } from '../../shared/project/project.model';

const PROJECT_COLL = 'projects';

@Injectable()
export class FeaturedProjectService {

  constructor(private afs: AngularFirestore) { }

  public get(numPerRow: number): Observable<Project[][]> {
    return this.afs
      .collection<Project>(
        PROJECT_COLL,
        ref => ref.where('featured', '==', true).orderBy('endDate', 'desc'))
      .valueChanges().map(projects => {
        let rows = projects.reduce((rows, project) => {
          if (rows.length === 0 || rows[rows.length - 1].length === numPerRow) {
            rows.push([]);
          }
          let col = rows[rows.length - 1];
          col.push(project);
          return rows;
        }, []);
        return rows;
      });
  }
}
