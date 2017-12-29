export interface BasicInfo {
  name: string;
  summary: string;
  image: string;
  profile: Profile;
  [key: string]: any;
}

export interface Info extends BasicInfo {
  email: string;
  location: Location;
  phone: string;
  resumeUrl: string;
  url: string;
  education: Education[];
  work?: WorkExperience[];
}

export interface Profile {
  [key: string]: Contact;
}

export interface Contact {
  url: string;
  username?: string;
}

export interface Location {
  city: string;
  region: string;
}

export interface Education {
  area: string;
  institution: string;
  studyType: string;
  startDate: Date;
  endDate: Date;
}

export interface WorkExperience {
  id?: string;
  name: string;
  location: string;
  position: string;
  summary: string;
  description: string;
  startDate: Date;
  endDate?: Date;
  highlights: string[];
}
