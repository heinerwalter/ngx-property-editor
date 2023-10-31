const fs = require('fs');
const path = require('path');


/*
 * Angular needs a base URL to be defined in the HTML header like <base href="/">
 * so that assets can be loaded correctly even if the user enters a virtual path
 * after the base URL. Usually the base URL is "/". But if the base URL of a
 * deployed website is located in a subdirectory, it must be changed.
 *
 * This node script file can receive a base URL from the command line and write
 * it into the file index.html. Run this node script like:
 * ```
 * node projects/demo/scripts/changeBaseUrl.js "/subdirectory/"
 * ```
 * Important: Don't forget the '/' at the end!
 */


// Get baseUrl from first command line argument:
let baseUrl = '/';
if (process.argv?.length > 2) {
  baseUrl = process.argv[2] || '/';
}

// Get path of file index.html
const filePath = path.join(__dirname, '../src/index.html');
// Read file index.html
let fileContent = fs.readFileSync(filePath, {encoding: 'utf8'});

// Replace base URL in file content
fileContent = fileContent.replace(/<base href="[^"]*">/, `<base href="${baseUrl}">`)
// Write file content
fs.writeFileSync(filePath, fileContent, {encoding: 'utf-8'});
