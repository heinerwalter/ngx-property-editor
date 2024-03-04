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

Beside the library project this repository contains a demo application project which demonstrates all library features.
[Open demo page](https://heinerwalter.github.io/ngx-property-editor/).

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

## Build

For instructions on how to build the library and the demo application see [README_BUILD_AND_PUBLISH.md](README_BUILD_AND_PUBLISH.md).
