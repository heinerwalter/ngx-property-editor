import { Component, Input } from '@angular/core';

@Component({
  selector: 'demo-container-demo-pages',
  templateUrl: './container-demo-pages.component.html',
  styleUrls: ['./container-demo-pages.component.scss'],
})
export class ContainerDemoPagesComponent {

  /**
   * Data source for the pages `controlsPosition` select input component.
   */
  protected readonly pagesControlsPositionDataSource: { name: string, value: string }[] = [
    { name: 'Controls & Label: Top', value: 'top' },
    { name: 'Controls & Label: Bottom', value: 'bottom' },
    { name: 'Controls & Label: Window Bottom (fixed)', value: 'bottom-fixed' },
    { name: 'Label: Top | Controls: Bottom', value: 'label-top-controls-bottom' },
  ];

  /**
   * Choose a `controlsPosition` for the pages' container.
   */
  @Input() public pagesControlsPosition: 'top' | 'bottom' | 'bottom-fixed' | 'label-top-controls-bottom' = 'top';

  /**
   * Data source for the pages `controlsStyle` select input component.
   */
  protected readonly pagesControlsStyleDataSource: { name: string, value: string }[] = [
    { name: 'Buttons', value: 'buttons' },
    { name: 'Box', value: 'box' },
  ];

  /**
   * Choose a `controlsStyle` for the pages' container.
   */
  @Input() public pagesControlsStyle: 'buttons' | 'box' = 'buttons';

  /**
   * Data source for the pages `controlColor` select input component.
   */
  protected readonly pagesControlColorDataSource: { name: string, value: string }[] = [
    { name: 'Primary', value: 'primary' },
    { name: 'Secondary', value: 'secondary' },
    { name: 'Success', value: 'success' },
    { name: 'Info', value: 'info' },
    { name: 'Warning', value: 'warning' },
    { name: 'Danger', value: 'danger' },
    { name: 'Light', value: 'light' },
    { name: 'Dark', value: 'dark' },
  ];

  /**
   * Choose a `controlColor` for the pages' container.
   */
  @Input() public pagesControlColor: 'primary' |
    'secondary' |
    'success' |
    'info' |
    'warning' |
    'danger' |
    'light' |
    'dark' = 'light';

  /**
   * Data source for the pages `controlColorVariant` select input component.
   */
  protected readonly pagesControlColorVariantDataSource: { name: string, value: string }[] = [
    { name: 'solid', value: 'solid' },
    { name: 'Outline', value: 'outline' },
  ];

  /**
   * Choose a `controlColor` for the pages' container.
   */
  @Input() public pagesControlColorVariant: 'solid' | 'outline' = 'solid';

}
