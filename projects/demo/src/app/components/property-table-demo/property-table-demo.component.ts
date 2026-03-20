import { Component } from '@angular/core';
import { PropertyConfiguration, PropertyEditorMode } from 'ngx-property-editor';
import { Contact } from '../../model/contact';
import { ContactGenerator } from '../../model/contact-generator';

@Component({
  selector: 'demo-property-table-demo',
  templateUrl: './property-table-demo.component.html',
  styleUrls: ['./property-table-demo.component.scss'],
})
export class PropertyTableDemoComponent {

  /**
   * Display the properties of these objects by a property table.
   */
  public data: Contact[] = Contact.Contacts;

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

  private hasGenertedRandomContacts: boolean = false;

  /**
   * Generates random contacts and assigns them to the `data` property,
   * which will be displayed in the table. When this method is called
   * for the first time, it will generate 100 random contacts.
   * When this method is called again, it will add 100 more random contacts.
   */
  protected generateRandomContacts(): void {
    if (!this.hasGenertedRandomContacts)
      this.data = [];

    this.data = [
      ...this.data,
      ...ContactGenerator.generateRandomContacts(100),
    ];

    this.hasGenertedRandomContacts = true;
  }

}
