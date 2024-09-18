import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PropertyEditorMode } from '../property-editor-mode';
import { faBan, faFloppyDisk, faPen, faPlus, faTrash, IconDefinition } from '@fortawesome/free-solid-svg-icons';


@Component({
  template: '',
})
export abstract class ViewAndEditContainerBaseComponent {

  // region Mode

  /** Select initial editor mode. */
  @Input() public mode: PropertyEditorMode = 'view';
  /** Event is emitted when the editor mode changed. */
  @Output() public readonly modeChange: EventEmitter<PropertyEditorMode> = new EventEmitter<PropertyEditorMode>();

  // endregion

  // region Buttons

  /**
   * Only in view mode:
   * If true, the edit button is displayed.
   */
  @Input() public showEditButton: boolean = true;
  /**
   * Only in view mode:
   * If true, the new button is displayed.
   */
  @Input() public showNewButton: boolean = false;
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
   * Only in view mode and if `showNewButton` is true:
   * Text displayed on the new button.
   */
  @Input() public newButtonText: string = 'Neu';
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

  /** Icon of the edit button. */
  protected readonly editButtonIcon: IconDefinition = faPen;
  /** Icon of the new button. */
  protected readonly newButtonIcon: IconDefinition = faPlus;
  /** Icon of the save button. */
  protected readonly saveButtonIcon: IconDefinition = faFloppyDisk;
  /** Icon of the delete button. */
  protected readonly deleteButtonIcon: IconDefinition = faTrash;
  /** Icon of the cancel button. */
  protected readonly cancelButtonIcon: IconDefinition = faBan;

  /** This event is invoked, when the edit button was clicked. */
  @Output() public readonly editClick: EventEmitter<void> = new EventEmitter<void>();
  /** This event is invoked, when the new button was clicked. */
  @Output() public readonly newClick: EventEmitter<void> = new EventEmitter<void>();
  /** This event is invoked, when the save button was clicked. */
  @Output() public readonly saveClick: EventEmitter<void> = new EventEmitter<void>();
  /** This event is invoked, when the delete button was clicked. */
  @Output() public readonly deleteClick: EventEmitter<void> = new EventEmitter<void>();
  /** This event is invoked, when the cancel button was clicked. */
  @Output() public readonly cancelClick: EventEmitter<void> = new EventEmitter<void>();

  // endregion

  /**
   * If true, in view mode only the edit button (and the card header, if `displayAsCard`) is displayed.
   * In edit mode, the content is still displayed.
   */
  @Input() public hideContentInViewMode: boolean = false;

  /**
   * Content is displayed if
   * - `mode == 'view'` and `hideContentInViewMode == false`.
   * - `mode == 'edit'`.
   * - `mode == 'new'`.
   */
  protected get showContent(): boolean {
    return (this.mode == 'view' && !this.hideContentInViewMode) ||
      this.mode == 'edit' ||
      this.mode == 'new';
  }

  /** If true, this container is displayed as bootstrap card. */
  @Input() public displayAsCard: boolean = false;
  /**
   * Only if `displayAsCard` is true:
   * Text in the card header.
   */
  @Input() public cardHeader: string | undefined = undefined;

  // region Functions to change the mode

  /**
   * Changes the current `mode` and emits its new value to the `modeChange` event.
   */
  protected setMode(mode: PropertyEditorMode): void {
    this.mode = mode;
    this.modeChange.emit(mode);
  }

  /**
   * This function is called, when the edit button was clicked.
   * Emits the `editClick` event and activates edit mode.
   */
  protected async onEditButtonClicked(): Promise<void> {
    this.editClick.emit();
    this.setMode('edit');
  }

  /**
   * This function is called, when the new button was clicked.
   * Emits the `newClick` event and activates edit mode.
   */
  protected async onNewButtonClicked(): Promise<void> {
    this.newClick.emit();
    this.setMode('edit');
  }

  /**
   * This function is called, when the save button was clicked.
   * Emits the `saveClick` event and activates view mode.
   */
  protected async onSaveButtonClicked(): Promise<void> {
    this.saveClick.emit();
    this.setMode('view');
  }

  /**
   * This function is called, when the delete button was clicked.
   * Emits the `deleteClick` event and activates view mode.
   */
  protected async onDeleteButtonClicked(): Promise<void> {
    this.deleteClick.emit();
    this.setMode('view');
  }

  /**
   * This function is called, when the cancel button was clicked.
   * Emits the `cancelClick` event and activates view mode.
   */
  protected async onCancelButtonClicked(): Promise<void> {
    this.cancelClick.emit();
    this.setMode('view');
  }

  // endregion

}
