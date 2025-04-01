import { Component, ContentChildren, AfterContentInit, Input, QueryList, ViewEncapsulation, ElementRef, ViewChild } from '@angular/core';
import { TimelineAlign } from '../timeline-configuration';
import { TimelineItemComponent } from '../timeline-item/timeline-item.component';
import { delay, startWith } from 'rxjs';

@Component({
  selector: 'pe-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['../timeline.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TimelineComponent implements AfterContentInit {

  /**
   * Alignment of all timeline items.
   */
  @Input() public align: TimelineAlign = 'items-right';

  @ViewChild('timeline', { static: true }) protected elementRef?: ElementRef<HTMLDivElement>;

  /** Reference to all timeline item components in the timeline. */
  @ContentChildren(TimelineItemComponent) protected timelineItemRefs?: QueryList<TimelineItemComponent>;

  public constructor() {
  }

  public ngAfterContentInit(): void {
    this.timelineItemRefs!.changes
      .pipe(startWith(this.timelineItemRefs!.toArray()))
      .pipe(delay(0))
      .subscribe((items: TimelineItemComponent[]) => {
        this.updateAutoAlign(items);
      });
  }

  public updateAutoAlign(items: TimelineItemComponent[] | undefined = undefined): void {
    if (!items) items = this.timelineItemRefs?.toArray();
    if (!items?.length) return;

    if (this.align != 'items-both') {
      for (const item of items) {
        item.marginTop = 0;
      }
      return;
    }

    const margin: number = 16; // px
    const minHeight: number = 47; // px

    let firstItem: boolean = true;
    let nextTopLeft: number = -999999; // px
    let nextTopRight: number = -999999; // px

    for (const item of items) {
      let freeMargin: number = item.height - minHeight;
      if (freeMargin < 0) freeMargin = 0;

      let placementLeft: boolean = item.align != 'right';
      if (item.align != 'left' && item.align != 'right') {
        placementLeft = nextTopLeft <= nextTopRight;
        item.autoAlign = placementLeft ? 'left' : 'right';
      }

      if (placementLeft) {
        if (firstItem) {
          nextTopLeft = item.top;
          item.marginTop = 0;
        } else {
          item.marginTop = nextTopLeft - item.top + item.marginTop;
        }
        nextTopRight = Math.max(nextTopRight, nextTopLeft + minHeight);
        nextTopLeft = Math.max(nextTopLeft, nextTopLeft + item.height + margin);
      } else {
        if (firstItem) {
          nextTopRight = item.top;
          item.marginTop = 0;
        } else {
          item.marginTop = nextTopRight - item.top + item.marginTop;
        }
        nextTopLeft = Math.max(nextTopLeft, nextTopRight + minHeight);
        nextTopRight = Math.max(nextTopRight, nextTopRight + item.height + margin);
      }

      firstItem = false;
    }
  }

}
