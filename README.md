Portfolio Website
=========

This is the repo that contains the code for my personal website.

### Related Repositories

1. [Design Documents](https://github.com/sevenlol/PortfolioDoc)
2. [Typescript Document](https://github.com/sevenlol/PortfolioWebTSDoc): Host typescript document of this project
3. [Tools](https://github.com/sevenlol/PortfolioTool): Tools for this project

### Tech Stack

1. [Angular](https://angular.io): primary web framework.
2. [Angular Material](https://material.angular.io): UI framework.
3. [AngularFire2](https://github.com/angular/angularfire2): Angular library for Firebase.
4. [flex-layout](https://github.com/angular/flex-layout): UI layout for Angular.
5. [Jasmine](http://jasmine.github.io/2.4/introduction.html), [Karma](https://karma-runner.github.io/1.0/index.html) and Protractor: Unit tests and End to End (e2e) tests.
6. [Firebase](https://firebase.google.com): Firestore as the main database, Hosting, Function and Storage.
7. [Typedoc](http://typedoc.org/): Typescript document generator.
8. [Docusaurus](https://docusaurus.io): Design documents (this document).
9. [CircleCI](https://circleci.com): CI/CD platform.

### Commands

All the codes live in `/web` directory, should be put in the root directory :(.

#### Installation

1. Install [angular-cli](https://github.com/angular/angular-cli) first.
2. `npm install`

#### Development

1. `npm install`
2. `ng serve` or `npm start` and open `localhost:4200`
3. `ng lint` for linting
4. `ng test` or `npm run test` for unit tests.
5. `npm run typedoc` to generate typescript document in `./doc` directory.

#### Build (Production mode)

1. `ng build --prod` or `npm run build` and built bundles will be in `./dist` directory.

#### Firebase (AngularFire) Configuration

Configuration is a JSON object in property `firebase` of the environment file `src/environments/environment.ts`.

For CircleCI, set the following environment variables and run (let the CI run ) `npm run configure-env`. This will generate the environment ts file with the firebase config (retrieved from environment variables).

Environment variables:
`FIREBASE_WEB_CONFIG_STAGING` for staging environment (commits to `master` branch)
`FIREBASE_WEB_CONFIG_PROD` for production environment (commits to `release` branch)

Config is a JSON file in the following format. These can be retrieved in the firebase console.

**NOTE** that the property is different from the ones in the firebase console.

```json
{
  "api_key": "API_KEY",
  "auth_domain": "AUTH_DOMAIN",
  "database_url": "DATABASE_URL",
  "project_id": "PROJECT_ID",
  "storage_bucket": "STORAGE_BUCKET",
  "messaging_sender_id": "MSG_SENDER_ID"
}
```

#### Web App Manifest Configuration

Run `npm run configure-manifest` to set the `start_url` property in the manifest using environment variable `BASE_URL_PROD` or `BASE_URL_STAGING`

#### Fix `index.html` hash in service worker config

`npm run fix-sw-hash`

Re-generate the hash of `index.html` after application shell is generated, see this [issue](https://github.com/angular/angular-cli/issues/8794). The service worker config file is at `src/ngsw-config.json`.

#### Firebase Deployment

Install firebase command line tool.
`npm install -g firebase-tools`

Use `firebase login:ci` to get tokens for deployment. Configure environment variables `FIREBASE_TOKEN_STAGING` or `FIREBASE_TOKEN_PROD` in CircleCI to the token retrieved.
