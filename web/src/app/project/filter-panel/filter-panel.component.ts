import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Type, Language, Keyword } from '../../core/metadata.model';
import { Query, QueryType } from '../project.service';

/**
 * Angular Module: [[ProjectModule]]
 *
 * Component for setting filter options of [[Project]]
 */
@Component({
  selector: 'app-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.css']
})
export class FilterPanelComponent implements OnInit {

  /**
   * @input language metadata resource map
   */
  @Input() languages: Language;
  /**
   * @input project category resource map
   */
  @Input() categories: Type;
  /**
   * @input keyword resource map
   */
  @Input() keywords: Keyword;
  /**
   * @input flag to expand the filter panel
   */
  @Input() expanded = false;

  /**
   * @output event indicating query changing (e.g., user applying/clearing filter)
   */
  @Output() queryChange: EventEmitter<Query> = new EventEmitter<Query>();

  /**
   * List of options that projects can be filtered on.
   * E.g., keyword, language
   */
  QueryType = QueryType;
  /**
   * Viable category list, generated with category resource map
   */
  categoryOptions = [];
  /**
   * Viable keyword list
   */
  keywordOptions = [];
  /**
   * Viable language list
   */
  languageOptions = [];

  // TODO find a way to be consistent with template and not have
  // to modify multiply places
  // default query type
  /**
   * Current filter option
   */
  type: QueryType = QueryType.KEYWORD;
  /**
   * Filter project based on its status (active, complete)
   */
  active: boolean;
  /**
   * Filter value, can be the key of keyword, category or language
   */
  value: string;

  /**
   * Current keyword name in the search bar (typed or selected by users)
   */
  keywordName: string;
  /**
   * Valid keyword items based on [[keywordName]]
   */
  filteredKeywords;

  constructor() { }

  /**
   * @hidden
   * Generate option list with resource map (map to array and add key
   * to each item)
   */
  ngOnInit() {
    this.generateOptions(this.categoryOptions, this.categories);
    this.generateOptions(this.keywordOptions, this.keywords);
    this.generateOptions(this.languageOptions, this.languages);
  }

  /**
   * Generate a [[Query]] object based on current
   * state and emit a queryChange event
   */
  public apply() {
    // TODO add checks for related variables
    // all query related field should be valid
    const query: Query = {
      type : this.type,
      active : this.active,
      value : this.value
    };

    this.queryChange.emit(query);
  }

  /**
   * Clear project status. The current query will not filter project
   * with its status. Both active and complete projects will be
   * displayed.
   */
  public clearProjectStatus() {
    delete this.active;
  }

  /**
   * Clear all filter options and emit a queryChange with empty query
   * object (indicating the query is cleared).
   */
  public clearFilterOptions() {
    // emit an empty query when the user click clear
    this.queryChange.emit();
    this.clear();
  }

  // FIXME remove hard-coded index comparison
  // TODO find a way to use QueryType oridinal as the order of tabs
  /**
   * Change filter option with specified index, clearing current query.
   * @param index query type tab index
   */
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

  /**
   * Filter keyword options by a search key
   * @param val search key
   * @returns array of keywords that contain the search key
   */
  public filterKeywords(val: string) {
    this.value = this.keywordOptions.reduce(
      (curr, keyword) => (keyword.name === val) ? keyword.key : curr,
      undefined);
    return this.keywordOptions.filter(keyword => keyword.name.toLowerCase().startsWith(val.toLowerCase()));
  }

  /**
   * Clear all states related to current query
   */
  private clear() {
    // TODO reset keyword input's valid state
    delete this.active;
    delete this.value;
    delete this.keywordName;
    this.filteredKeywords = this.keywordOptions;
  }

  /**
   * Generate option list with a resource map
   * @param options option list where option items will be inserted into
   * @param map resource map to generate option list from
   */
  private generateOptions(options, map: Type | Keyword | Language) {
    for (const key in map) {
      if (!map.hasOwnProperty(key)) {
        continue;
      }
      options.push({
        key : key,
        name : map[key].displayName,
        description : map[key].description
      });
    }
    this.filteredKeywords = this.keywordOptions;
  }
}
