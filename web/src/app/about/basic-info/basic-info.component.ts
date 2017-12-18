import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';

import { Info } from '../../core/info/info.model';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.css']
})
export class BasicInfoComponent implements OnInit {

  @Input() info: Info;

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.registerIcon('facebook', 'assets/icons/facebook.svg');
    this.registerIcon('github', 'assets/icons/github.svg');
    this.registerIcon('linkedin', 'assets/icons/linkedin.svg');
    this.registerIcon('twitter', 'assets/icons/twitter.svg');

    this.registerIcon('location', 'assets/icons/location.svg');
    this.registerIcon('email', 'assets/icons/email.svg');
    this.registerIcon('phone', 'assets/icons/phone.svg');
  }

  private registerIcon(name: string, path: string) {
    this.iconRegistry.addSvgIcon(
      name,
      this.sanitizer.bypassSecurityTrustResourceUrl(path));
  }
}
