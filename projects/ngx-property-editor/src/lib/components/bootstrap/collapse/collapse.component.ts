import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PEGlobalFunctions } from '../../../controller/pe-global-functions';
import { ItemDefinition } from '../item-views/item-view-item-base.component';
import { LocalStorageController } from '../../../controller/local-storage-controller';

/**
 * A box which is collapsed by default (only the header is visible)
 * and which can be extended by click on the header.
 */
@Component({
  selector: 'pe-collapse',
  templateUrl: './collapse.component.html',
  styleUrls: ['./collapse.component.scss'],
})
export class CollapseComponent implements OnInit {

  /**
   * You must define different IDs, if there are more than one instance
   * of this type of component on the same page.
   */
  @Input() public id: string | undefined = undefined;
  /** This random ID is used instead of the `id`, if the `id` is not defined. */
  private readonly defaultId: string = PEGlobalFunctions.generateRandomId();

  /** Returns either the `id` (if not empty) or the `defaultId`. */
  protected get _id(): string {
    return this.id ? this.id : this.defaultId;
  }

  /**
   * By default, the last collapsed state is saved in the `localStorage`
   * and reactivated at the next page load (requires `id`).
   * If this property is set to true, the last state is not saved.
   */
  @Input() public disableSaveLastIsCollapsed: boolean = false;

  /** A text displayed in the header. */
  @Input() public label: string = '';

  /** If true (default), this component is collapsed (initially). */
  @Input() public isCollapsed: boolean = true;
  /**
   * This event is emitted, when the collapsed state has changed.
   * The new `isCollapsed` state is passed as event argument.
   */
  @Output() public readonly isCollapsedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  public ngOnInit(): void {
    // If possible, load the last isCollapsed state from local storage.
    // This is only done once after all properties (especially disableSaveLastIsCollapsed and id) are initialized.
    if (!this.disableSaveLastIsCollapsed && this.id) {
      const isCollapsed: boolean | undefined = LocalStorageController.getBoolean(LocalStorageController.KeyPrefix.CollapseComponent_IsCollapsed, this.id);
      if (isCollapsed != undefined) {
        this.isCollapsed = isCollapsed;
      }
    }
  }

  /**
   * The first call of `onAccordionCurrentItemChange` must be ignored,
   * because the first and only item is selected initially without being expanded
   */
  private firstItemChange: boolean = true;

  /**
   * This function is called when an item of the underlying accordion component has been expanded or collapsed.
   * @param item The item.
   */
  protected onAccordionCurrentItemChange(item: ItemDefinition): void {
    if (this.firstItemChange) {
      this.firstItemChange = false;
      return;
    }

    this.isCollapsed = !this.isCollapsed;
    this.isCollapsedChange.emit(this.isCollapsed);

    if (!this.disableSaveLastIsCollapsed && this.id && this.isCollapsed != undefined) {
      LocalStorageController.setBoolean(LocalStorageController.KeyPrefix.CollapseComponent_IsCollapsed, this.id, this.isCollapsed);
    }
  }

}
