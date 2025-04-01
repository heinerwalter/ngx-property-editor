import { Component, ContentChildren, Input, QueryList, ViewEncapsulation } from '@angular/core';
import { TimelineAlign } from '../timeline-configuration';
import { TimelineItemComponent } from '../timeline-item/timeline-item.component';

@Component({
  selector: 'pe-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['../timeline.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TimelineComponent {

  /**
   * Alignment of all timeline items.
   */
  @Input() public align: TimelineAlign = 'items-right';

  /** Reference to all timeline item components in the timeline. */
  @ContentChildren(TimelineItemComponent) protected timelineItemRefs?: QueryList<TimelineItemComponent>;

  protected get test(): string {
    return this.timelineItemRefs ? this.timelineItemRefs.map((item) => item.title).join(', ') : '';
  }

  public constructor() {
  }

}
