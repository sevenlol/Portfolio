import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import { Project } from '../../shared/project/project.model';

const PROJECT_COLL = 'projects';

/**
 * Angular Module: [[HomeModule]]
 *
 * Data service for featured [[Project]]
 */
@Injectable()
export class FeaturedProjectService {

  /**
   * Create a featured project data service
   * @param afs firestore client object
   */
  constructor(private afs: AngularFirestore) { }

  /**
   * Retrieve all featured projects and transform them into
   * a two dimension array with specified number of projects
   * per row.
   * @param numPerRow number of projects per row, must be a positive integer
   * @throws Error if numPerRow is not valid
   */
  public get(numPerRow: number): Observable<Project[][]> {
    if (!numPerRow || parseInt(numPerRow.toString(), 10) !== numPerRow || numPerRow < 0) {
      throw new Error('numPerRow should be a postive integer');
    }
    return this.afs
      .collection<Project>(
        PROJECT_COLL,
        ref => ref.where('featured', '==', true).orderBy('endDate', 'desc'))
      .snapshotChanges().map(snapshots => {
        const res = snapshots.reduce((rows, snapshot) => {
          if (rows.length === 0 || rows[rows.length - 1].length === numPerRow) {
            rows.push([]);
          }

          const project: Project = snapshot.payload.doc.data() as Project;
          project.id = snapshot.payload.doc.id;

          const col = rows[rows.length - 1];
          col.push(project);
          return rows;
        }, []);
        return res;
      });
  }
}
