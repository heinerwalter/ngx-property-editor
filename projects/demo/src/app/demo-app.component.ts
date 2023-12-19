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
  @Input() public containerType: 'tabs' | 'accordion' | 'pages' = 'tabs';

}
