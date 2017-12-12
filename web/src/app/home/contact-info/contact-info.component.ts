import { Component, OnInit, Input } from '@angular/core';

import { BasicInfo, Profile } from '../../core/info/info.model';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.css']
})
export class ContactInfoComponent implements OnInit {

  @Input() profiles: Profile;

  constructor() { }

  ngOnInit() {
  }

}
