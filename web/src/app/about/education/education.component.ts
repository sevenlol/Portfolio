import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';

import { Education } from '../../core/info/info.model';

/**
 * Angular Module: [[AboutModule]]
 *
 * Component to display information about my education.
 */
@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {

  /**
   * Date format for education startDate/endDate
   */
  readonly DATE_FORMAT = 'MMM. yyyy';

  /**
   * @input eductaion information
   */
  @Input() educations: Education[];

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer) {
  }

  /**
   * @hidden
   */
  ngOnInit() {
    this.registerIcon('school', 'assets/icons/school.svg');
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
