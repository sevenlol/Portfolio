import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';

/**
 * Angular Module: [[CoreModule]]
 *
 * Navagation bar component.
 */
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.registerIcon('home', 'assets/icons/home.svg');
  }

  // TODO move these to utility class
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
