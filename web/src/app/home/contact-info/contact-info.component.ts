import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.css']
})
export class ContactInfoComponent implements OnInit {

  profiles: object = {
    facebook : {
      url : 'https://www.facebook.com/fattselin',
      username : 'fattselin'
    },
    github : {
      url : 'https://github.com/sevenlol',
      username : 'sevenlol'
    },
    twitter : {
      url : 'https://twitter.com/sevenlol1007',
      username : 'sevenlol1007'
    },
    linkedin : {
      url : 'https://www.linkedin.com/in/stephen-lin-b211aa109/',
      username : 'sevenlol1007@gmail.com'
    }
  }

  constructor() { }

  ngOnInit() {
  }

}
