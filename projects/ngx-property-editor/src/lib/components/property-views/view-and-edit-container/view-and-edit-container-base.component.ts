import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ViewAndEditContainerMode } from './view-and-edit-container.component';

@Component({
  template: '',
})
export abstract class ViewAndEditContainerBaseComponent {

  /** Select initial view or edit mode. */
  @Input() public mode: ViewAndEditContainerMode = 'view';
  /** Event is emitted when the view or edit mode changed. */
  @Output() public readonly modeChange: EventEmitter<ViewAndEditContainerMode> = new EventEmitter<ViewAndEditContainerMode>();

  /**
   * Only in view mode:
   * If true, the edit button is displayed.
   */
  @Input() public showEditButton: boolean = true;
  /**
   * Only in edit mode:
   * If true, the save button is displayed.
   */
  @Input() public showSaveButton: boolean = true;
  /**
   * Only in edit mode:
   * If true, the delete button is displayed.
   */
  @Input() public showDeleteButton: boolean = false;
  /**
   * Only in edit mode:
   * If true, the cancel button is displayed.
   */
  @Input() public showCancelButton: boolean = true;

  /**
   * Only in view mode and if `showEditButton` is true:
   * Text displayed on the edit button.
   */
  @Input() public editButtonText: string = 'Bearbeiten';
  /**
   * Only in edit mode and if `showSaveButton` is true:
   * Text displayed on the save button.
   */
  @Input() public saveButtonText: string = 'Speichern';
  /**
   * Only in edit mode and if `showDeleteButton` is true:
   * Text displayed on the delete button.
   */
  @Input() public deleteButtonText: string = 'Löschen';
  /**
   * Only in edit mode and if `showCancelButton` is true:
   * Text displayed on the cancel button.
   */
  @Input() public cancelButtonText: string = 'Abbrechen';

  /**
   * If true, in view mode only the edit button (and the card header, if `displayAsCard`) is displayed.
   * In edit mode, the content is still displayed.
   */
  @Input() public hideContentInViewMode: boolean = false;

  /**
   * Content is displayed if
   * - `mode == 'view'` and `hideContentInViewMode == false`.
   * - `mode == 'edit'`.
   */
  public get showContent(): boolean {
    return this.mode != 'view' || !this.hideContentInViewMode;
  }

  @Input() public displayAsCard: boolean = false;
  @Input() public cardHeader: string | undefined = undefined;

  @Output() public readonly editClick: EventEmitter<void> = new EventEmitter<void>();
  @Output() public readonly saveClick: EventEmitter<void> = new EventEmitter<void>();
  @Output() public readonly deleteClick: EventEmitter<void> = new EventEmitter<void>();
  @Output() public readonly cancelClick: EventEmitter<void> = new EventEmitter<void>();

}
