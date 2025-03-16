import { Component, Input } from '@angular/core';
import { AdminService } from '../../../services/admin-service/admin.service';
import { faLock, faLockOpen, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Page } from '../../../model/settings/pages/page';
import { PagesService } from '../../../services/pages-service/pages.service';
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
