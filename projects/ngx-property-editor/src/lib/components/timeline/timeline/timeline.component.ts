import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Timeline } from '../timeline-configuration';

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

}
