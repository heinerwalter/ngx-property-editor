import { Component, Input } from '@angular/core';
import { NavbarItem } from '../types';

@Component({
  selector: 'pe-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {

  /** If true, an empty navigation bar element will be displayed. */
  @Input() public hideNavbarItems: boolean = false;

  /** Home page item displayed first in the navigation bar. */
  @Input() public homeItem: NavbarItem | undefined;
  /** All other items displayed in the navigation bar. */
  @Input() public items: NavbarItem[] = [];

  public constructor() {
  }

}
