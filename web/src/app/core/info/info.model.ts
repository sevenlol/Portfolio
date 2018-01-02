/**
 * Angular Module: [[CoreModule]]
 *
 * Basic information about me.
 * E.g., name, summary, contact info.
 */
export interface BasicInfo {
  /**
   * Full name
   */
  name: string;
  /**
   * Short summary in few sentences
   */
  summary: string;
  /**
   * Avatar url
   */
  image: string;
  /**
   * Map of my contact information
   */
  profile: Profile;
  [key: string]: any;
}

/**
 * Angular Module: [[CoreModule]]
 *
 * Detailed information about me, including
 * eductaion and work experience.
 */
export interface Info extends BasicInfo {
  // Email address
  email: string;
  // Current region
  location: Location;
  // Phone number
  phone: string;
  // Link to my resume
  resumeUrl: string;
  // Link to my website
  url: string;
  // Education history
  education: Education[];
  // Work experience history
  work?: WorkExperience[];
}

/**
 * Angular Module: [[CoreModule]]
 *
 * Map of my contact information. Key: contact type name, e.g., github.
 * Value: a [[Contact]] object containing link and username.
 */
export interface Profile {
  [key: string]: Contact;
}

/**
 * Angular Module: [[CoreModule]]
 *
 * Contact information.
 */
export interface Contact {
  // Url of the contact page.
  url: string;
  // Username
  username?: string;
}

/**
 * Angular Module: [[CoreModule]]
 *
 * The region I am currently in.
 */
export interface Location {
  // City name, e.g., Hsinchu
  city: string;
  // Region name, e.g., Taiwan
  region: string;
}

/**
 * Angular Module: [[CoreModule]]
 *
 * Education information item.
 */
export interface Education {
  // Study area. E.g., Communication Engineering
  area: string;
  // Where I studied.
  institution: string;
  // Degree type. E.g., Master.
  studyType: string;
  // Start date of this education
  startDate: Date;
  // End date of this education
  endDate: Date;
}

/**
 * Angular Module: [[CoreModule]]
 *
 * Work experience item.
 */
export interface WorkExperience {
  // ID of this item
  id?: string;
  // name of the company
  name: string;
  // location of the company
  location: string;
  // my position name
  position: string;
  // summary of what I worked on
  summary: string;
  // company description
  description: string;
  // start date of this job
  startDate: Date;
  // end date of this job
  endDate?: Date;
  // highlights of my work
  highlights: string[];
}

/**
 * Angular Module: [[CoreModule]]
 *
 * A certain category of skills, e.g., Backend Development.
 */
export interface Skill {
  // ID of this skill item
  id?: string;
  // Display name of the skill category
  name: string;
  // Priority of this category, determining the order to be displayed.
  priority: number;
  // Item's last update time
  updatedAt: Date;
  // Skill items in this category
  items: SkillItem[];
}

/**
 * Angular Module: [[CoreModule]]
 *
 * Skill item, e.g., MySQL.
 */
export interface SkillItem {
  // Display name of this item
  name: string;
  // Link to the technology page
  url: string;
  // Simple description about this skill
  description?: string;
}
