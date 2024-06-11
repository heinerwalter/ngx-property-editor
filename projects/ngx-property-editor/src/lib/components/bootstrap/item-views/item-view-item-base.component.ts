import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ItemViewBaseComponent } from './item-view-base.component';
import { ValidityIconType } from '../../icon/validity-icon/validity-icon.component';


/**
 * Type of the `items` property of the `ItemViewBaseComponent`.
 */
export type ItemDefinition = {
  /** If true, this item is not displayed. */
  hidden?: boolean,

  /** Order of the items. */
  order?: number | undefined,
  /** Label of the button selecting this item. */
  label: string,
  /** Reference to the item content template. */
  contentTemplate?: TemplateRef<any>,
  /** If no `contentTemplate` is defined, the item button can be displayed as link to this destination. */
  routerLink?: any[] | string,

  /**
   * If not undefined, a validity icon with this type is displayed on the item.
   * @see ValidityIconType
   */
  validity?: ValidityIconType | undefined;

};

@Component({
  template: '',
})
export abstract class ItemViewItemBaseComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy, ItemDefinition {

  /**
   * The Angular template which must be used by all implementations of this class.
   */
  public static readonly template: string = '<ng-template #itemContentTemplate><ng-content></ng-content></ng-template>';

  /** If true, this item is not displayed. */
  @Input() public hidden: boolean = false;

  /** Order of the items. */
  @Input() public order: number | undefined = undefined;
  /** Label of the button selecting this item. */
  @Input() public label: string = '';
  /** Reference to the item content template. */
  @ViewChild('itemContentTemplate') public contentTemplate?: TemplateRef<any>;
  /** If no `contentTemplate` is defined, the item button can be displayed as link to this destination. */
  @Input() public routerLink: any[] | string | undefined = undefined;

  /**
   * If not undefined, a validity icon with this type is displayed on the item.
   * @see ValidityIconType
   */
  @Input() public validity: ValidityIconType | undefined = undefined;

  /**
   * This property is set to true after this item has been registered at the surrounding item view component.
   * It is reset to false after this item has been unregistered from the surrounding item view component again.
   * @see ngOnInit
   * @see ngOnDestroy
   */
  private isRegistered: boolean = false;

  protected constructor(protected itemViewComponentRef: ItemViewBaseComponent) {
  }

  public ngOnInit(): void {
    // Register at surrounding item view component
    this.itemViewComponentRef.registerItemComponent(this);
    this.isRegistered = true;
  }

  public ngOnChanges(changes: SimpleChanges): void {
    // An item property changed => notify surrounding item view that it must update its items.
    // Update is only necessary, if this item is registered at the surrounding item view.
    if (this.isRegistered) {
      this.itemViewComponentRef.updateItems();
    }
  }

  public ngAfterViewInit(): void {
    // Now the contentTemplate should be available => notify surrounding item view that it must update its items.
    // Update is only necessary, if this item is registered at the surrounding item view.
    if (this.isRegistered) {
      this.itemViewComponentRef.updateItems();
    }
  }

  public ngOnDestroy(): void {
    // Unregister at surrounding item view component
    this.isRegistered = false;
    this.itemViewComponentRef.unregisterItemComponent(this);
  }

}
