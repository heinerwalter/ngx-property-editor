import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ViewAndEditContainerMode } from './view-and-edit-container.component';

@Component({
    template: '',
})
export abstract class ViewAndEditContainerBaseComponent {

    /** Select initial view or edit mode. */
    @Input() mode: ViewAndEditContainerMode = 'view';
    /** Event is emitted when the view or edit mode changed. */
    @Output() readonly modeChange: EventEmitter<ViewAndEditContainerMode> = new EventEmitter<ViewAndEditContainerMode>();

    /**
     * Only in view mode:
     * If true, the edit button is displayed.
     */
    @Input() showEditButton: boolean = true;

    /**
     * Only in edit mode:
     * If true, the save button is displayed.
     */
    @Input() showSaveButton: boolean = true;
    /**
     * Only in edit mode:
     * If true, the delete button is displayed.
     */
    @Input() showDeleteButton: boolean = false;
    /**
     * Only in edit mode:
     * If true, the cancel button is displayed.
     */
    @Input() showCancelButton: boolean = true;

    @Input() editButtonText: string = 'Bearbeiten';
    @Input() saveButtonText: string = 'Speichern';
    @Input() deleteButtonText: string = 'Löschen';
    @Input() cancelButtonText: string = 'Abbrechen';  

    /**
     * If true, in view mode only the edit button (and the card header, if `displayAsCard`) is displayed.
     * In edit mode, the content is still displayed.
     */
    @Input() hideContentInViewMode: boolean = false;

    /**
     * Content is displayed if
     * - `mode == 'view'` and `hideContentInViewMode == false`.
     * - `mode == 'edit'`.
     */
    get showContent(): boolean {
        return this.mode != 'view' || !this.hideContentInViewMode;
    }

    @Input() displayAsCard: boolean = false;
    @Input() cardHeader: string | undefined = undefined;

    @Output() readonly editClick: EventEmitter<void> = new EventEmitter<void>();
    @Output() readonly saveClick: EventEmitter<void> = new EventEmitter<void>();
    @Output() readonly deleteClick: EventEmitter<void> = new EventEmitter<void>();
    @Output() readonly cancelClick: EventEmitter<void> = new EventEmitter<void>();

}
