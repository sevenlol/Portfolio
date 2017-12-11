import { Component, Input, OnInit } from '@angular/core';

import { Project } from '../project.model';
import { Type, Language, Keyword, Resource } from '../../core/metadata.model';

const DISPLAY_KEYWORD_COUNT = 3;

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

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
    let keywordList: Resource[] = [];

    for (let key in this.project.keywords) {
      if (keywordList.length === DISPLAY_KEYWORD_COUNT) {
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
