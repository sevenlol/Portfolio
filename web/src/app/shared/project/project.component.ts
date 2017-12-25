import { Component, Input, OnInit } from '@angular/core';

import { Project } from './project.model';
import { Type, Language, Keyword, Resource } from '../../core/metadata.model';

const DISPLAY_KEYWORD_COUNT = 3;

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  // TODO find a way to make this consistent with css
  static readonly HEIGHT: number = 450;
  static readonly WIDTH: number = 350;
  static readonly COLS = {
    xs : 1,
    sm : 1,
    md : 2,
    lg : 3,
    xl : 4
  };

  @Input() displayKeywordCount: number = DISPLAY_KEYWORD_COUNT;

  @Input() project: Project;
  @Input() types: Type;
  @Input() languages: Language;
  @Input() keywords: Keyword;

  primaryType: Resource;
  primaryLanguage: Resource;
  displayKeywords: Resource[];

  constructor() { }

  ngOnInit() {
    this.primaryType = this.types[this.project.primaryType];
    this.primaryLanguage = this.languages[this.project.primaryLanguage];
    this.displayKeywords = this.getKeywords();
  }

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
