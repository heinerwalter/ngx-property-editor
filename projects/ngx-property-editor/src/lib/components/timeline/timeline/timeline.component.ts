import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Timeline, TimelineAlign, TimelineItemAlign } from '../timeline-configuration';

@Component({
  selector: 'pe-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['../timeline.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TimelineComponent {

  /**
   * Definition of the timeline.
   */
  @Input() public timeline: Timeline = [];

  /**
   * Alignment of all timeline items.
   */
  @Input() public align: TimelineAlign = 'items-right';

}
