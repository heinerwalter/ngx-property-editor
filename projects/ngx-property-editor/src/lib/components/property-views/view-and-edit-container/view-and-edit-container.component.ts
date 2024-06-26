import { Component } from '@angular/core';
import { ViewAndEditContainerBaseComponent } from './view-and-edit-container-base.component';

/**
 * This component displays an edit/save/cancel button in the top right corner for switching the edit mode and
 * below the content passed to the component depending on the current edit mode.
 * - The <div content-view> is only displayed in view mode
 * - The <div content-edit> is only displayed in edit mode.
 * - The <div content-both> is displayed in both modes.
 * @example
 * <pe-view-and-edit-container (saveClick)="..."
 *                             (cancelClick)="...">
 *   <div content-view>
 *     <!-- displayed in view mode -->
 *   </div>
 *   <div content-edit>
 *     <!-- displayed in edit mode -->
 *   </div>
 *   <div content-both>
 *     <!-- displayed in both view and edit mode -->
 *   </div>
 * </pe-view-and-edit-container>
 */
@Component({
  selector: 'pe-view-and-edit-container',
  templateUrl: './view-and-edit-container.component.html',
  styleUrls: ['./view-and-edit-container.component.scss'],
})
export class ViewAndEditContainerComponent extends ViewAndEditContainerBaseComponent {

}
