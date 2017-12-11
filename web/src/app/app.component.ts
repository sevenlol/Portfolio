import { Component, OnInit } from '@angular/core';

import { MainMetadata } from './core/metadata.model';
import { MetadataService } from './core/metadata.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  metadataLoaded: boolean = false;

  constructor(private metaService: MetadataService) { }

  ngOnInit() {
    this.metaService.getMainMetadata().subscribe((res) => {
      console.log(res);
      this.metadataLoaded = (res !== undefined);
    });
  }
}
