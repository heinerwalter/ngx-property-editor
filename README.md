# ngx-property-editor

[![build](https://github.com/heinerwalter/ngx-property-editor/actions/workflows/build.yml/badge.svg)](https://github.com/heinerwalter/ngx-property-editor/actions/workflows/build.yml)
[![npm version](https://img.shields.io/npm/v/ngx-property-editor?logo=npm&logoColor=fff)](https://www.npmjs.com/package/ngx-property-editor)

This is an Angular library containing simple input components for different data types
(styled with bootstrap). Based on the input components this library provides a property
editor component which automatically builds a form for editing all properties of any
object passed to the property editor component. The property editor input fields can
be configured by passing an additional configuration object to the property editor
component.

## Demo

See [demo page](https://heinerwalter.github.io/ngx-property-editor/).

## Build from source

### Release: Build and publish library

Build library and publish it to npm:
```console
npm run build
npm run publish
```

### Development: Build and run demo application

Build library and watch for changes (process does not terminate):
```console
npm run watch
```

When the library has been built successfully
(output: `Compilation complete. Watching for file changes...`)
open a new terminal and run commands to build and start the demo application:
```console
# Link demo project to the built library:
npm run link:demo
# Build and start demo application and watch for changes:
npm run start:demo
```

When you change code either in the library project or in the demo application project,
the demo application is automatically updated.

## Installation

Add this library to your Angular CLI project by running the following command:

```console
ng add ngx-property-editor
```

It will install `ngx-property-editor` for the default application specified in your
`angular.json`. If you have multiple projects, and you want to target a specific
project, you could specify the `--project` option:

```console
ng add ngx-property-editor --project myProject
```

See more details on the installation process in the [README.md](projects/ngx-property-editor/README.md)
file inside the ngx-property-editor library subdirectory. There you will find information
on how to install the bootstrap styles on which this library dependes.
