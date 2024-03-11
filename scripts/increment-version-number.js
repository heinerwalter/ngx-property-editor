const fs = require('fs');
const path = require('path');

/*
 * This node script file loads both `package.json` files (root and library).
 * Then it assigns the previous version of the ngx-property-editor library to
 * the `dependencies` section of the root `package.json` file and increments
 * the version of the ngx-property-editor library `package.json` file.
 */

const rootPackagePath = path.join(__dirname, '../package.json');
const libraryPackagePath = path.join(__dirname, '../projects/ngx-property-editor/package.json');

/**
 * Reads the JSON file at the given path and returns its content.
 * @param path JSON file path.
 * @returns Parsed file content as object.
 */
function readJsonFile(path) {
  const fileContentString = fs.readFileSync(path); // (path, {encoding: 'utf8'})
  return JSON.parse(fileContentString);
}

/**
 * Writes a JSON file to the given path with the given content.
 * @param path JSON file path.
 * @param fileContent File content as object.
 */
function writeJsonFile(path, fileContent) {
  fs.writeFileSync(path, JSON.stringify(fileContent, null, 2), {encoding: 'utf-8'});
}

/**
 * Reads the given `package.json` file, assigns the given version
 * and writes the modified file content back to the given path.
 * @param path Path to a `package.json` file.
 * @param version New version as string (e.g. "1.0.0"), or a function receiving the
                  old version string and returning the new version string.
 * @returns An object with the `oldVersion` and `newVersion` strings as properties.
 */
function assignVersion(path, version) {
  // Read content of package.json file
  const fileContent = readJsonFile(path);

  // Read old version string
  const oldVersion = fileContent.version || '0.0.0';
  // Get new version
  let newVersion;
  if (typeof version === 'function')
    newVersion = version(oldVersion) || '0.0.0';
  else
    newVersion = version || '0.0.0';
  // Assign new version
  fileContent.version = newVersion;
  
  // Write package.json file
  writeJsonFile(path, fileContent);

  return {
    oldVersion: oldVersion,
    newVersion: newVersion,
  };
}

/**
 * Reads the given `package.json` file, increments the patch version number
 * and writes the modified file content back to the given path.
 * @param path Path to a `package.json` file.
 * @returns An object with the `oldVersion` and `newVersion` strings as properties.
 */
function incrementVersion(path) {
  return assignVersion(path, (oldVersion) => {
    const versionArray = oldVersion.split('.');
    while (versionArray.length < 3) versionArray.push('0');
    // Increment patch version number
    versionArray[2] = (parseInt(versionArray[2]) + 1).toString();
    return versionArray.join('.');
  });
}

/**
 * Reads the given `package.json` file, assigns the given version to a
 * dependency and writes the modified file content back to the given path.
 * @param path Path to a `package.json` file.
 * @param dependency Name of a package in the `dependencies` section of the `package.json` file.
 * @param version New version as string (e.g. "1.0.0").
 */
function assignDependencyVersion(path, dependency, version) {
  // Read content of package.json file
  const fileContent = readJsonFile(path);

  // Assign version of package dependency
  fileContent.dependencies[dependency] = '^' + version;
  
  // Write package.json file
  writeJsonFile(path, fileContent);
}


// Increment version of the library package.json file
const versions = incrementVersion(libraryPackagePath);
// Assign old library version as dependency version
assignDependencyVersion(rootPackagePath, 'ngx-property-editor', versions.oldVersion);
