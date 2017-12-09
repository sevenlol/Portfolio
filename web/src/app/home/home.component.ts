import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {
    this.registerIcon('facebook', 'assets/icons/facebook.svg');
    this.registerIcon('github', 'assets/icons/github.svg');
    this.registerIcon('linkedin', 'assets/icons/linkedin.svg');
    this.registerIcon('twitter', 'assets/icons/twitter.svg');
  }

  ngOnInit() {
  }

  private registerIcon(name: string, path: string) {
    this.iconRegistry.addSvgIcon(
      name, 
      this.sanitizer.bypassSecurityTrustResourceUrl(path));
  }

}
