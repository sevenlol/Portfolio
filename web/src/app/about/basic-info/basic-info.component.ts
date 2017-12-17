import { Component, OnInit } from '@angular/core';

import { Info } from '../../core/info/info.model';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.css']
})
export class BasicInfoComponent implements OnInit {

  // FIXME remove testing data
  info: Info = {
    name : 'Stephen Lin',
    label : 'Backend Developer',
    summary : 'Backend Developer',
    image : 'https://avatars3.githubusercontent.com/u/6497884?s=400&u=14a9be7c3afc0a1e0d797db1d9a7c86c5aac7a83&v=4',
    profile : {
      github : {
        url : 'https://github.com/sevenlol',
        username : 'sevenlol'
      },
      linkedin : {
        url : 'https://www.linkedin.com/in/stephen-lin-b211aa109/',
        username : 'test'
      },
      facebook : {
        url : 'https://www.facebook.com/fattselin',
        username : 'test'
      },
      twitter : {
        url : 'https://twitter.com/sevenlol1007',
        username : 'test'
      }
    }
  };

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.registerIcon('facebook', 'assets/icons/facebook.svg');
    this.registerIcon('github', 'assets/icons/github.svg');
    this.registerIcon('linkedin', 'assets/icons/linkedin.svg');
    this.registerIcon('twitter', 'assets/icons/twitter.svg');
  }

  private registerIcon(name: string, path: string) {
    this.iconRegistry.addSvgIcon(
      name,
      this.sanitizer.bypassSecurityTrustResourceUrl(path));
  }
}
