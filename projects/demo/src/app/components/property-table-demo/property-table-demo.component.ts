import { Component } from '@angular/core';
import { PropertyConfiguration, PropertyEditorMode } from 'ngx-property-editor';
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
  public propertyConfigurations: PropertyConfiguration[] | undefined = Contact.propertyConfigurations;

  /** Property editor mode. */
  public readonly mode: PropertyEditorMode = 'table';

  /** If true, the properties displayed in the table are editable by the user. */
  public editable: boolean = true;

  /**
   * This method is called when the goto detail link was clicked by the user.
   * @param row The data object of the row on which the goto detail link was clicked.
   */
  protected onDetailLinkClick(row: any): void {
    alert('Details of a table row should be displayed.');
  }

}
