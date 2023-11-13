import { Component } from '@angular/core';
import { Contact } from "../../model/contact";
import { EditModeType, PropertiesConfiguration, ViewModeType, ViewAndEditContainerMode } from "ngx-property-editor";

@Component({
  selector: 'demo-property-editor-demo',
  templateUrl: './property-editor-demo.component.html',
  styleUrls: ['./property-editor-demo.component.scss']
})
export class PropertyEditorDemoComponent {

  /**
   * Display the properties of this object by the property table and editor.
   */
  public data: Contact = new Contact({
    gender: 'male',
    firstname: 'Charlie',
    lastname: 'Brown',
    birthday: new Date(1950, 9, 2),
    tel: '+1 23456789',
    email: 'charlie.brown@peanuts.com',
    favorite: true,
    rating: 4,
  });


  /**
   * Configuration of displayed properties including name, data type, displayed value etc.
   * If undefined, the configuration will be automatically generated from the properties
   * of the `data` object.
   */
  public propertiesConfiguration: PropertiesConfiguration | undefined = Contact.propertiesConfiguration;

  /** View or edit mode. */
  public mode: ViewAndEditContainerMode = 'view';

  /**
   * Possible options of `viewModeType` (how are properties displayed in view mode?).
   */
  public viewModeTypeDataSource: { name: string, value: ViewModeType }[] = [
    { name: 'Table', value: 'table' },
    { name: 'Readonly Editor', value: 'editor' },
    { name: 'Custom (nothing visible)', value: 'custom' },
  ];

  /**
   * Possible options of `editModeType` (how are properties displayed in edit mode?).
   */
  public editModeTypeDataSource: { name: string, value: EditModeType }[] = [
    { name: 'Editor', value: 'editor' },
    { name: 'Custom (nothing visible)', value: 'custom' },
  ];

  /**
   * Choose how the properties are displayed in view mode.
   */
  public viewModeType: ViewModeType = 'editor';

  /**
   * Choose how the properties are displayed in edit mode.
   */
  public editModeType: EditModeType = 'editor';

}
