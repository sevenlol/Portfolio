import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';

import { Observable } from 'rxjs/Observable';
import { MainMetadata, KeywordMetadata } from '../core/metadata.model';
import { BasicInfo } from '../core/info/info.model';

/**
 * Angular Module: [[HomeModule]]
 *
 * Container component for [[IntroComponent]],
 * [[FeaturedProjectsComponent]] and [[ContactInfoComponent]]
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  /**
   * Language and project category metadata resource map
   */
  mainMetadata: MainMetadata;
  /**
   * Keyword metadata resource map
   */
  keywordMetadata: KeywordMetadata;
  /**
   * Basic information about me
   */
  basicInfo: BasicInfo;

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute) {
  }

  /**
   * @hidden
   * register icon and load main metadata, keyword metadata and
   * basic info from router
   */
  ngOnInit() {
    this.registerIcon('facebook', 'assets/icons/facebook.svg');
    this.registerIcon('github', 'assets/icons/github.svg');
    this.registerIcon('linkedin', 'assets/icons/linkedin.svg');
    this.registerIcon('twitter', 'assets/icons/twitter.svg');
    this.route.data.subscribe(( data: {
      mainMetadata: MainMetadata,
      keywordMetadata: KeywordMetadata,
      basicInfo: BasicInfo }) => {
      this.mainMetadata = data.mainMetadata;
      this.keywordMetadata = data.keywordMetadata;
      this.basicInfo = data.basicInfo;
    });
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
