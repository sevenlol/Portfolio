'use strict';

const fs = require('fs');

// current environment, e.g., 'prod', 'staging'
const PORTFOLIO_ENV = 'PORTFOLIO_ENV';
const ENV_MAP = {
  prod : 'BASE_URL_PROD',
  staging : 'BASE_URL_STAGING'
};
const MANIFEST_PATH = 'src/manifest.json';

if (!process.env[PORTFOLIO_ENV]) {
  throw new Error(`Portfolio environment [${PORTFOLIO_ENV}] not found.`);
}

const currEnv = process.env[PORTFOLIO_ENV];
const urlEnvName = ENV_MAP[currEnv];
if (!urlEnvName) {
  const errMsg = `Invalid portfolio environment ${currEnv}.`;
  throw new Error(errMsg);
}
if (!process.env[urlEnvName]) {
  const errMsg = `Base url environment variable [${urlEnvName}] not found.`;
  throw new Error(errMsg);
}

const BASE_URL = process.env[urlEnvName];

if (!fs.existsSync(MANIFEST_PATH)) {
  const errMsg = `Web app manifest file [${MANIFEST_PATH}] not found`;
  throw new Error(errMsg);
}

const manifestObj = JSON.parse(fs.readFileSync(MANIFEST_PATH).toString());

manifestObj.start_url = BASE_URL;

fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifestObj, null, 2) + '\n');

console.log(`Set web app manifest start_url to ${BASE_URL}`);
