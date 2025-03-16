import { Component, ViewChild } from '@angular/core';
import { VersionInfo } from './version-info';
import { ModalComponent } from '../modal.component';
import { faCopyright } from '@fortawesome/free-regular-svg-icons';
import {
  faCodeCommit,
  faDatabase,
  faEnvelope,
  faPenRuler,
  faPersonDigging,
  faServer,
  faV,
  IconDefinition,
  faGlobe,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'pe-about-dialog',
  templateUrl: './about-dialog.component.html',
  styleUrls: ['./about-dialog.component.scss'],
})
export class AboutDialogComponent {

  /** An object containing information on the built version of this application. */
  @Input() public version: VersionInfo | undefined = undefined;

  // Icons used in the template:
  protected readonly iconCopyright: IconDefinition = faCopyright;
  protected readonly iconVersion: IconDefinition = faV;
  protected readonly iconBuildDate: IconDefinition = faPersonDigging;
  protected readonly iconCommit: IconDefinition = faCodeCommit;
  protected readonly iconDatabase: IconDefinition = faDatabase;
  protected readonly iconConnection: IconDefinition = faServer;
  protected readonly iconDevMode: IconDefinition = faPenRuler;
  protected readonly iconEmail: IconDefinition = faEnvelope;
  protected readonly iconWebsite: IconDefinition = faGlobe;

  /** Reference to the modal window component. */
  @ViewChild(ModalComponent) public modal?: ModalComponent;

  public constructor() {
  }

  /**
   * Shows the about dialog as alert.
   * @returns Returns a promise waiting for the about dialog to be closed again.
   */
  public async show(): Promise<void> {
    if (!this.modal) return;
    await this.modal.show();
  }

}
