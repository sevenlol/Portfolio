import { Component, OnInit, Input } from '@angular/core';
import { Project } from '../../shared/project.model';
import { MainMetadata, KeywordMetadata, Type, Language, Keyword } from '../../core/metadata.model';

const PROJECT = {
  id : 'sssss',
  name : 'Portfolio',
  description : 'Personal Website',
  highlights : [
      'Basic Information',
      'Personal Projects'
  ],
  keywords : {
    angular : Date.now(),
    firebase : Date.now()
  },
  startDate : new Date(2017,11,1),
  endDate : new Date(2017,11,31),
  featured : true,
  active : true,
  url : 'https://sevenloldev.com',
  coverImageUrl : 'https://avatars3.githubusercontent.com/u/6497884?s=400&u=14a9be7c3afc0a1e0d797db1d9a7c86c5aac7a83&v=4',
  languages : {
    javascript : Date.now(),
    nodejs : Date.now()
  },
  primaryLanguage : 'javascript',
  primaryType : 'web',
  types : {
    web : Date.now(),
    backend : Date.now()
  },
  links : {
      doc : [],
      github : [
          {
              name : 'Portfolio Website',
              url : 'https://github.com/sevenlol/Portfolio',
              description : 'Code of the main website'
          }
      ],
      demoVideo : [],
      demoImage : []
  }
};

const PROJECT2 = JSON.parse(JSON.stringify(PROJECT));
PROJECT2.description = `Very long
  descriptionnnnnnnnnnnnnnnnnnnnn
  ssss ddd  d d d d  d dddddddjdjdjdjjd
  sldkfksljdflsjfk`;

@Component({
  selector: 'app-featured-projects',
  templateUrl: './featured-projects.component.html',
  styleUrls: ['./featured-projects.component.css']
})
export class FeaturedProjectsComponent implements OnInit {

  featuredProjects: Project[][] = [
    [
      PROJECT, PROJECT, PROJECT2
    ],
    [
      PROJECT
    ]
  ];

  keywords: Keyword;
  languages: Language;
  types: Type;

  @Input() mainMetadata: MainMetadata;
  @Input() keywordMetadata: KeywordMetadata;

  constructor() { }

  ngOnInit() {
    this.languages = this.mainMetadata.languages;
    this.types = this.mainMetadata.types;
    this.keywords = this.keywordMetadata.keywords;
  }

}
