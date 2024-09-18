/**
 * View mode:
 * View properties of a single data object.
 * @see PropertyEditorMode
 */
export type PropertyEditorViewMode = 'view';

/**
 * Table mode:
 * View properties of multiple data objects in a table.
 * @see PropertyEditorMode
 */
export type PropertyEditorTableMode = 'table';

/**
 * Edit mode:
 * Edit properties of a single data object.
 * @see PropertyEditorMode
 */
export type PropertyEditorEditMode = 'edit';

/**
 * New mode (same view as edit mode):
 * Edit properties of a new data object.
 * @see PropertyEditorMode
 */
export type PropertyEditorNewMode = 'new';

/**
 * Mode of any property view or property editor which displays
 * properties of a data object using property configurations.
 *
 * Available modes:
 * - 'view': View properties of a single data object.
 * - 'table': View properties of multiple data objects in a table.
 * - 'edit': Edit properties of a single data object.
 * - 'new': Edit properties of a new data object (same view as 'edit').
 *
 * @see PropertyConfiguration
 */
export type PropertyEditorMode =
  PropertyEditorViewMode |
  PropertyEditorTableMode |
  PropertyEditorEditMode |
  PropertyEditorNewMode;
