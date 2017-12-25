import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { BasicInfo, Contact } from '../../core/info/info.model';
import { ContactInfoComponent } from './contact-info.component';

describe('ContactInfoComponent', () => {
  let component: ContactInfoComponent;
  let fixture: ComponentFixture<ContactInfoComponent>;
  let de: DebugElement;

  const BASIC_INFO: BasicInfo = {
    name : 'Stephen Lin',
    summary : 'Backend Developer',
    image : 'https://avatars3.githubusercontent.com/u/6497884?s=400&u=14a9be7c3afc0a1e0d797db1d9a7c86c5aac7a83&v=4',
    profile : {}
  };
  const CONTACT_TITLE_TEXT = 'Contact';
  const GITHUB_PROFILE: Contact = {
    url : 'https://github.com/sevenlol',
    username : 'sevenlol'
  };
  const LINKEDIN_PROFILE: Contact = {
    url : 'https://www.linkedin.com/in/stephen-lin-b211aa109/',
    username : 'test'
  };
  const FACEBOOK_PROFILE: Contact = {
    url : 'https://www.facebook.com/fattselin',
    username : 'test'
  };
  const TWITTER_PROFILE: Contact = {
    url : 'https://twitter.com/sevenlol1007',
    username : 'test'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [ MatIconModule, MatTooltipModule ],
      declarations: [ ContactInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactInfoComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    component.profiles = BASIC_INFO.profile;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // title
  it('should contain correct title', () => {
    const titleEle: DebugElement = de.query(By.css('.contact-title'));
    expect(titleEle).toBeTruthy();
    expect(titleEle.nativeElement.textContent).toContain(CONTACT_TITLE_TEXT);
  });

  /*
   * Profile
   */

  // no contact links displayed when profile object is empty
  it('should contain no profile link', () => {
    const contactLinkEles: DebugElement[] = de.queryAll(By.css('mat-icon'));
    expect(contactLinkEles.length).toBe(0);
  });

  // check only github link exists with a profile contains only github property
  it('should only contain github link', () => {
    component.profiles.github = GITHUB_PROFILE;
    fixture.detectChanges();
    const githubEle: DebugElement = getContactIconElement('github');
    const linkedInEle: DebugElement = getContactIconElement('linkedin');
    const facebookEle: DebugElement = getContactIconElement('facebook');
    const twitterEle: DebugElement = getContactIconElement('twitter');
    // only github icon exists
    expect(githubEle).toBeTruthy();
    expect(linkedInEle).toBeFalsy();
    expect(facebookEle).toBeFalsy();
    expect(twitterEle).toBeFalsy();
    const githubLinkEle: DebugElement = getContactLinkElement('Github');
    expect(githubLinkEle).toBeTruthy();
    // github url match
    expect(getHref(githubLinkEle)).toBe(GITHUB_PROFILE.url);
  });

  // check all contact links exist when all properties of the profile are set
  it('should contain all contact links', () => {
    component.profiles = {
      github : GITHUB_PROFILE,
      linkedin : LINKEDIN_PROFILE,
      facebook : FACEBOOK_PROFILE,
      twitter : TWITTER_PROFILE
    };
    fixture.detectChanges();
    const githubEle: DebugElement = getContactIconElement('github');
    const linkedInEle: DebugElement = getContactIconElement('linkedin');
    const facebookEle: DebugElement = getContactIconElement('facebook');
    const twitterEle: DebugElement = getContactIconElement('twitter');
    // all contact icons exist
    expect(githubEle).toBeTruthy();
    expect(linkedInEle).toBeTruthy();
    expect(facebookEle).toBeTruthy();
    expect(twitterEle).toBeTruthy();
    // all contact links exist and link matches the profile
    const githubLinkEle: DebugElement = getContactLinkElement('Github');
    const linkedInLinkEle: DebugElement = getContactLinkElement('LinkedIn');
    const facebookLinkEle: DebugElement = getContactLinkElement('Facebook');
    const twitterLinkEle: DebugElement = getContactLinkElement('Twitter');
    expect(githubLinkEle).toBeTruthy();
    expect(linkedInLinkEle).toBeTruthy();
    expect(facebookLinkEle).toBeTruthy();
    expect(twitterLinkEle).toBeTruthy();
    expect(getHref(githubLinkEle)).toBe(GITHUB_PROFILE.url);
    expect(getHref(linkedInLinkEle)).toBe(LINKEDIN_PROFILE.url);
    expect(getHref(facebookLinkEle)).toBe(FACEBOOK_PROFILE.url);
    expect(getHref(twitterLinkEle)).toBe(TWITTER_PROFILE.url);
  });

  // use css attribute selector to find svgIcon == contactType
  // e.g., svgIcon == github
  function getContactIconElement(contactType: string): DebugElement {
    return de.query(By.css(`mat-icon[svgIcon="${contactType}"]`));
  }

  function getContactLinkElement(tooltipText: string): DebugElement {
    return de.query(By.css(`a[matTooltip="${tooltipText}"`));
  }

  function getHref(e: DebugElement): string {
    return e.nativeElement.getAttribute('href');
  }
});
