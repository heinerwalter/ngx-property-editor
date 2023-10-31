import { Component, Input } from '@angular/core';
import { PropertiesConfiguration } from '../property-configuration';
import { ViewAndEditContainerBaseComponent } from '../view-and-edit-container/view-and-edit-container-base.component';


export type ViewModeType = 'table' | 'editor' | 'custom';
export const ViewModeTypeDefault: ViewModeType = 'table';

export type EditModeType = 'editor' | 'custom';
export const EditModeTypeDefault: EditModeType = 'editor';


@Component({
    selector: 'app-property-view-and-edit',
    templateUrl: './property-view-and-edit.component.html',
    styleUrls: ['./property-view-and-edit.component.scss'],
})
export class PropertyViewAndEditComponent extends ViewAndEditContainerBaseComponent {

    /** ID attribute of the container element. */
    @Input() id: string | undefined = undefined;

    /**
     * Configuration of displayed properties including name, data type, displayed value etc.
     */
    @Input() configuration: PropertiesConfiguration = [];

    /**
     * Display the properties of this object.
     */
    @Input() data: any | undefined = undefined;

    /**
     * Choose how the properties are displayed in view mode:
     * - 'table':  Display properties in a `PropertyTableComponent` (one row per property).
     * - 'editor': Display same `PropertyEditorComponent` as in edit view but turn input fields to readonly.
     * - 'custom': Display a custom content passed as `<div content-view-custom>...</div>`.
     */
    @Input() viewModeType: ViewModeType = ViewModeTypeDefault;

    /**
     * Choose how the properties are displayed in edit mode:
     * - 'editor': Display and edit properties in `PropertyEditorComponent`.
     * - 'custom': Display a custom content passed as `<div content-edit-custom>...</div>`.
     */
    @Input() editModeType: EditModeType = EditModeTypeDefault;

}
