import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { PropertyTableColumn } from '../property-table-column';
import { PEGlobalFunctions } from '../../../controller/pe-global-functions';
import { MovableModalComponent, MovableModalPosition } from '../../modal/movable-modal/movable-modal.component';

@Component({
  selector: 'pe-table-column-chooser',
  templateUrl: './table-column-chooser.component.html',
  styleUrls: ['./table-column-chooser.component.scss'],
})
export class TableColumnChooserComponent implements OnInit, OnChanges {

  /** ID of the column chooser element. */
  @Input() public id: string = PEGlobalFunctions.generateRandomId();

  /**
   * If true, the column chooser is visible.
   * By default, it is invisible (false).
   */
  @Input() public isVisible: boolean = false;
  /**
   * This event is emitted when the column chooser visibility has changed.
   */
  @Output() public readonly isVisibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  /**
   * All columns of a `PropertyTableComponent` (visible and invisible)
   * including it´s property configurations and parent columns.
   */
  @Input() public columns: PropertyTableColumn[] = [];

  /**
   * This event is emitted when the visibility of one or multiple columns has changed.
   * All changed columns are passed as event argument.
   */
  @Output() public readonly visibleColumnsChanged: EventEmitter<PropertyTableColumn[]> = new EventEmitter<PropertyTableColumn[]>();

  /** Reference of the modal window component. */
  @ViewChild(MovableModalComponent, { static: true }) protected modalComponent?: MovableModalComponent;

  public constructor() {
  }

  public ngOnInit(): void {
    this.modalComponent?.toggleVisibility(this.isVisible);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('isVisible')) {
      this.modalComponent?.toggleVisibility(this.isVisible);
    }
  }

  /**
   * This method toggles the visibility of the column chooser modal window.
   * @param newValue If not `undefined`, the visibility of the modal window
   *                 is set to the given value instead of being toggled.
   * @param position Optional initial position of the top left corner of the modal window in pixel.
   * @returns The new visibility value.
   */
  public toggleVisibility(newValue: boolean | undefined = undefined,
                          position?: MovableModalPosition): boolean {
    if (!this.modalComponent) return false;

    const isVisible: boolean = this.modalComponent.toggleVisibility(newValue, position);
    if (this.isVisible == isVisible) return isVisible;

    this.isVisible = isVisible;
    this.isVisibleChange.emit(this.isVisible);

    return isVisible;
  }

  /**
   * The click event of a button for toggling the visibility of the column chooser
   * can be passed directly to this method.
   * @param event Button click event.
   * @returns The new visibility value.
   */
  public onToggleVisibilityButtonClick(event: MouseEvent): boolean {
    let position: MovableModalPosition | undefined = undefined;
    if (event?.target instanceof HTMLElement) {
      const rect = event.target.getBoundingClientRect();
      position = { x: rect.left, y: rect.bottom };
    } else if (event) {
      position = { x: event.clientX, y: event.clientY };
    }

    const isVisible: boolean = this.toggleVisibility(undefined, position);

    if (event?.target instanceof HTMLButtonElement) {
      event.target.classList.toggle('active', isVisible);
    }

    return isVisible;
  }

}
