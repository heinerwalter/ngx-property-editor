import { Component, Input } from '@angular/core';
import { PEGlobalFunctions } from '../../../controller/pe-global-functions';
import { PropertyConfiguration } from '../property-configuration';
import { ViewAndEditContainerBaseComponent } from '../view-and-edit-container/view-and-edit-container-base.component';


export type ViewModeType = 'table' | 'editor' | 'custom';
export const ViewModeTypeDefault: ViewModeType = 'table';

export type EditModeType = 'editor' | 'custom';
export const EditModeTypeDefault: EditModeType = 'editor';


@Component({
  selector: 'pe-property-view-and-edit',
  templateUrl: './property-view-and-edit.component.html',
  styleUrls: ['./property-view-and-edit.component.scss'],
})
export class PropertyViewAndEditComponent extends ViewAndEditContainerBaseComponent {

  /** ID attribute of the container element. */
  @Input() public id: string = PEGlobalFunctions.generateRandomId();

  /**
   * Configuration of displayed properties including name, data type, displayed value etc.
   * If undefined, the configuration will be automatically generated from the properties
   * of the `data` object.
   */
  @Input() public configuration: PropertyConfiguration[] | undefined = undefined;

  /**
   * Display the properties of this object.
   */
  @Input() public data: any | undefined = undefined;

  /**
   * Choose how the properties are displayed in view mode:
   * - 'table':  Display properties in a `PropertyViewComponent` (table with one row per property).
   * - 'editor': Display same `PropertyEditorComponent` as in edit view but turn input fields to readonly.
   * - 'custom': Display a custom content passed as `<div content-view-custom>...</div>`.
   */
  @Input() public viewModeType: ViewModeType = ViewModeTypeDefault;

  /**
   * Choose how the properties are displayed in edit mode:
   * - 'editor': Display and edit properties in `PropertyEditorComponent`.
   * - 'custom': Display a custom content passed as `<div content-edit-custom>...</div>`.
   */
  @Input() public editModeType: EditModeType = EditModeTypeDefault;

}
