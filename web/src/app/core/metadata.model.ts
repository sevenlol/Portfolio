/**
 * Angular Module: [[CoreModule]]
 *
 * Contains language and project
 * category resource.
 */
export class MainMetadata {
  // language resource
  languages: Language;
  // project category resource
  types: Type;
}

/**
 * Angular Module: [[CoreModule]]
 *
 * Contains keyword resource.
 */
export class KeywordMetadata {
  keywords: Keyword;
}

/**
 * Angular Module: [[CoreModule]]
 *
 * Map for project category resources.
 */
export class Type {
  [key: string]: Resource;
}

/**
 * Angular Module: [[CoreModule]]
 *
 * Map for language resources.
 */
export class Language {
  [key: string]: Resource;
}

/**
 * Angular Module: [[CoreModule]]
 *
 * Map for keyword resources.
 */
export class Keyword {
  [key: string]: Resource;
}

/**
 * Angular Module: [[CoreModule]]
 *
 * Metadata resouce item
 */
export class Resource {
  // name of this resource
  displayName: string;
  // simple description
  description?: string;
  // background color when displaying this resource
  color?: string;
  // font color when displaying this resource
  fontColor?: string;
  // resource ID
  key?: string;
}
