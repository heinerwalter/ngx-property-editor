import { Component, Input } from '@angular/core';
import { TimelineItem } from '../timeline-configuration';

@Component({
  selector: 'pe-timeline-item',
  templateUrl: './timeline-item.component.html',
  styleUrls: [],
})
export class TimelineItemComponent {

  /**
   * Definition of the timeline item.
   */
  @Input() public item: TimelineItem | undefined = undefined;

}
