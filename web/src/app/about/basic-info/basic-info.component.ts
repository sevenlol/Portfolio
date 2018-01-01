import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';

import { Info } from '../../core/info/info.model';

/**
 * Angular Module: [[AboutModule]]
 *
 * Component to display my basic information.
 * E.g., name, location, email, etc.
 */
@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.css']
})
export class BasicInfoComponent implements OnInit {

  /**
   * @input information about me
   */
  @Input() info: Info;

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer) {
  }

  /**
   * @hidden
   */
  ngOnInit() {
    this.registerIcon('facebook', 'assets/icons/facebook.svg');
    this.registerIcon('github', 'assets/icons/github.svg');
    this.registerIcon('linkedin', 'assets/icons/linkedin.svg');
    this.registerIcon('twitter', 'assets/icons/twitter.svg');

    this.registerIcon('location', 'assets/icons/location.svg');
    this.registerIcon('email', 'assets/icons/email.svg');
    this.registerIcon('phone', 'assets/icons/phone.svg');
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
