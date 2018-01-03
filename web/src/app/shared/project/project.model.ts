/**
 * Angular Module: [[SharedModule]]
 *
 * Information about personal projects
 */
export interface Project {
  // project id
  id?: string;
  // project name
  name: string;
  // short project description
  description: string;
  // project highlight texts
  highlights?: string[];
  // map of project keywords
  keywords: IndexMap;
  // link to project website
  url: string;
  // link to cover image
  coverImageUrl?: string;
  // project start date
  startDate: Date;
  // project end date (last update)
  endDate: Date;
  // whether this project is featured
  featured: boolean;
  // whether this project is under active development
  active: boolean;
  // primary language of this project
  primaryLanguage: string;
  // primary category of this project
  primaryType: string;
  // map of languages used in this project
  languages: IndexMap;
  // map of categories of this project
  types: IndexMap;
  // map of related links
  links?: LinkMap;
}

/**
 * Angular Module: [[SharedModule]]
 *
 * Map of project related links
 */
export interface LinkMap {
  // document links
  doc: Link[];
  // github links
  github: Link[];
  // demo videos of this project
  demoVideo: Link[];
  // demo images of this project
  demoImage: Link[];
}

/**
 * Angular Module: [[SharedModule]]
 *
 * Link object, including link name, url and
 * description
 */
export interface Link {
  // link name
  name: string;
  // link url
  url: string;
  // link description
  description?: string;
}

/**
 * Angular Module: [[SharedModule]]
 *
 * Map of indexes. Map key is the resource key
 * that this project contains
 */
interface IndexMap {
  [key: string]: number;
}
