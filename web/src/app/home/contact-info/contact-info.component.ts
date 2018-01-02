import { Component, OnInit, Input } from '@angular/core';

import { BasicInfo, Profile } from '../../core/info/info.model';

/**
 * Angular Module: [[HomeModule]]
 *
 * Component to display my contact info.
 * E.g., github, linkedin, ..., etc.
 */
@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.css']
})
export class ContactInfoComponent implements OnInit {

  /**
   * @input Map for my contact information items
   */
  @Input() profiles: Profile;

  constructor() { }

  /**
   * @hidden
   */
  ngOnInit() {
  }

}
