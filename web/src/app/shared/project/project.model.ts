export interface Project {
  id?: string;
  name: string;
  description: string;
  highlights?: string[];
  keywords: IndexMap;
  url: string;
  coverImageUrl?: string;
  startDate: Date;
  endDate: Date;
  featured: boolean;
  active: boolean;
  primaryLanguage: string;
  primaryType: string;
  languages: IndexMap;
  types: IndexMap;
  links?: LinkMap;
}

export interface LinkMap {
  doc: Link[];
  github: Link[];
  demoVideo: Link[];
  demoImage: Link[];
}

export interface Link {
  name: string;
  url: string;
  description?: string;
}

interface IndexMap {
  [key: string]: number;
}
