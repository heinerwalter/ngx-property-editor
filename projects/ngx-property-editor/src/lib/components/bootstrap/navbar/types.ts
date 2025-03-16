/*
 * This file contains types used by the navication bar components.
 */

import { IconDefinition } from '@fortawesome/free-solid-svg-icons';


/**
 * Type of the display mode of the `NavbarItemComponent`.
 * Decide how the navigation bar item is displayed (`icon` and/or `title`):
 * - 'text': Display only the `title`.
 * - 'icon-or-text': Display `icon` if available. If the `icon` is undefined, the `title` is displayed instead.
 * - 'icon-and-text': Display `icon` and `title`.
 * - 'icon-and-text-on-wide-screen': On small screens only the `icon` is displayed.
 *                                   On wide screens `icon` and `title` are displayed.
 */
export type NavbarItemMode = 'text' | 'icon-or-text' | 'icon-and-text' | 'icon-and-text-on-wide-screen';

/**
 * Type of the navbar item dropdown menu definition used by `NavbarItemComponent`.
 * @see NavbarItemComponent.dropdown
 */
export type NavbarItem = {
  /** If true, a separator is displayed instead of this navbar item. */
  separator?: boolean,
  /** Angular router link which is navigated to when the navbar item is clicked. */
  routerLink?: any[] | string | undefined,
  /** FontAwesome icon of the navbar item. */
  icon?: IconDefinition | undefined,
  /** Title of the navbar item. */ 
  title?: string | undefined,
  /**
   * Optional submenu of the navbar item displayed as dropdown on hover.
   */
  submenu?: NavbarItem[] | undefined;
}
 