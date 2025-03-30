/**
 * Definition of a whole timeline with all of its items.
 */
export type Timeline = TimelineItem[];

/**
 * Definition of a timeline item.
 */
export type TimelineItem = {
  /** Title of the timeline item. */
  title?: string;
  /** Longer description text of the timeline item. */
  text?: string;
  /** Alignment of the timeline item. Automatic alignment, if undefined. */
  align?: TimelineAlign;
};

/**
 * Possible timeline item alignment values.
 * Is a timeline item displayed left or right of the timeline?
 * If 'auto', the alignment is chosen automatically by timeline.
 */
export type TimelineAlign = 'auto' | 'left' | 'right';
