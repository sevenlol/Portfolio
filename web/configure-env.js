'use strict';

const fs = require('fs');

const FIREBASE_WEB_CONFIG_ENV = 'FIREBASE_WEB_CONFIG';
const DEFAULT_ENV = 'prod';
const IS_PRODUCTION = true;

if (!process.env[FIREBASE_WEB_CONFIG_ENV]) {
  throw new Error(`Firebase web config environment [${FIREBASE_WEB_CONFIG_ENV}] not found.`);
}

const envFilePath = `src/environments/environment.${DEFAULT_ENV}.ts`;
if (!fs.existsSync(envFilePath)) {
  const errMsg = `Environment file does not exist [${envFilePath}]`;
  throw new Error(errMsg);
}

const firebaseObj = JSON.parse(process.env[FIREBASE_WEB_CONFIG_ENV]);

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
