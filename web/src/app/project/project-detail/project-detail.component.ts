import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/do';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Project } from '../../shared/project/project.model';
import { Keyword, Language, Type, MainMetadata, KeywordMetadata } from '../../core/metadata.model';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { ProjectService } from '../project.service';

/**
 * Angular Module: [[ProjectModule]]
 *
 * Component for displaying detailed information of a target [[Project]]
 */
@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit, OnDestroy {

  /**
   * target project
   */
  project: Project;
  /**
   * flag to display/hide spinner
   */
  showSpinner: boolean;

  /**
   * trigger to stop loading project data
   */
  unSub$: Subject<void> = new Subject();

  /**
   * keyword resource map
   */
  keywords: Keyword;
  /**
   * language resource map
   */
  languages: Language;
  /**
   * category resource map
   */
  types: Type;

  constructor(
    private route: ActivatedRoute,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private projectService: ProjectService) { }

  /**
   * @hidden
   * 1. Register icons
   * 2. Retrieve language, keyword and category resource map
   *    from router (already resolved)
   * 3. Retrieve project ID from router
   * 4. Load project
   */
  ngOnInit() {
    // icons
    this.registerIcon('github', 'assets/icons/github.svg');
    this.registerIcon('doc', 'assets/icons/doc.svg');
    this.registerIcon('video', 'assets/icons/video.svg');

    // retrieve metadata (already resolved)
    this.route.data.subscribe(( data: {
      mainMetadata: MainMetadata,
      keywordMetadata: KeywordMetadata }) => {
      this.languages = data.mainMetadata.languages;
      this.types = data.mainMetadata.types;
      this.keywords = data.keywordMetadata.keywords;
    });

    // load project data
    this.route.paramMap
      .switchMap((params: ParamMap) =>
        this.projectService.get(params.get('id')))
      .do(() => this.showSpinner = true)
      .takeUntil(this.unSub$)
      .subscribe(project => {
        this.project = project;
        this.showSpinner = false;
      });
  }

  /**
   * @hidden
   */
  ngOnDestroy() {
    // to unsubscribe other observers
    this.unSub$.next();
    this.unSub$.complete();
  }

  /**
   * Register svg icon to Angular Material
   * @param name name of the svg icon
   * @param path svg file path
   */
  private registerIcon(name: string, path: string) {
    this.iconRegistry.addSvgIcon(
      name,
      this.sanitizer.bypassSecurityTrustResourceUrl(path));
  }
}
