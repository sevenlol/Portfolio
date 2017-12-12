export interface Info extends BasicInfo {
}

export interface BasicInfo {
  name: string;
  summary: string;
  image: string;
  profile: Profile
  [key: string]: any;
}

export interface Profile {
  [key: string]: Contact;
}

export interface Contact {
  url: string;
  username?: string;
}
