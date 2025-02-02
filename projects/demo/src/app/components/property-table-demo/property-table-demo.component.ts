import { Component } from '@angular/core';
import { PropertiesConfiguration, PropertyEditorMode } from 'ngx-property-editor';
import { Contact } from '../../model/contact';

@Component({
  selector: 'demo-property-table-demo',
  templateUrl: './property-table-demo.component.html',
  styleUrls: ['./property-table-demo.component.scss'],
})
export class PropertyTableDemoComponent {

/**
   * Display the properties of these objects by a property table.
   */
  public data: Contact[] = [
    ...Contact.Contacts,
    Contact.Snoopy,
    Contact.Snoopy,
    Contact.Snoopy,
    Contact.Snoopy,
    Contact.Snoopy,
    Contact.Snoopy,
    Contact.Snoopy,
    Contact.Snoopy,
    Contact.Snoopy,
    Contact.Snoopy,
    Contact.Snoopy,
    Contact.Snoopy,
    Contact.Snoopy,
    Contact.Snoopy,
    Contact.Snoopy,
    Contact.Snoopy,
    Contact.Snoopy,
    Contact.Snoopy,
    Contact.Snoopy,
    Contact.Snoopy,
    Contact.Snoopy,
    Contact.Snoopy,
    Contact.Snoopy,
    Contact.Snoopy,
    Contact.Snoopy,
  ];

  /**
   * Returns the `data` object as JSON string.
   */
  public get dataAsJson(): string {
    return JSON.stringify(this.data, null, 2);
  }

  /**
   * Configuration of displayed properties of each table entry including name, data type,
   * displayed value etc.
   */
  public propertiesConfiguration: PropertiesConfiguration | undefined = Contact.propertiesConfiguration;

  /** Property editor mode. */
  public readonly mode: PropertyEditorMode = 'table';

  /** If true, the properties displayed in the table are editable by the user. */
  public editable: boolean = false;

}
