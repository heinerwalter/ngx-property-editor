import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faCaretDown, faCaretLeft, faCaretRight, faCaretUp, IconDefinition } from '@fortawesome/free-solid-svg-icons';

/**
 * A handle with four arrow icons/buttons for moving something via arrows or via drag-and-drop.
 */
@Component({
  selector: 'pe-drag-drop-handle',
  templateUrl: './drag-drop-handle.component.html',
  styleUrl: './drag-drop-handle.component.scss',
})
export class DragDropHandleComponent {

  /**
   * If true, the `arrowClick` event is emitted when the user clicks one of the arrow icons.
   */
  @Input() allowArrowClick: boolean = true;

  /**
   * This event is emitted when one of the arrow icons was clicked by the user.
   * The arrow direction ('up', 'down', 'left', 'right') is passed as event argument.
   */
  @Output() arrowClick: EventEmitter<'up' | 'down' | 'left' | 'right'> = new EventEmitter<'up' | 'down' | 'left' | 'right'>();

  // Icons used in the template:
  protected iconCaretUp: IconDefinition = faCaretUp;
  protected iconCaretDown: IconDefinition = faCaretDown;
  protected iconCaretLeft: IconDefinition = faCaretLeft;
  protected iconCaretRight: IconDefinition = faCaretRight;

  /**
   * Called when one of the arrow icons was clicked by the user.
   * Emits the `arrowClick` event.
   * @param direction Arrow direction ('up', 'down', 'left', 'right').
   */
  protected onClick(direction: 'up' | 'down' | 'left' | 'right'): void {
    if (!this.allowArrowClick) return;
    this.arrowClick.emit(direction);
  }

}
