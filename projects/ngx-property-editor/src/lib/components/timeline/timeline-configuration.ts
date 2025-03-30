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
  /** Title of the timeline item. */
  title?: string;
  /** Longer description text of the timeline item. */
  text?: string;
  /** Optional FontAwesome icon in the timeline icon circle. */
  icon?: IconDefinition | undefined;
  /** Alignment of the timeline item. Automatic alignment, if undefined. */
  align?: TimelineAlign;
};

/**
 * Possible timeline item alignment values.
 * Is a timeline item displayed left or right of the timeline?
 * If 'auto', the alignment is chosen automatically by timeline.
 */
export type TimelineAlign = 'auto' | 'left' | 'right';
