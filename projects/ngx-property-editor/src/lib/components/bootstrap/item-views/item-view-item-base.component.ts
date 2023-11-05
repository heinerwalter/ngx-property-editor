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
   * If true, this item is displayed with a valid icon.
   * If false, this item is displayed with an invalid icon.
   * If 'indeterminate', this item is displayed with a indeterminate icon
   * If undefined, no validity icon is displayed.
   */
  isValid?: boolean | 'indeterminate' | undefined;

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
  @Input() public order: number = 0;
  /** Label of the button selecting this item. */
  @Input() public label: string = '';
  /** Reference to the item content template. */
  @ViewChild('itemContentTemplate') public contentTemplate?: TemplateRef<any>;
  /** If no `contentTemplate` is defined, the item button can be displayed as link to this destination. */
  @Input() public routerLink: any[] | string | undefined = undefined;

  /**
   * If true, this item is displayed with a valid icon.
   * If false, this item is displayed with an invalid icon.
   * If 'indeterminate', this item is displayed with a indeterminate icon
   * If undefined, no validity icon is displayed.
   */
  @Input() public isValid: boolean | 'indeterminate' | undefined = undefined;

  protected constructor(protected itemViewComponentRef: ItemViewBaseComponent) {
  }

  public ngOnInit(): void {
    // Register at surrounding item view component
    this.itemViewComponentRef.registerItemComponent(this);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    // An item property changed => notify surrounding item view that it must update its items
    this.itemViewComponentRef.updateItems();
  }

  public ngAfterViewInit(): void {
    // Now the contentTemplate should be available => notify surrounding item view that it must update its items
    this.itemViewComponentRef.updateItems();
  }

  public ngOnDestroy(): void {
    // Unregister at surrounding item view component
    this.itemViewComponentRef.unregisterItemComponent(this);
  }

}
