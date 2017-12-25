'use strict';

const fs = require('fs');

// current environment, e.g., 'prod', 'staging'
const PORTFOLIO_ENV = 'PORTFOLIO_ENV';
const ANGULAR_ENV = 'prod';
const IS_PRODUCTION = true;
const ENV_MAP = {
  prod : 'FIREBASE_WEB_CONFIG_PROD',
  staging : 'FIREBASE_WEB_CONFIG_STAGING'
};

if (!process.env[PORTFOLIO_ENV]) {
  throw new Error(`Portfolio environment [${PORTFOLIO_ENV}] not found.`);
}

const currEnv = process.env[PORTFOLIO_ENV];
const firebaseEnv = ENV_MAP[currEnv];
if (!firebaseEnv) {
  const errMsg = `Invalid portfolio environment ${currEnv}.`;
  throw new Error(errMsg);
}
if (!process.env[firebaseEnv]) {
  const errMsg = `Firebase web config environment [${firebaseEnv}] not found.`;
  throw new Error(errMsg);
}

const envFilePath = `src/environments/environment.${ANGULAR_ENV}.ts`;
if (!fs.existsSync(envFilePath)) {
  const errMsg = `Environment file does not exist [${envFilePath}]`;
  throw new Error(errMsg);
}

const firebaseObj = JSON.parse(process.env[firebaseEnv]);

// generate environment file
const envFileStr = `
export const environment = {
  production: ${IS_PRODUCTION},
  firebase: {
    apiKey: '${firebaseObj.api_key}',
    authDomain: '${firebaseObj.auth_domain}',
    databaseURL: '${firebaseObj.database_url}',
    projectId: '${firebaseObj.project_id}',
    storageBucket: '${firebaseObj.storage_bucket}',
    messagingSenderId: '${firebaseObj.messaging_sender_id}'
  }
};
`;

fs.writeFileSync(envFilePath, envFileStr);

/* private functions */

function checkProperty(obj, propertyKey) {
  if (!obj || typeof obj !== 'object') {
    throw new Error('Invalid object.');
  }

  // check key
  if (!isNonEmptyStr(propertyKey)) {
    throw new Error('Property key should be a non-empty string');
  }
  // check value
  if (!isNonEmptyStr(obj[propertyKey])) {
    throw new Error('Property value should be a non-empty string');
  }
}

function isNonEmptyStr(str) {
  return str && typeof str === 'string';
}
