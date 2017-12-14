export class Project {
  id: string;
  name: string;
  description: string;
  highlights?: string[];
  keywords: object;
  url: string;
  coverImageUrl?: string;
  startDate: Date;
  endDate: Date;
  featured: boolean;
  active: boolean;
  primaryLanguage: string;
  primaryType: string;
  languages: object;
  types: object;
  links?: object;
}

export class LinkMap {
  doc: Link[];
  github: Link[];
  demoVideo: Link[];
  demoImage: Link[];
}

export class Link {
  name: string;
  url: string;
  description?: string;
}
