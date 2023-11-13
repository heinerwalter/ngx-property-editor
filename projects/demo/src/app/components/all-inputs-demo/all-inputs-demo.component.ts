import { Component } from '@angular/core';
import { faCat, faDog, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'demo-all-inputs-demo',
  templateUrl: './all-inputs-demo.component.html',
  styleUrls: ['./all-inputs-demo.component.scss'],
})
export class AllInputsDemoComponent {

  /**
   * Data source for all input components which need a data source.
   */
  public readonly inputDataSource: { name: string, value: string }[] = [
    { name: 'Item 1', value: 'item 1' },
    { name: 'Item 2', value: 'item 2' },
    { name: 'Item 3', value: 'item 3' },
    { name: 'Item 4', value: 'item 4' },
    { name: 'Item 5', value: 'item 5' },
  ];

  public iconCat: IconDefinition = faCat;
  public iconDog: IconDefinition = faDog;

  /**
   * This object contains the values of all input components.
   */
  public values = {
    boolean: undefined as boolean | undefined,
    date: undefined as Date | undefined,
    number: undefined as number | undefined,
    text: '' as string | undefined,
    textMultiLine: '' as string | undefined,
    file: undefined as File[] | undefined,
    selectSingle: undefined as any | undefined,
    selectMultiple: [] as any[] | undefined,
    selectRadio: undefined as any | undefined,
    selectSeparateRadio: undefined as any | undefined,
    selectCheckbox: [] as any[] | undefined,
    rating: 0 as number | undefined,
    ratingCustom: 0 as number | undefined,
  }

  /**
   * This method is called when the user changed the value of any input component.
   * @param inputName Name of the input component.
   * @param value changed value.
   */
  public onInputValueChange(inputName: string, value: any): void {
    let valueString: string;
    if (value == undefined)
      valueString = 'undefined';
    else if (Array.isArray(value))
      valueString = `[${value.join(', ')}]`;
    else
      valueString = value.toString();

    console.log(`value of ${inputName} input changed: ${valueString}`);
  }

  public onTextInputGotoIconClicked(): void {
    if (!this.values.text) return;
    window.location.assign('https://www.google.com/search?q=' + this.values.text);
  }

}

