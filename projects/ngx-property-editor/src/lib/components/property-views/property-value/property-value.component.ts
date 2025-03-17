import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PEGlobalFunctions } from '../../../controller/pe-global-functions';
import { PropertyConfiguration } from '../property-configuration';
import { PropertyEditorMode } from '../property-editor-mode';
import { CountrySelectInputComponent } from '../../input/special-input/country-input/country-select-input.component';


type PropertyValueComponentDisplayType = 'html' | 'icon' | 'language' | 'readonly-input';


/**
 * This component displays the value of a given property `configuration` (readonly).
 * @see PropertyInputComponent
 */
@Component({
  selector: 'pe-property-value',
  templateUrl: './property-value.component.html',
  styleUrls: ['./property-value.component.scss'],
})
export class PropertyValueComponent implements OnInit, OnChanges {

  /** ID attribute of this element. */
  @Input() public id: string = PEGlobalFunctions.generateRandomId();

  /**
   * Configuration of the displayed property including name, data type, displayed value etc.
   */
  @Input() public configuration: PropertyConfiguration | undefined = undefined;

  /**
   * Display a property of this object.
   */
  @Input() public data: any | undefined = undefined;

  /**
   * The property editor mode.
   */
  @Input() public mode: PropertyEditorMode = 'view';

  protected isInitialized: boolean = false;
  protected value: string | string[] | undefined = undefined;
  protected displayType: PropertyValueComponentDisplayType | undefined = undefined;

  protected get valueAsString(): string {
    if (Array.isArray(this.value))
      return this.value.join(', ');
    else
      return this.value || '';
  }

  protected get valueAsArray(): string [] {
    if (Array.isArray(this.value))
      return this.value;
    else
      return this.value ? [this.value] : [];
  }

  public constructor() {
  }

  public ngOnInit(): void {
    this.createPropertyComponent();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    // Ignore value change before initialization is complete (ngOnInit() and createPropertyComponent())
    if (!this.isInitialized) return;

    if (changes.hasOwnProperty('configuration') ||
      changes.hasOwnProperty('data') ||
      changes.hasOwnProperty('mode')) {
      // Re-assign all input properties of the property component when configuration, data, or mode changed,
      // because these values apply to most of the input properties.
      this.createPropertyComponent();

    }
  }

  // region Functions for creating a property component for the property configuration

  private createPropertyComponent(): PropertyValueComponentDisplayType | undefined {
    this.isInitialized = true;

    if (!this.configuration?.propertyType ||
      this.configuration.separator ||
      this.configuration.isHidden(this.data, this.mode)) {
      // The property can or should not be displayed
      this.value = undefined;
      return this.displayType = undefined;
    }

    const propertyType = this.configuration.propertyType;

    let stringValue: string | string[] | undefined = undefined;
    let preserveLineBreaks: boolean = false;

    switch (propertyType) {

      case 'boolean':
      case 'boolean-indeterminate':

      case 'date':
      case 'datetime':
      case 'time':
      case 'month':

      case 'year':
      case 'number':

      case 'string':
      case 'string-multiline':
      case 'id':
      case 'password':
      case 'tel':
      case 'email':
      case 'url':

      case 'select':
        stringValue = this.configuration.getDisplayValue(this.data, this.mode, false);
        preserveLineBreaks = propertyType == 'string-multiline';
        break;

      case 'language':
        /*stringValue = this.configuration.getDisplayValue(this.data, this.mode, false);
        if (Array.isArray(stringValue))
          stringValue = stringValue
            .map(item => LanguageSelectInputComponent.getLanguageName(item))
            .filter(item => !!item) as string[];
        else if (typeof stringValue === 'string')
          stringValue = LanguageSelectInputComponent.getLanguageName(stringValue);
        break;*/
        this.value = this.configuration.getDisplayValue(this.data, this.mode, false);
        return this.displayType = 'language';

      case 'country':
        stringValue = this.configuration.getDisplayValue(this.data, this.mode, false);
        if (Array.isArray(stringValue))
          stringValue = stringValue
            .map(item => CountrySelectInputComponent.getCountryName(item))
            .filter(item => !!item) as string[];
        else if (typeof stringValue === 'string')
          stringValue = CountrySelectInputComponent.getCountryName(stringValue);
        break;

      case 'icon':
        this.value = this.configuration.getDisplayValue(this.data, this.mode, false);
        return this.displayType = 'icon';

      case 'color':
      case 'color-class':

      case 'rating':
      case 'difficulty':

      case 'button':
        this.value = undefined;
        return this.displayType = 'readonly-input';

    }

    // Add Link to URLs
    if (propertyType == 'url') {
      if (stringValue && this.configuration.isArray && Array.isArray(stringValue)) {
        stringValue = stringValue.map(item => `<a href="${item}" title="${this.configuration?.getLabel(this.data, this.mode)}" target="_blank">${item}</a>`);
      }
    }

    // Add preserve line break style
    const preserveLineBreaksStyle: string = preserveLineBreaks ? ' style="white-space: pre-line"' : '';

    // Add HTML tags (list or span)
    let htmlValue: string;
    if (stringValue && this.configuration.isArray && Array.isArray(stringValue) && stringValue?.length) {
      htmlValue = `<ul${preserveLineBreaksStyle}>${stringValue.map(item => `<li>${item}</li>`).join('')}</ul>`;
    } else if (stringValue && typeof stringValue === 'string') {
      htmlValue = `<span${preserveLineBreaksStyle}>${stringValue}</span>`;
    } else {
      htmlValue = '';
    }

    if (htmlValue) {
      this.value = htmlValue;
      return this.displayType = 'html';
    } else {
      this.value = undefined;
      return this.displayType = undefined;
    }
  }

  // endregion

}
