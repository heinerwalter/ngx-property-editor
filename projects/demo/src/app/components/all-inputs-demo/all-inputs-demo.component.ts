import { Component } from '@angular/core';
import { faCat, faDog, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FileInputFileContentType } from 'ngx-property-editor';
import { countriesDataSource } from '../../model/demo-data-sources';

@Component({
  selector: 'demo-all-inputs-demo',
  templateUrl: './all-inputs-demo.component.html',
  styleUrls: ['./all-inputs-demo.component.scss'],
})
export class AllInputsDemoComponent {

  /**
   * Data source for input components which need a data source.
   */
  protected readonly inputDataSource: { name: string, value: string }[] = [
    { name: 'Item 1', value: 'item 1' },
    { name: 'Item 2', value: 'item 2' },
    { name: 'Item 3', value: 'item 3' },
    { name: 'Item 4', value: 'item 4' },
    { name: 'Item 5', value: 'item 5' },
  ];

  /**
   * Data source for country and city select input components.
   */
  protected readonly countriesDataSource = countriesDataSource;

  protected iconCat: IconDefinition = faCat;
  protected iconDog: IconDefinition = faDog;

  /**
   * This object contains the values of all input components.
   */
  public values = {
    boolean: undefined as boolean | undefined,
    date: undefined as Date | undefined,
    time: undefined as Date | undefined,
    datetime: undefined as Date | undefined,
    number: undefined as number | undefined,
    text: '' as string | undefined,
    textAutocomplete: '' as string | undefined,
    textMultiLine: '' as string | undefined,
    fileSingle: undefined as File[] | undefined,
    fileSingleContent: undefined as FileInputFileContentType | undefined,
    fileMultiple: undefined as File[] | undefined,
    selectSingle: undefined as any | undefined,
    selectMultiple: [] as any[] | undefined,
    selectRadio: undefined as any | undefined,
    selectSeparateRadio: undefined as any | undefined,
    selectCheckbox: [] as any[] | undefined,
    selectDropdown: undefined as any | undefined,
    selectDropdownMultiple: [] as any[] | undefined,
    selectColor: undefined as string | undefined,
    selectIcon: undefined as string | undefined,
    rating: 0 as number | undefined,
    ratingCustom: 0 as number | undefined,
    array: ['Line 1', 'Line 2', 'Not line 3'] as any[],
    arrayInitiallyEmpty: undefined as unknown as any[],
    arrayWithInputGroup: [{ name: 'Max', number: 5 }, { name: 'Moritz', number: 3, country: 'Germany' }] as {
      name: string | undefined,
      number: number | undefined,
      country: string | undefined,
    }[],
    arrayWithInputGroupInitiallyEmpty: undefined as unknown as {
      name: string | undefined,
      number: number | undefined,
      country: string | undefined,
    }[],
    inputGroup: {
      street: undefined as string | undefined,
      number: undefined as number | undefined,
      zipCode: undefined as number | undefined,
      city: undefined as string | undefined,
      country: undefined as string | undefined,
    },
    inputGroupWithAddons: '' as string | undefined,
  };

  protected arrayWithInputGroupNewItemFunction(): {
    name: string | undefined,
    number: number | undefined,
  } {
    return { name: '', number: undefined };
  }

  /**
   * This method is called when the user changed the value of any input component.
   * @param inputName Name of the input component.
   * @param value changed value.
   */
  protected onInputValueChange(inputName: string, value: any): void {
    let valueString: string;
    if (value == undefined)
      valueString = 'undefined';
    else if (Array.isArray(value))
      valueString = `[${value.join(', ')}]`;
    else
      valueString = value.toString();

    console.log(`value of ${inputName} input changed: ${valueString}`, value);
  }

  protected onTextInputGotoIconClicked(): void {
    if (!this.values.text) return;
    window.location.assign('https://www.google.com/search?q=' + this.values.text);
  }

}

