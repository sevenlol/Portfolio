import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';

/**
 * Angular Module: [[CoreModule]]
 *
 * Error page for unrecognized route
 */
@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.registerIcon('error', 'assets/icons/error.svg');
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
