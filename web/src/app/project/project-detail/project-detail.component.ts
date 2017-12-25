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

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit, OnDestroy {

  project: Project;
  showSpinner: boolean;

  unSub$: Subject<void> = new Subject();

  keywords: Keyword;
  languages: Language;
  types: Type;

  constructor(
    private route: ActivatedRoute,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private projectService: ProjectService) { }

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

  ngOnDestroy() {
    // to unsubscribe other observers
    this.unSub$.next();
    this.unSub$.complete();
  }

  private registerIcon(name: string, path: string) {
    this.iconRegistry.addSvgIcon(
      name,
      this.sanitizer.bypassSecurityTrustResourceUrl(path));
  }
}
