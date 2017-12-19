import { Component, OnInit } from '@angular/core';

import { WorkExperience } from '../../core/info/info.model';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css']
})
export class WorkComponent implements OnInit {

  // FIXME remove testing data
  ITEM: WorkExperience = {
    description : 'A company that makes routers',
    name : 'Gemtek Technology',
    location : 'Hsinchu, Taiwan',
    position : 'Software Engineer',
    summary : 'Write backend codes',
    startDate : new Date(2014, 11, 10),
    endDate : new Date(2017, 9, 25),
    highlights : [
      'Messaging system',
      'OAuth2',
      'Alexa',
      'hsdkhfkjshdkjfhs kjdhfkjshdjkhf jkshdfkjfhskjhdfjsh dsjfhsdkjhfsjk dhkfhsjkdhf jshkdfhskjdhs',
      'ETL pipeline'
    ]
  };

  experiences: WorkExperience[] = [
    this.ITEM
  ];

  constructor() { }

  ngOnInit() {
  }

}
