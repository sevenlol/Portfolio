import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

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

  @Output() queryChange: EventEmitter<Query> = new EventEmitter<Query>();

  QueryType = QueryType;
  categoryOptions = [];
  keywordOptions = [];
  languageOptions = [];

  // TODO find a way to be consistent with template and not have
  // to modify multiply places
  // default query type
  type: QueryType = QueryType.KEYWORD;
  active: boolean;
  value: string;

  keywordName: string;
  filteredKeywords;
  projectStatus;

  constructor() { }

  ngOnInit() {
    this.generateOptions(this.categoryOptions, this.categories);
    this.generateOptions(this.keywordOptions, this.keywords);
    this.generateOptions(this.languageOptions, this.languages);
  }

  public apply() {
    // TODO add checks for related variables
    // all query related field should be valid
    let query: Query = {
      type : this.type,
      active : this.active,
      value : this.value
    };

    this.queryChange.emit(query);
  }

  public clearProjectStatus() {
    delete this.active;
  }

  public clearFilterOptions() {
    // emit an empty query when the user click clear
    this.queryChange.emit();
    this.clear();
  }

  // FIXME remove hard-coded index comparison
  // TODO find a way to use QueryType oridinal as the order of tabs
  public queryTypeChanged(index: number) {
    // clear filter options
    this.clear();
    if (index === 0) {
      this.type = QueryType.KEYWORD;
    } else if (index === 1) {
      this.type = QueryType.LANGUAGE;
    } else if (index === 2) {
      this.type = QueryType.TYPE;
    }
  }

  public filterKeywords(val: string) {
    this.value = this.keywordOptions.reduce(
      (curr, keyword) => (keyword.name === val) ? keyword.key : curr,
      undefined);
    return this.keywordOptions.filter(keyword => keyword.name.toLowerCase().startsWith(val.toLowerCase()));
  }

  private clear() {
    // TODO reset keyword input's valid state
    delete this.active;
    delete this.value;
    delete this.keywordName;
    this.filteredKeywords = this.keywordOptions;
  }

  private generateOptions(options, map: Type | Keyword | Language) {
    for (let key in map) {
      options.push({
        key : key,
        name : map[key].displayName,
        description : map[key].description
      });
    }
    this.filteredKeywords = this.keywordOptions;
  }
}
