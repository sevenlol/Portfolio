import { Component, Input, OnInit } from '@angular/core';

import { Project } from './project.model';
import { Type, Language, Keyword, Resource } from '../../core/metadata.model';

const DISPLAY_KEYWORD_COUNT = 3;

/**
 * Angular Module: [[SharedModule]]
 *
 * Component to display my work experience
 */
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  // TODO find a way to make this consistent with css
  /**
   * project tile height
   */
  static readonly HEIGHT: number = 450;
  /**
   * project tile width
   */
  static readonly WIDTH: number = 350;
  /**
   * map of number of columns in different responsive
   * layout.
   */
  static readonly COLS = {
    xs : 1,
    sm : 1,
    md : 2,
    lg : 3,
    xl : 4
  };

  /**
   * @input maximum number of keywords can be displayed in the tile
   */
  @Input() displayKeywordCount: number = DISPLAY_KEYWORD_COUNT;
  /**
   * @input target project object
   */
  @Input() project: Project;
  /**
   * @input category resource map
   */
  @Input() types: Type;
  /**
   * @input language resource map
   */
  @Input() languages: Language;
  /**
   * @input keyword resource map
   */
  @Input() keywords: Keyword;

  /**
   * primary category resource object
   */
  primaryType: Resource;
  /**
   * primary language resource object
   */
  primaryLanguage: Resource;
  /**
   * a list of keyword resource objects (that will be displayed)
   */
  displayKeywords: Resource[];

  constructor() { }

  /**
   * @hidden
   */
  ngOnInit() {
    this.primaryType = this.types[this.project.primaryType];
    this.primaryLanguage = this.languages[this.project.primaryLanguage];
    this.displayKeywords = this.getKeywords();
  }

  /**
   * Generate keywords that will be displayed in the project tile.
   * Invalid keywords (not in keyword resource map) or the ones exceed
   * the display keyword count limit will be skipped.
   * @returns a list of keywords
   */
  private getKeywords(): Resource[] {
    if (!this.project.keywords) {
      return [];
    }
    const keywordList: Resource[] = [];

    for (const key in this.project.keywords) {
      if (!this.project.keywords.hasOwnProperty(key)) {
        continue;
      }
      if (keywordList.length === this.displayKeywordCount) {
        break;
      }
      if (!this.keywords[key]) {
        continue;
      }
      keywordList.push(this.keywords[key]);
    }
    return keywordList;
  }

}
