import { Component, Input } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { PEGlobalFunctions } from '../../../../controller/pe-global-functions';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { NavbarItem, NavbarItemMode } from '../types.d';


@Component({
  selector: 'pe-navbar-item',
  templateUrl: './navbar-item.component.html',
  styleUrls: ['./navbar-item.component.scss'],
})
export class NavbarItemComponent {

  /** ID attribute of the .nav-link element. */
  @Input() public id: string = PEGlobalFunctions.generateRandomId();

  /** Definition of the navigation bar item including link, icon, title and an optional submenu. */
  @Input() public item: NavbarItem | undefined;

  /**
   * Decide how the navigation bar item is displayed (`icon` and/or `title`):
   * - 'text': Display only the `title`.
   * - 'icon-or-text': Display `icon` if available. If the `icon` is undefined, the `title` is displayed instead.
   * - 'icon-and-text': Display `icon` and `title`.
   * - 'icon-and-text-on-wide-screen': On small screens only the `icon` is displayed.
   *                                   On wide screens `icon` and `title` are displayed.
   */
  @Input() public mode: NavbarItemMode = 'icon-and-text-on-wide-screen';

  /**
   * Returns true, if the navbar item icon should be displayed.
   */
  protected get showIcon(): boolean {
    return this.mode == 'icon-or-text' || this.mode == 'icon-and-text' || this.mode == 'icon-and-text-on-wide-screen';
  }

  /**
   * Returns true, if the navbar item title should be displayed.
   */
  protected get showTitle(): boolean {
    return this.mode == 'text' || this.mode == 'icon-and-text' || this.mode == 'icon-and-text-on-wide-screen' ||
      (this.mode == 'icon-or-text' && !this.item?.icon);
  }

  // region Dropdown

  private dropdownCloseTimeout: NodeJS.Timeout | undefined = undefined;

  private clearDropdownCloseTimeout(): void {
    if (this.dropdownCloseTimeout) {
      clearTimeout(this.dropdownCloseTimeout);
      this.dropdownCloseTimeout = undefined;
    }
  }

  protected onDropdownOpen(dropdownRef: NgbDropdown): void {
    this.clearDropdownCloseTimeout();
    dropdownRef?.open();
  }

  protected onDropdownClose(dropdownRef: NgbDropdown, delay: boolean): void {
    this.clearDropdownCloseTimeout();

    if (!delay) {
      dropdownRef?.close();
    } else {
      this.dropdownCloseTimeout = setTimeout(() => {
        this.dropdownCloseTimeout = undefined;
        dropdownRef?.close();
      }, 200);
    }
  }

  // endregion

}
