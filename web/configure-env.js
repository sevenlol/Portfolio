'use strict';

const fs = require('fs');

// current environment, e.g., 'prod', 'staging'
const PORTFOLIO_ENV = 'PORTFOLIO_ENV';
const ENV_FILE_PATH = {
  PRODUCTION : 'src/environments/environment.prod.ts',
  DEV : 'src/environments/environment.ts'
};
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

// check environment file
checkEnvFile(ENV_FILE_PATH.DEV);
checkEnvFile(ENV_FILE_PATH.PRODUCTION);

const firebaseObj = JSON.parse(process.env[firebaseEnv]);

// generate environment file string
const devEnvFile = getEnvFileStr(false, firebaseObj);
const prodEnvFile = getEnvFileStr(true, firebaseObj);

fs.writeFileSync(ENV_FILE_PATH.DEV, devEnvFile);
fs.writeFileSync(ENV_FILE_PATH.PRODUCTION, prodEnvFile);

/* private functions */

function checkEnvFile(path) {
  if (!fs.existsSync(path)) {
    const errMsg = `Environment file does not exist [${path}]`;
    throw new Error(errMsg);
  }
}

function getEnvFileStr(isProduction, firebaseObj) {
  return `export const environment = {
  production: ${isProduction},
  firebase: {
    apiKey: '${firebaseObj.api_key}',
    authDomain: '${firebaseObj.auth_domain}',
    databaseURL: '${firebaseObj.database_url}',
    projectId: '${firebaseObj.project_id}',
    storageBucket: '${firebaseObj.storage_bucket}',
    messagingSenderId: '${firebaseObj.messaging_sender_id}'
  }
};`;
}

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
