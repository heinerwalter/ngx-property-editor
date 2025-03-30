import { Type } from '@angular/core';
import { TimelineComponent } from './timeline/timeline.component';
import { TimelineItemComponent } from './timeline-item/timeline-item.component';

export const timelineComponents: Array<Type<any> | any[]> = [
  TimelineComponent,
  TimelineItemComponent,
];
