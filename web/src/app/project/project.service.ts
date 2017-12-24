import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, QueryFn } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';

import { Project } from '../shared/project/project.model';

const PROJECT_COLL = 'projects';

@Injectable()
export class ProjectService {

  public static readonly PROJECTS_PATH = `${PROJECT_COLL}`;

  constructor(private afs: AngularFirestore) { }

  get(id: string): Observable<Project> {
    this.checkId(id);

    return this.afs.doc<Project>(`${ProjectService.PROJECTS_PATH}/${id}`)
      .snapshotChanges().map(ref => {
        let project = ref.payload.data() as Project;
        let id = ref.payload.id;
        project.id = id;
        return project;
      });
  }

  queryProjects(limit: number, query: Query, lastProject?: Project): Observable<Project[]> {
    this.checkQueryParams(limit, query);
    return this.afs.collection<Project>(ProjectService.PROJECTS_PATH,
      (ref) => this.getQuery(limit, query, ref, lastProject))
      .snapshotChanges()
      .map(snapshots => snapshots.map(ref => {
        let project = ref.payload.doc.data() as Project;
        let id = ref.payload.doc.id;
        project.id = id;
        return project;
      }));
  }

  private checkId(id: string) {
    if (!id) {
      throw new Error('Invalid project ID');
    }
  }

  private checkQueryParams(limit: number, query: Query) {
    if (!limit || limit < 0) {
      throw new Error('Limit should be greater than 0');
    }
    if (parseInt(limit.toString()) !== limit) {
      throw new Error('Limit should be an integer');
    }
    if (query) {
      // must exists
      if (!(query.type in QueryType)) {
        throw new Error('Invalid query type');
      }
      // cannot be null or empty string
      if (!query.value) {
        throw new Error('Empty query value');
      }
    }
  }

  private getQuery(limit: number, query: Query, queryObj: firebase.firestore.Query, lastProject?: Project): firebase.firestore.Query {
    if (!query) {
      let res = queryObj.orderBy('endDate', 'desc');
      if (lastProject) {
        res = res.startAfter(lastProject.endDate);
      }
      return res.limit(limit);
    }
    let key = `${this.getPropertyName(query)}.${query.value}`;
    let res =  queryObj.where(key, '>', 0);
    if (query.type !== QueryType.KEYWORD && typeof query.active === 'boolean') {
      // query by type/language, support active
      res = res.where('active', '==', query.active);
    }

    res = res.orderBy(key, 'desc');
    if (lastProject) {
      // set cursor
      res = res.startAfter(lastProject[this.getPropertyName(query)][query.value]);
    }
    return res.limit(limit);
  }

  private getPropertyName(query: Query): string {
    switch (query.type) {
      case QueryType.LANGUAGE:
        return 'languages';
      case QueryType.TYPE:
        return 'types';
      case QueryType.KEYWORD:
        return 'keywords';
      default:
        throw new Error('Invalid query type');
    }
  }
}

export interface Query {
  type: QueryType;
  active?: boolean;
  value: string;
}

export enum QueryType {
  LANGUAGE, TYPE, KEYWORD
}
