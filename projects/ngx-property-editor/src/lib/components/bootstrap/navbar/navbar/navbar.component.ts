import { Component, Input } from '@angular/core';
import {NavbarItem, NavbarItemMode} from '../types';

@Component({
  selector: 'pe-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {

  /** If true, an empty navigation bar element will be displayed. */
  @Input() public hideNavbarItems: boolean = false;

  /** Home page item displayed first in the navigation bar. */
  @Input() public homeItem: NavbarItem | undefined = undefined;
  /** All other items displayed in the navigation bar. */
  @Input() public items: NavbarItem[] = [];

  /** Optional URL of a logo image to be displayed first in the navigation bar. */
  @Input() public logoImageUrl: string | undefined = undefined;

  /** Define how to display the home page item. */
  @Input() public homeItemMode: NavbarItemMode | 'logo-only' = 'icon-or-text';

  public constructor() {
  }

}
