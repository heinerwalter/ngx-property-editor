# ngx-property-editor

[![build](https://github.com/heinerwalter/ngx-property-editor/actions/workflows/build.yml/badge.svg)](https://github.com/heinerwalter/ngx-property-editor/actions/workflows/build.yml)
[![npm version](https://img.shields.io/npm/v/ngx-property-editor?logo=npm&logoColor=fff)](https://www.npmjs.com/package/ngx-property-editor)

This is an Angular library containing simple input components for different data types
(styled with bootstrap). Based on the input components this library provides a property
editor component which automatically builds a form for editing all properties of any
object passed to the property editor component. The property editor input fields can be
configured by passing an additional configuration object to the property editor component.

## Demo

Beside the library project this repository contains a demo application project
which demonstrates all library features.
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

### Install Bootstrap (dependency)

The `ngx-property-editor` package depends on the Angular bootstrap package
`@ng-bootstrap/ng-bootstrap`, so it must be added to your project. If you are already are using it, you can skip this
step.

See the full bootstrap installation instructions at
[ng-bootstrap.github.io](https://ng-bootstrap.github.io/#/getting-started). The following instructions are taken from
there.

We [that is the author of `ng-bootstrap`] strongly recommend using
[Angular CLI](https://cli.angular.io/) for setting up a new project. If you have an Angular CLI project, you could
simply use our schematics to add ng-bootstrap library to it.

Just run the following:

```console
ng add @ng-bootstrap/ng-bootstrap
```

It will install ng-bootstrap for the default application specified in your `angular.json`. If you have multiple projects
and you want to target a specific application, you could specify the `--project` option

```console
ng add @ng-bootstrap/ng-bootstrap --project myProject
```

### Install Font Awesome (dependency)

The `ngx-property-editor` package depends on the Angular Font Awesome package
`@fortawesome/angular-fontawesome`, so it must be added to your project. If you are already are using it, you can skip
this step.

Analogously to the bootstrap installation use the [Angular CLI](https://cli.angular.io/)
for adding Font Awesome to your project:

```console
ng add @fortawesome/angular-fontawesome
```

Or with multiple projects:

```console
ng add @fortawesome/angular-fontawesome --project myProject
```
