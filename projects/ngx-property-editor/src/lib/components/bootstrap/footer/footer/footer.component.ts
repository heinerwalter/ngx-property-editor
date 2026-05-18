import {Component, Input} from '@angular/core';
import {VersionInfo} from '../../../modal/about-dialog/version-info';

@Component({
  selector: 'pe-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {

  /** If true, an empty footer element will be displayed. */
  @Input() public hideFooterItems: boolean = false;

  /**
   * An object containing information on the built version of the application.
   * If this property is defined, the version number is displayed in the footer.
   * When clicked on the version number, the `AboutDialogComponent` is opened in a modal window
   * with more information from the version info object.
   */
  @Input() public versionInfo: VersionInfo | undefined = undefined;

  /**
   * If true, a copyright notice is displayed in the footer
   * consisting of the copyright start year, the current year, and the name of the application.
   */
  @Input() public showCopyrightInFooter: boolean = true;

  /** URL to the imprint page that should be displayed in the footer. */
  @Input() public imprintUrl: string | undefined = undefined;

  /** URL to the privacy policy page that should be displayed in the footer. */
  @Input() public privacyPolicyUrl: string | undefined = undefined;

  /** Other links that should be displayed in the footer. */
  @Input() public links: { name: string, url: string }[] = [];

}
