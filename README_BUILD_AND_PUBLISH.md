# Build ngx-property-editor

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.0.

## Build

Run `npm run build` from the repository root to build the library project including the schematics. The build artifacts will be stored in the `dist/ngx-property-editor/` directory.

## Publishing

After building your library run `npm run publish` to publish a new version of the library to NPM. You need to be logged in to NPM before by running `npm adduser` (needs to be done only once).

## Running unit tests

Run `npm run test` or `npm run test-headless` to execute the unit tests of the library project via [Karma](https://karma-runner.github.io).

The script `npm run test` opens a browser window to display the test results and continuously re-runs the tests after the code has changed.

The script `npm run test-headless` only writes the test results to the console and terminates with success or error after all tests were completed once. The headless version is especially suitable for automated testing.

## Build and run demo application

Beside the library project this repository contains a demo application project which demonstrates all library features in a simple Angular web site.

### Build demo application only

Run `npm run build:demo` from the repository root to build the demo application.

Run `npm run start:demo` to build the demo application and start a web server providing the demo application at `http://localhost:4200` (see `ng serve`). This script does not terminate but re-builds the demo application after the demo application code has changed (not the library code!).

### For development: Build demo application and library linked

You also can link the demo project to the library project artifacts before building, so that the demo application builds against the local library version instead of the latest published version. Run `npm run link:demo` to link the demo application project to the library project.

After linking you can build the library project with `npm run watch` to continually watch for code changes and update the build artifacts.
After that script successfully built the library for the first time (output: `"Compilation complete. Watching for file changes..."`),
open a new terminal window and run `npm run start:demo` to build and start the demo application and watch for code changes (this time including the library project artifacts).
The full demo application start process for development looks like:
```console
# Link demo project to library project:
npm run link:demo
# Build library and watch for changes:
npm run watch

# Open a second terminal window and wait for complete library build.
# Build and start demo application and watch for changes:
npm run start:demo
```

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
