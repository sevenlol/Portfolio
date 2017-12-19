import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';

import { Education } from '../../core/info/info.model';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {

  readonly DATE_FORMAT = 'MMM. yyyy';

  @Input() educations: Education[];

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.registerIcon('school', 'assets/icons/school.svg')
  }

  private registerIcon(name: string, path: string) {
    this.iconRegistry.addSvgIcon(
      name,
      this.sanitizer.bypassSecurityTrustResourceUrl(path));
  }

}
