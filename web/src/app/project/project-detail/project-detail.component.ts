import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Project } from '../../shared/project/project.model';
import { Keyword, Language, Type, MainMetadata, KeywordMetadata } from '../../core/metadata.model';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {

  project: Project = {
    name : 'Test Project',
    description : 'Project description',
    keywords : {
      angular : Date.now(),
      firebase : Date.now(),
      firestore : Date.now()
    },
    url : 'https://www.google.com',
    coverImageUrl : 'https://avatars3.githubusercontent.com/u/6497884?s=400&u=14a9be7c3afc0a1e0d797db1d9a7c86c5aac7a83&v=4',
    startDate : new Date(2017, 11, 1),
    endDate : new Date(2017, 11, 3),
    featured : true,
    active : true,
    primaryLanguage : 'javascript',
    primaryType : 'web',
    languages : {
      javascript : Date.now()
    },
    types : {
      backend : Date.now(),
      web : Date.now()
    },
    highlights : [
      'this is a awesome project. sldkjflks ddifjdfi highlight #1. some random stuff.',
      'this is item 2 which I don\'t know what I should type.',
      'just watched justice league, meh movie.'
    ],
    links : {
      demoImage : [
        {
          name : 'Web Layout',
          url : 'https://avatars3.githubusercontent.com/u/6497884?s=400&u=14a9be7c3afc0a1e0d797db1d9a7c86c5aac7a83&v=4'
        },
        {
          name : 'Some random image',
          url : 'https://istio.io/docs/tasks/telemetry/img/istio-tcp-attribute-flow.svg'
        }
      ],
      demoVideo : [
        {
          name : 'Website Demo Video',
          url : 'https://www.youtube.com/watch?v=WQJ61CVthBM'
        },
        {
          name : 'Random Video',
          url : 'https://www.youtube.com/watch?v=WQJ61CVthBM'
        }
      ],
      doc : [
        {
          description : 'Code of the main website',
          name : 'Portfolio Website',
          url : 'https://github.com/sevenlol/Portfolio'
        }
      ],
      github : [
        {
          description : 'Code of the main website',
          name : 'Portfolio Website',
          url : 'https://github.com/sevenlol/Portfolio'
        }
      ]
    }
  };

  keywords: Keyword;
  languages: Language;
  types: Type;

  constructor(
    private route: ActivatedRoute,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,) { }

  ngOnInit() {
    // icons
    this.registerIcon('github', 'assets/icons/github.svg');
    this.registerIcon('doc', 'assets/icons/doc.svg');
    this.registerIcon('video', 'assets/icons/video.svg');

    // retrieve metadata (already resolved)
    this.route.data.subscribe(( data : {
      mainMetadata : MainMetadata,
      keywordMetadata : KeywordMetadata }) => {
      this.languages = data.mainMetadata.languages;
      this.types = data.mainMetadata.types;
      this.keywords = data.keywordMetadata.keywords;
    });

    // TODO load project data here
  }

  private registerIcon(name: string, path: string) {
    this.iconRegistry.addSvgIcon(
      name,
      this.sanitizer.bypassSecurityTrustResourceUrl(path));
  }
}
