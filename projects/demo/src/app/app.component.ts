import { Component } from '@angular/core';
import {
  EditModeType,
  PropertiesConfiguration,
  ViewModeType,
} from 'ngx-property-editor';
import { Contact } from './model/contact';

@Component({
  selector: 'demo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  /**
   * Data source for the container type select input component.
   */
  public readonly containerTypeDataSource: { name: string, value: string }[] = [
    { name: 'Tabs', value: 'tabs' },
    { name: 'Accordion', value: 'accordion' },
    { name: 'Pages', value: 'pages' },
  ];

  /**
   * Choose an item view type for presenting the demo content.
   */
  public containerType: 'tabs' | 'accordion' | 'pages' = 'tabs';

  /**
   * Data source for the pages `controlsPosition` select input component.
   */
  public readonly pagesControlsPositionDataSource: { name: string, value: string }[] = [
    { name: 'Controls & Label: Top', value: 'top' },
    { name: 'Controls & Label: Bottom', value: 'bottom' },
    { name: 'Label: Top | Controls: Bottom', value: 'label-top-controls-bottom' },
  ];

  /**
   * Choose a `controlsPosition` for the pages' container.
   */
  public pagesControlsPosition: 'top' | 'bottom' | 'label-top-controls-bottom' = 'top';

}
