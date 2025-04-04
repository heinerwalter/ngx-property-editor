import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

/**
 * Definition of a whole timeline with all of its items.
 */
export type Timeline = TimelineItem[];

/**
 * Modify the timeline item appearance by changing the item type:
 * - undefined or 'default': Normal timeline item with border and mark on the timeline.
 * - 'box': Item with border and normal timeline item content but without mark on the timeline.
 * - 'header': Timeline header without border and without mark on the timeline.
 */
export type TimelineItemType = 'default' | 'box' | 'header';

/**
 * Definition of a timeline item.
 */
export type TimelineItem = {
  /** Modify the timeline item appearance by changing the item type. */
  type?: TimelineItemType;
  /** Optional date displayed above the title. */
  date?: Date | string;
  /** Title of the timeline item. */
  title?: string;
  /** Longer description text of the timeline item. */
  text?: string;
  /** Optional FontAwesome icon in the timeline icon circle. */
  icon?: IconDefinition;
  /** Alignment of the timeline item. Automatic alignment, if undefined. */
  align?: TimelineItemAlign;
};

/**
 * Possible timeline alignment values.
 * Can timeline items be displayed left and/or right of the timeline?
 * - 'left': The timeline is located at the left container border. Timeline items are located at the right.
 * - 'center': The timeline is located at the center. Timeline items can be located at the left and right.
 *             The item align can be chosen using `TimelineItemAlign`.
 * - 'right': The timeline is located at the right container border. Timeline items are located at the left.
 */
export type TimelineAlign = 'left' | 'center' | 'right';

/**
 * Possible timeline item alignment values.
 * Is a timeline item displayed left or right of the timeline?
 * If 'auto', the alignment is chosen automatically by timeline.
 */
export type TimelineItemAlign = 'auto' | 'left' | 'right';
