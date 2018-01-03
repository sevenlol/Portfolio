import { Component, OnInit, Input } from '@angular/core';
import { Project } from '../../../shared/project/project.model';
import { Keyword, Language, Type, Resource } from '../../../core/metadata.model';

/**
 * Angular Module: [[ProjectModule]]
 *
 * Component to display project information, such as keywords,
 * languages, name, ..., etc.
 */
@Component({
  selector: 'app-project-info',
  templateUrl: './project-info.component.html',
  styleUrls: ['./project-info.component.css']
})
export class ProjectInfoComponent implements OnInit {

  /**
   * background color for primary resources
   */
  static readonly PRIMARY_COLOR = '#01579b';
  /**
   * text color for primary resources
   */
  static readonly PRIMARY_FONT_COLOR = 'white';
  /**
   * date format for startDate/endDate of projects
   */
  readonly DATE_FORMAT: string = 'MMM. yyyy';

  /**
   * @input current project
   */
  @Input() project: Project;
  /**
   * @input keyword resource map
   */
  @Input() keywords: Keyword;
  /**
   * @input language resource map
   */
  @Input() languages: Language;
  /**
   * @input project category resource map
   */
  @Input() types: Type;

  /**
   * category resource list of current project
   */
  displayCategories = [];
  /**
   * language resource list of current project
   */
  displayLanguages = [];
  /**
   * keyword resource list of current project
   */
  displayKeywords = [];

  constructor() { }

  /**
   * @hidden
   * generate resource lists for category, language and keyword
   */
  ngOnInit() {
    this.displayCategories = this.buildDisplayResource(
      this.project.types, this.types, this.project.primaryType);
    this.displayLanguages = this.buildDisplayResource(
      this.project.languages, this.languages, this.project.primaryLanguage);
    this.displayKeywords = this.buildDisplayResource(
      this.project.keywords, this.keywords);
  }

  /**
   * Generate a resource list with a index map (resources current project contains)
   * and append color fields if the resource item matches given primary key.
   * @param indexMap a map for resources this project contains
   * @param resourceMap a map for all probable resources
   * @param primaryKey primary resource key
   * @returns a list of resource objects that the current project contains
   */
  private buildDisplayResource(indexMap, resourceMap: Keyword | Language | Type, primaryKey?: string): Resource[] {
    const res: Resource[] = [];
    // add primary resource
    if (primaryKey) {
      const primary = this.copy(resourceMap[primaryKey]);
      primary.key = primaryKey;
      primary.color = ProjectInfoComponent.PRIMARY_COLOR;
      primary.fontColor = ProjectInfoComponent.PRIMARY_FONT_COLOR;
      res.push(primary);
    }

    for (const key in indexMap) {
      if (!key || key === primaryKey) {
        continue;
      }
      if (!resourceMap[key]) {
        // guard against invalid keyword
        // TODO log error
        continue;
      }

      const resource = this.copy(resourceMap[key]);
      resource.key = key;
      res.push(resource);
    }

    return res;
  }

  // FIXME move to utility class
  /**
   * Utility function to copy a [[Resource]] object
   * @param resource resouce object to be copied
   * @returns a deep copy of the input resource object
   */
  private copy(resource: Resource): Resource {
    const copyRes: Resource = new Resource();
    copyRes.color = resource.color;
    copyRes.description = resource.description;
    copyRes.displayName = resource.displayName;
    copyRes.fontColor = resource.fontColor;
    return copyRes;
  }
}
