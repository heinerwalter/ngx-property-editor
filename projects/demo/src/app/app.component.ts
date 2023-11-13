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
  public readonly containerTypeDataSource = [
    { name: 'Tabs', value: 'tabs' },
    { name: 'Accordion', value: 'accordion' },
  ];

  /**
   * Choose an item view type for presenting the demo content.
   */
  public containerType: 'tabs' | 'accordion' = 'tabs';

}
