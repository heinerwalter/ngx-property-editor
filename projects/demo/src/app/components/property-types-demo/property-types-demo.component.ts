import { Component, OnInit } from '@angular/core';
import { demoPropertyTypesDataSource } from '../../model/demo-property-types';

@Component({
  selector: 'demo-property-types-demo',
  templateUrl: './property-types-demo.component.html',
  styleUrls: ['./property-types-demo.component.scss'],
})
export class PropertyTypesDemoComponent implements OnInit {

  /**
   * A data source with demo values for all property types.
   */
  protected readonly propertyTypesDataSource = demoPropertyTypesDataSource;

  protected dataSingleValues: any = {};
  protected dataArrayValues: any = {};

  /** Show property input elements (true) or property value elements (false). */
  protected isEditable: boolean = false;
  /** Show inputs with multiple values (array)? */
  protected isArray: boolean = false;

  public ngOnInit() {
    for (const item of this.propertyTypesDataSource) {
      this.dataSingleValues[item.propertyType] = item.values[0];
      this.dataArrayValues[item.propertyType] = item.values;
    }
  }
}
