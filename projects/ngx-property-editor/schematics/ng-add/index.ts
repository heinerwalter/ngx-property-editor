import { Rule } from '@angular-devkit/schematics';
import { addRootImport } from '@schematics/angular/utility';
import { Schema } from './schema';

/**
 * Providing installation support for the ngx-property-editor library.
 * See Angular schematics documentation at: https://angular.io/guide/schematics-for-libraries
 */
export function ngAdd(options: Schema): Rule {
  // Add an import `PropertyEditorModule` from `ngx-property-editor` to the root of the user's project.
  return addRootImport(options.project, ({code, external}) =>
    code`${external('PropertyEditorModule', 'ngx-property-editor')}`);
}
