import { Component, OnInit, Input } from '@angular/core';

import { Type, Language, Keyword } from '../../core/metadata.model';
import { Query, QueryType } from '../project.service';

@Component({
  selector: 'app-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.css']
})
export class FilterPanelComponent implements OnInit {

  @Input() languages: Language;
  @Input('types') categories: Type;
  @Input() keywords: Keyword;
  @Input() expanded: boolean = false;

  QueryType = QueryType;
  categoryOptions = [];
  keywordOptions = [];
  languageOptions = [];

  type: QueryType;
  active: boolean;
  value: string;

  projectStatus;

  constructor() { }

  ngOnInit() {
    this.generateOptions(this.categoryOptions, this.categories);
    this.generateOptions(this.keywordOptions, this.keywords);
    this.generateOptions(this.languageOptions, this.languages);
  }

  public apply() {
    // TODO implement
  }

  public clearProjectStatus() {
    delete this.active;
  }

  public clearFilterOptions() {
    delete this.type;
    delete this.active;
    delete this.value;
  }

  // FIXME remove hard-coded index comparison
  public queryTypeChanged(index: number) {
    if (index === 0) {
      this.type = QueryType.KEYWORD;
    } else if (index === 1) {
      this.type = QueryType.LANGUAGE;
    } else if (index === 2) {
      this.type = QueryType.TYPE;
    }
    // clear filter options
    this.clearFilterOptions();
  }

  private generateOptions(options, map: Type | Keyword | Language) {
    for (let key in map) {
      options.push({
        key : key,
        name : map[key].displayName,
        description : map[key].description
      });
    }
  }
}
