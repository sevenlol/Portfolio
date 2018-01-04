import { browser, by } from 'protractor';
import { AppPage } from './app.po';

describe('web App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display title correctly', () => {
    page.navigateTo();
    ignoreSync(page.getTitle.bind(page)).then(title => {
      expect(title).toEqual('Stephen Lin');
    });
  });

  it('should display nav bar correctly', () => {
    page.navigateTo();
    // home button
    ignoreSync(page.getHomeButtonText.bind(page)).then(homeText => {
      expect(homeText).toEqual('Portfolio');
    });

    // link buttons
    ignoreSync(page.getProjectLinkButtonText.bind(page)).then(projectLinkText => {
      expect(projectLinkText).toEqual('Projects');
    });
    ignoreSync(page.getAboutLinkButtonText.bind(page)).then(aboutLinkText => {
      expect(aboutLinkText).toEqual('About');
    });
  });
});

function ignoreSync(func) {
  browser.ignoreSynchronization = true;
  return func().then(res => {
    browser.ignoreSynchronization = false;
    return res;
  });
}
