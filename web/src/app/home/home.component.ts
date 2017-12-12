import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';

import { Observable } from 'rxjs/Observable';
import { MainMetadata, KeywordMetadata } from '../core/metadata.model';
import { BasicInfo } from '../core/info/info.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  mainMetadata: MainMetadata;
  keywordMetadata: KeywordMetadata;
  basicInfo: BasicInfo;

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.registerIcon('facebook', 'assets/icons/facebook.svg');
    this.registerIcon('github', 'assets/icons/github.svg');
    this.registerIcon('linkedin', 'assets/icons/linkedin.svg');
    this.registerIcon('twitter', 'assets/icons/twitter.svg');
    this.route.data.subscribe(( data : {
      mainMetadata : MainMetadata,
      keywordMetadata : KeywordMetadata,
      basicInfo: BasicInfo }) => {
      this.mainMetadata = data.mainMetadata;
      this.keywordMetadata = data.keywordMetadata;
      this.basicInfo = data.basicInfo;
    });
  }

  private registerIcon(name: string, path: string) {
    this.iconRegistry.addSvgIcon(
      name,
      this.sanitizer.bypassSecurityTrustResourceUrl(path));
  }
}
