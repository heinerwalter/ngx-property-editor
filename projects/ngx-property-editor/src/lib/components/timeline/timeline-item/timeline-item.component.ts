import { Component, Input } from '@angular/core';
import { TimelineItem, TimelineItemType, TimelineAlign } from '../timeline-configuration';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'pe-timeline-item',
  templateUrl: './timeline-item.component.html',
  styleUrls: [],
})
export class TimelineItemComponent implements TimelineItem {

  /**
   * Modify the timeline item appearance by changing the item type.
   * @see TimelineItemType
   */
  @Input() public type: TimelineItemType | undefined = undefined;

  /**
   * Optional date displayed above the title.
   */
  @Input() public date: Date | string | undefined = undefined;

  /** Returns true, if the `date` is a `Date` instance. */
  protected get dateIsDateInstance(): boolean {
    return this.date instanceof Date;
  }

  /** Returns the `date` as `Date` instance or undefined. */
  protected get dateAsDateInstance(): Date | undefined {
    if (this.date instanceof Date)
      return this.date;
    return undefined;
  }

  /**
   * Title of the timeline item.
   */
  @Input() public title: string | undefined = undefined;

  /**
   * Longer description text of the timeline item.
   * If undefined or empty, the <ng-content> of this component is used either.
   */
  @Input() public text: string | undefined = undefined;

  /**
   * Optional FontAwesome icon in the timeline icon circle.
   */
  @Input() public icon: IconDefinition | undefined = undefined;

  /**
   * Alignment of the timeline item. Automatic alignment, if undefined.
   */
  @Input() public align: TimelineAlign | undefined = undefined;

  public constructor() {
  }

}
