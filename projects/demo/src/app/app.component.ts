import { Component } from '@angular/core';

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

  /**
   * Display the properties of this object by the property table and editor.
   */
  public data: any = {
    gender: 'male',
    firstname: 'Charlie',
    lastname: 'Brown',
    birthday: new Date(1950, 9, 2),
    tel: '+1 23456789',
    email: 'charlie.brown@peanuts.com',
    favorite: true,
    rating: 4,
  };

}
