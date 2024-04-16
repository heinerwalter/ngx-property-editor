/**
 * Mode of any property view or property editor which displays
 * properties of a data object using property configurations.
 *
 * Available modes:
 * - 'view': View properties of a single data object.
 * - 'table': View properties of multiple data objects in a table.
 * - 'edit': Edit properties of a single data object.
 *
 * @see PropertyConfiguration
 */
export type PropertyEditorMode =
  'view' |
  'table' |
  'edit';
