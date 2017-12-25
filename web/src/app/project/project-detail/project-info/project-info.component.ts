import { Component, OnInit, Input } from '@angular/core';
import { Project } from '../../../shared/project/project.model';
import { Keyword, Language, Type, Resource } from '../../../core/metadata.model';

@Component({
  selector: 'app-project-info',
  templateUrl: './project-info.component.html',
  styleUrls: ['./project-info.component.css']
})
export class ProjectInfoComponent implements OnInit {

  static readonly PRIMARY_COLOR = '#01579b';
  static readonly PRIMARY_FONT_COLOR = 'white';
  readonly DATE_FORMAT: string = 'MMM. yyyy';

  @Input() project: Project;
  @Input() keywords: Keyword;
  @Input() languages: Language;
  @Input() types: Type;

  displayCategories = [];
  displayLanguages = [];
  displayKeywords = [];

  constructor() { }

  ngOnInit() {
    this.displayCategories = this.buildDisplayResource(
      this.project.types, this.types, this.project.primaryType);
    this.displayLanguages = this.buildDisplayResource(
      this.project.languages, this.languages, this.project.primaryLanguage);
    this.displayKeywords = this.buildDisplayResource(
      this.project.keywords, this.keywords);
  }

  private buildDisplayResource(indexMap, resourceMap: Keyword | Language | Type, primaryKey?: string): Resource[] {
    let res: Resource[] = [];
    // add primary resource
    if (primaryKey) {
      let primary = this.copy(resourceMap[primaryKey]);
      primary.key = primaryKey;
      primary.color = ProjectInfoComponent.PRIMARY_COLOR;
      primary.fontColor = ProjectInfoComponent.PRIMARY_FONT_COLOR;
      res.push(primary);
    }

    for (let key in indexMap) {
      if (!key || key === primaryKey) {
        continue;
      }

      let resource = this.copy(resourceMap[key]);
      resource.key = key;
      res.push(resource);
    }

    return res;
  }

  private copy(resource: Resource): Resource {
    let copyRes: Resource = new Resource();
    copyRes.color = resource.color;
    copyRes.description = resource.description;
    copyRes.displayName = resource.displayName;
    copyRes.fontColor = resource.fontColor;
    return copyRes;
  }
}
