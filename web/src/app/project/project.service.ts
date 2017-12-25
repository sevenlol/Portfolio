import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, QueryFn } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';

import { Project } from '../shared/project/project.model';

export enum QueryType {
  LANGUAGE, TYPE, KEYWORD
}

export interface Query {
  type: QueryType;
  active?: boolean;
  value: string;
}

const PROJECT_COLL = 'projects';

@Injectable()
export class ProjectService {

  public static readonly PROJECTS_PATH = `${PROJECT_COLL}`;

  constructor(private afs: AngularFirestore) { }

  get(id: string): Observable<Project> {
    this.checkId(id);

    return this.afs.doc<Project>(`${ProjectService.PROJECTS_PATH}/${id}`)
      .snapshotChanges().map(ref => {
        const project = ref.payload.data() as Project;
        const projId = ref.payload.id;
        project.id = projId;
        return project;
      });
  }

  queryProjects(limit: number, query: Query, lastProject?: Project): Observable<Project[]> {
    this.checkQueryParams(limit, query);
    return this.afs.collection<Project>(ProjectService.PROJECTS_PATH,
      (ref) => this.getQuery(limit, query, ref, lastProject))
      .snapshotChanges()
      .map(snapshots => snapshots.map(ref => {
        const project = ref.payload.doc.data() as Project;
        const projId = ref.payload.doc.id;
        project.id = projId;
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
    if (parseInt(limit.toString(), 10) !== limit) {
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
    let res = null;

    if (!query) {
      // no input query
      res = queryObj.orderBy('endDate', 'desc');
      if (lastProject) {
        res = res.startAfter(lastProject.endDate);
      }
      return res.limit(limit);
    }

    const key = `${this.getPropertyName(query)}.${query.value}`;
    res = queryObj.where(key, '>', 0);
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
