import { Component, Input } from '@angular/core';

@Component({
  selector: 'demo-root',
  templateUrl: './demo-app.component.html',
  styleUrls: ['./demo-app.component.scss'],
})
export class DemoAppComponent {

  /**
   * Data source for the container type select input component.
   */
  protected readonly containerTypeDataSource: { name: string, value: string }[] = [
    { name: 'Tabs', value: 'tabs' },
    { name: 'Accordion', value: 'accordion' },
    { name: 'Pages', value: 'pages' },
  ];

  /**
   * Choose an item view type for presenting the demo content.
   */
  protected containerType: 'tabs' | 'accordion' | 'pages' = 'tabs';

  /**
   * Data source for the tabs `orientation` select input component.
   */
  protected readonly tabsOrientationDataSource: { name: string, value: string }[] = [
    { name: 'Horizontal', value: 'horizontal' },
    { name: 'Vertical', value: 'vertical' },
  ];

  /**
   * Choose a `orientation` for the tabs' container.
   */
  protected tabsOrientation: 'horizontal' | 'vertical' = 'horizontal';
  /**
   * Data source for the tabs `verticalTabStyle` select input component.
   */
  protected readonly tabsVerticalStyleDataSource: { name: string, value: string }[] = [
    { name: 'Pills', value: 'pills' },
    { name: 'List', value: 'list' },
    { name: 'List (without gap)', value: 'list-no-gap' },
  ];

  /**
   * Choose a `verticalTabStyle` for the tabs' container.
   */
  protected tabsVerticalStyle: 'pills' | 'list' | 'list-no-gap' = 'list-no-gap';

  /**
   * Data source for the pages `controlsPosition` select input component.
   */
  protected readonly pagesControlsPositionDataSource: { name: string, value: string }[] = [
    { name: 'Controls & Label: Top', value: 'top' },
    { name: 'Controls & Label: Bottom', value: 'bottom' },
    { name: 'Label: Top | Controls: Bottom', value: 'label-top-controls-bottom' },
  ];

  /**
   * Choose a `controlsPosition` for the pages' container.
   */
  protected pagesControlsPosition: 'top' | 'bottom' | 'label-top-controls-bottom' = 'top';

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
  protected pagesControlsStyle: 'buttons' | 'box' = 'box';

}
