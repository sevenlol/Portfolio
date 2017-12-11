export class Type {
  [key: string]: Resource;
}

export class Language {
  [key: string]: Resource;
}

export class Keyword {
  [key: string]: Resource;
}

export class Resource {
  displayName: string;
  description?: string;
  color?: string;
  fontColor?: string;
}
