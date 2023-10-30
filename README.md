# ngx-property-editor

This is an Angular library containing simple input components for different data types
(styled with bootstrap). Based on the input components this library provides a property
editor component which automatically builds a form for editing all properties of any
object passed to the property editor component. The property editor input fields can
be configured by passing an additional configuration object to the property editor
component.


## Installation

The `ngx-property-editor` package uses bootstrap style classes. For them to work, the
bootstrap package must be installed in your project and its styles must be added. If
you are already using bootstrap in your project this should be already done and working.

This library only requires the bootstrap CSS styles. Thus it would be enough to install
the npm package `bootstrap` and register its styles. Alternatively you can install the
Angular package `ng-bootstrap` which automatically handles all registration and adds
some Angular components, too.

The following bootstrap installation instructions are taken from
[ng-bootstrap.github.io](https://ng-bootstrap.github.io/#/getting-started).

### Option 1: Install `ng-bootstrap`

We [that is the author of `ng-bootstrap`] strongly recommend using [Angular CLI](https://cli.angular.io/) for setting up a new project. If you have an Angular CLI project, you could simply use our schematics to add ng-bootstrap library to it.

Just run the following:
```
ng add @ng-bootstrap/ng-bootstrap
```

It will install ng-bootstrap for the default application specified in your `angular.json`. If you have multiple projects and you want to target a specific application, you could specify the `--project` option
```
ng add @ng-bootstrap/ng-bootstrap --project myProject
```

### Option 2: Install `bootstrap`

Only if you have not installed option 1!

Install the `bootstrap` package from npm:
```
npm install --save bootstrap
```

Not add Bootstrap CSS or SCSS to your project.

In case you're using CSS, you just need to add Bootstrap styles to your `angular.json`
configuration:
```
"yourApp": {
  "architect": {
    "build": {
      "options": {
        "styles": [
          "node_modules/bootstrap/dist/css/bootstrap.min.css"
        ]
      }
    }
  }
}
```

In case you're using SCSS, please add this to your `styles.scss` directly:
```
@import "bootstrap/scss/bootstrap";
/*
or import only the bootstrap scss files that your application actually needs,
as described in the Bootstrap customization guide:
https://getbootstrap.com/docs/5.2/customize/sass/#importing
*/
```
