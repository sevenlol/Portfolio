import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getTitle() {
    return browser.getTitle();
  }

  getHomeButtonText() {
    return element(by.css('button[mat-button]')).getText();
  }

  getProjectLinkButtonText() {
    return element(by.css('a[routerLink="/projects"]')).getText();
  }

  getAboutLinkButtonText() {
    return element(by.css('a[routerLink="/about"]')).getText();
  }
}
