import { Component, Input } from '@angular/core';

@Component({
  selector: 'demo-container-demo-tabs',
  templateUrl: './container-demo-tabs.component.html',
  styleUrls: ['./container-demo-tabs.component.scss'],
})
export class ContainerDemoTabsComponent {

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
  @Input() public tabsOrientation: 'horizontal' | 'vertical' = 'horizontal';

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
  @Input() public tabsVerticalStyle: 'pills' | 'list' | 'list-no-gap' = 'list';

}
