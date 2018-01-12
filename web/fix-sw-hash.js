'use strict';

/**
 * Fix service worker config JSON hash
 * https://github.com/angular/angular-cli/issues/8794
 */

const fs = require('fs');
const crypto = require('crypto');

const SHA1 = 'sha1';
const HEX = 'hex';
const SW_CONFIG_PATH = 'dist/ngsw.json';
const FILE_PATH = 'dist/index.html';
const FILE_KEY = '/index.html';

if (!fs.existsSync(FILE_PATH)) {
  const errMsg = `File [${FILE_PATH}] does not exist`;
  throw new Error(errMsg);
}
if (!fs.existsSync(SW_CONFIG_PATH)) {
  const errMsg = `Service worker config file [${SW_CONFIG_PATH}] does not exist`;
  throw new Error(errMsg);
}

const sha1 = crypto.createHash(SHA1);

const content = fs.readFileSync(FILE_PATH);

sha1.update(content);

const sha1Str = sha1.digest(HEX);

console.log(sha1Str);

const configObj = JSON.parse(fs.readFileSync(SW_CONFIG_PATH).toString());

configObj.hashTable[FILE_KEY] = sha1Str;

fs.writeFileSync(SW_CONFIG_PATH, JSON.stringify(configObj, null, 2));

console.log(JSON.stringify(configObj, null, 2));
