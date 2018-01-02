import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, QueryFn } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import { BasicInfo, Info, WorkExperience, Skill } from './info.model';

const INFO_COLL = 'info';
const WORK_COLL = 'work';
const SKILL_COLL = 'skills';
const BASIC_INFO_DOC = 'basic';

/**
 * Angular Module: [[CoreModule]]
 *
 * Data service for [[Info]], [[BasicInfo]], [[WorkExperience]]
 * and [[Skill]]
 */
@Injectable()
export class InfoService {

  /**
   * Path to basic info resource
   */
  public static readonly BASIC_INFO_PATH = `${INFO_COLL}/${BASIC_INFO_DOC}`;
  /**
   * Path to work resources
   */
  public static readonly WORK_PATH = `${INFO_COLL}/${BASIC_INFO_DOC}/${WORK_COLL}`;
  /**
   * Path to skill resources
   */
  public static readonly SKILL_PATH = `${INFO_COLL}/${BASIC_INFO_DOC}/${SKILL_COLL}`;

  /**
   * Basic info document
   */
  private basicInfoDoc: AngularFirestoreDocument<BasicInfo>;
  /**
   * Info document
   */
  private infoDoc: AngularFirestoreDocument<Info>;

  /**
   * Create info data service
   * @param afs firestore client object
   */
  constructor(private afs: AngularFirestore) {
    this.basicInfoDoc = afs.doc(InfoService.BASIC_INFO_PATH);
    this.infoDoc = afs.doc(InfoService.BASIC_INFO_PATH);
  }

  // TODO add projection when the sdk supports it
  /**
   * Retrieve basic information about me
   * @returns an observable of basic information
   */
  getBasicInfo(): Observable<BasicInfo> {
    return this.basicInfoDoc.valueChanges();
  }

  /**
   * Retrieve full information about me
   * @returns an observable of full information
   */
  getInfo(): Observable<Info> {
    return this.infoDoc.valueChanges();
  }

  // TODO add unit tests
  /**
   * Retrieve my work experience information (sorted by endDate, startDate with descending order)
   * @param limit the number of work item retrieved
   * @param lastEndDate endDate of the last item in the last batch.
   * if not set, retrieved items will start with the latest item.
   * @param lastStartDate startDate of the last item in the last batch.
   * if not set, retrieved items will start with the latest item.
   */
  getWork(limit: number, lastEndDate?: Date, lastStartDate?: Date): Observable<WorkExperience[]> {
    if (!limit) {
      throw new Error('Limit must be greater than 0');
    }
    if (lastEndDate && lastStartDate && lastEndDate.getTime() < lastStartDate.getTime()) {
      throw new Error('Last start date must be earlier than last end date');
    }
    return this.afs.collection<WorkExperience>(
      InfoService.WORK_PATH,
      ref => {
        // query by descending order on endDate first, then startDate
        let query = ref.orderBy('endDate', 'desc').orderBy('startDate', 'desc');
        if (lastEndDate) {
          // add cursor
          if (!lastStartDate) {
            query = query.startAfter(lastEndDate);
          } else {
            query = query.startAfter(lastEndDate, lastStartDate);
          }
        }
        // limit the number of results
        return query.limit(limit);
      }).snapshotChanges().map(refs => {
        return refs.map(ref => {
          const work = ref.payload.doc.data() as WorkExperience;
          work.id = ref.payload.doc.id;
          return work;
        });
      });
  }

  // TODO add unit tests
  /**
   * Retrieve information about my software development skills, sorted by
   * [[Skill.priority]], [[Skill.updatedAt]] in descending order.
   * @param limit the number of skill categories retrieved
   * @param lastSkill last skill item in the previous batch. if not set, the service
   * will start at the first item.
   */
  querySkills(limit?: number, lastSkill?: Skill): Observable<Skill[]> {
    this.checkLimit(limit);
    return this.afs.collection<Skill>(
      InfoService.SKILL_PATH,
      ref => {
        let baseQuery = ref.orderBy('priority', 'desc').orderBy('updatedAt', 'desc');
        if (lastSkill) {
          baseQuery = baseQuery.startAfter(lastSkill.priority, lastSkill.updatedAt);
        }
        // decide whether to add limit condition
        return limit ? baseQuery.limit(limit) : baseQuery;
      }
    ).snapshotChanges().map(refs => refs.map(ref => {
      const skill = ref.payload.doc.data() as Skill;
      skill.id = ref.payload.doc.id;
      return skill;
    }));
  }

  /**
   * Verify the limit parameter
   * @param limit query limit value, should be a positive integer
   * @throws Error if the limit is not a positive integer
   */
  private checkLimit(limit: number) {
    if (limit === undefined) {
      return;
    }
    if (limit <= 0) {
      throw new Error('Limit should be greater than 0');
    }
    if (parseInt(limit.toString(), 10) !== limit) {
      throw new Error('Limit should be an integer');
    }
  }
}
