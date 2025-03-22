import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PEGlobalFunctions } from '../../../controller/pe-global-functions';
import { PropertyConfiguration } from '../property-configuration';
import { PropertyEditorMode } from '../property-editor-mode';
import { CountrySelectInputComponent } from '../../input/special-input/country-input/country-select-input.component';


type PropertyValueComponentDisplayType = 'text' | 'text-multiline' | 'list' |
  'url' | 'email' | 'icon' | 'language' | 'color' | 'rating' | 'difficulty' |
  'button';


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

  protected displayType: PropertyValueComponentDisplayType | undefined = undefined;
  protected value: string | string[] | undefined = undefined;
  protected numericValues: number[] = [];
  protected label: string = '';

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
    this.label = this.configuration?.getLabel(this.data, this.mode) || '';

    if (!this.configuration?.propertyType ||
      this.configuration.separator ||
      this.configuration.isHidden(this.data, this.mode)) {
      // The property can or should not be displayed
      this.value = undefined;
      return this.displayType = undefined;
    }

    const propertyType = this.configuration.propertyType;

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
      case 'id':
      case 'password':
      case 'tel':

      case 'select':
        this.value = this.configuration.getDisplayValue(this.data, this.mode, false);

        if (Array.isArray(this.value)) {
          if (this.value.length > 1) {
            return this.displayType = 'list';
          } else if (this.value.length == 1) { 
            this.value = this.value[0];
          } else {
            this.value = undefined;
          }
        } 

        if (this.value) {
          return this.displayType = 'text';
        } else {
          this.value = undefined;
          return this.displayType = undefined;
        }

      case 'string-multiline':
        this.value = this.configuration.getDisplayValue(this.data, this.mode, false);
        if (Array.isArray(this.value))
          this.value = this.value.join('\n');
        return this.displayType = this.value ? 'text-multiline' : undefined;

      case 'url':
      case 'email':
        this.value = this.configuration.getDisplayValue(this.data, this.mode, false);
        return this.displayType = propertyType;
 
      case 'language':
        this.value = this.configuration.getDisplayValue(this.data, this.mode, false);
        return this.displayType = 'language';

      case 'country':
        this.value = this.configuration.getDisplayValue(this.data, this.mode, false);
        if (Array.isArray(this.value)) {
          this.value = this.value
            .map(item => CountrySelectInputComponent.getCountryName(item))
            .filter(item => !!item) as string[];
          if (this.value.length > 1) {
            return this.displayType = 'list';
          } else if (this.value.length == 1) {
            this.value = this.value[0];
            return this.displayType = 'text';
          } else {
            this.value = undefined;
            return this.displayType = undefined;
          }
        } else if (typeof this.value === 'string') {
          this.value = CountrySelectInputComponent.getCountryName(this.value);
          return this.displayType = 'text';
        } else {
          this.value = undefined;
          return this.displayType = undefined;
        }

      case 'icon':
        this.value = this.configuration.getDisplayValue(this.data, this.mode, false);
        return this.displayType = 'icon';

      case 'color':
      case 'color-class':
        this.value = this.configuration.getDisplayValue(this.data, this.mode, false);
        return this.displayType = 'color';

      case 'rating':
      case 'difficulty':
        this.value = undefined;
        const value = this.configuration.getValue(this.data, this.mode);
        if (Array.isArray(value)) {
          this.numericValues = value as number[];
        } else if (typeof value === 'number') {
          this.numericValues = [value];
        } else {
          this.numericValues = [];
          return this.displayType = undefined;
        }
        return this.displayType = propertyType;

      case 'button':
        this.value = undefined;
        return this.displayType = 'button';

    }
  }

  // endregion

}
