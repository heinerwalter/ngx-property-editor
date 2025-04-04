import { AfterContentChecked, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild, Optional } from '@angular/core';
import { TimelineItem, TimelineItemType, TimelineItemAlign } from '../timeline-configuration';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { TimelineComponent } from '../timeline/timeline.component';

@Component({
  selector: 'pe-timeline-item',
  templateUrl: './timeline-item.component.html',
  styleUrls: [],
})
export class TimelineItemComponent implements TimelineItem, OnChanges, AfterContentChecked {

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
  @Input() public align: TimelineItemAlign | undefined = undefined;

  public autoAlign: 'left' | 'right' = 'left';

  /** Reference to the `.timeline-item` HTML element. */
  @ViewChild('timelineItem', { static: true }) protected elementRef?: ElementRef<HTMLDivElement>;

  public constructor(
    /**
     * Reference to the surrounding timeline component.
     * This reference is used to update the automatic alignment upon changes on the timeline item.
     */
    @Optional() private timelineRef?: TimelineComponent) {
  }

  public ngAfterContentChecked(): void {
    this.timelineRef?.updateAutoAlign();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this.timelineRef?.updateAutoAlign();
  }

  /**
   * Returns the position and size of this components HTML element.
   */
  public rect(): DOMRect {
    return this.elementRef?.nativeElement?.getBoundingClientRect() ?? new DOMRect();
  }

  /**
   * Returns the top position of this components HTML element in pixel.
   */
  public get top(): number {
    return this.rect().top;
  }

  /**
   * Returns the bottom position of this components HTML element in pixel.
   */
  public get bottom(): number {
    return this.rect().bottom;
  }

  /**
   * Returns the height of this components HTML element in pixel.
   */
  public get height(): number {
    return this.rect().height;
  }

  /**
   * Returns the value of the CSS variable margin-top in pixel.
   */
  public get marginTop(): number {
    if (!this.elementRef) return 0;
    let length = this.elementRef?.nativeElement.style.marginTop;
    if (!length) return 0;
    length = length.replace('px', '');
    return parseInt(length) || 0;
  }

  /**
   * Assigns the given length in pixel to the CSS variable margin-top.
   */
  public set marginTop(length: number) {
    if (!this.elementRef) return;
    this.elementRef.nativeElement.style.marginTop = length + 'px';
  }

}
