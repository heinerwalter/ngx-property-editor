import {
  Component,
  ComponentRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { PEGlobalFunctions } from '../../../controller/pe-global-functions';
import { PropertyConfiguration } from '../property-configuration';
import { PropertyEditorMode } from '../property-editor-mode';
import {
  InputBase,
  InputBaseWithValue,
  InputBaseWithValueAndDataSource,
  SelectInputBase,
  SelectInputBaseWithDataSource,
} from '../../input/input-base';
import { BooleanInputComponent } from '../../input/boolean-input/boolean-input.component';
import { PropertyType } from '../property-type';
import { DateInputComponent } from '../../input/date-input/date-input.component';
import { NumberInputComponent } from '../../input/number-input/number-input.component';
import { TextInputComponent } from '../../input/text-input/text-input.component';
import { TextAreaInputComponent } from '../../input/text-area-input/text-area-input.component';
import { LanguageSelectInputComponent } from '../../input/special-input/language-input/language-select-input.component';
import { CountrySelectInputComponent } from '../../input/special-input/country-input/country-select-input.component';
import { ColorSelectInputComponent } from '../../input/special-input/color-select-input/color-select-input.component';
import { IconSelectInputComponent } from '../../input/special-input/icon-select-input/icon-select-input.component';
import { RatingInputComponent } from '../../input/rating-input/rating-input.component';
import { DifficultyInputComponent } from '../../input/difficulty-input/difficulty-input.component';
import { SelectInputComponent } from '../../input/select-input/select-input.component';
import { CodeInputComponent } from '../../input/code-input/code-input.component';
import { ButtonInputComponent } from '../../input/button-input/button-input.component';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

/**
 * This component displays an input component for a given property `configuration` (editable).
 * @see PropertyValueComponent
 */
@Component({
  selector: 'pe-property-input',
  templateUrl: './property-input.component.html',
})
export class PropertyInputComponent implements OnInit, OnChanges {

  /** ID attribute of the input element. */
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
   * This event is emitted when the user changed the value of the input element.
   * The changed property value is passed as event argument.
   */
  @Output() public readonly valueChange: EventEmitter<any> = new EventEmitter<any>();

  /**
   * The property editor mode.
   * The input element is editable, if the mode is not "view".
   */
  @Input() public mode: PropertyEditorMode = 'edit';

  /** If true, the value is displayed as usual (not grey/disabled) but the user cannot change it (readonly). */
  public get readonly(): boolean {
    return this.mode == 'view';
  }

  /** If true, the input element is not wrapped inside a form group component (no label). */
  @Input() public noFormGroup: boolean = false;

  /**
   * Container element in which the property component is created.
   * */
  @ViewChild('container', { read: ViewContainerRef, static: true }) public viewContainerRef?: ViewContainerRef;
  /**
   * The created property component.
   * @see createPropertyComponent
   */
  private componentRef?: ComponentRef<InputBase>;
  /**
   * Property type of the created `componentRef`.
   * When the property type changes, a new component has to be created.
   */
  private componentPropertyType?: PropertyType;
  /**
   * Event subscriptions on the created property component.
   */
  private subscriptions: Subscription[] = [];

  public constructor(private router: Router) {
  }

  public ngOnInit(): void {
    this.createPropertyComponent();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    // Ignore value change before initialization is complete (ngOnInit() and createPropertyComponent())
    if (!this.componentRef) return;

    if (changes.hasOwnProperty('configuration') &&
      this.componentPropertyType != this.configuration?.propertyType) {
      // Regenerate the whole property component when the property type changed.
      this.createPropertyComponent();

    } else if (changes.hasOwnProperty('configuration') ||
      changes.hasOwnProperty('data') ||
      changes.hasOwnProperty('readonly') /* readonly == mode */) {
      // Re-assign all input properties of the property component when configuration, data, or mode changed,
      // because these values apply to most of the input properties.
      if (this.componentRef)
        this.assignInputProperties(this.componentRef);

    } else {
      // Otherwise assign only the changed input properties of the property component.
      if (changes.hasOwnProperty('id')) {
        if (this.componentRef && !this.configuration?.propertyName)
          this.setInput<InputBase>(this.componentRef, 'id', this.id);
      }
      if (changes.hasOwnProperty('noFormGroup')) {
        if (this.componentRef)
          this.setInput<InputBase>(this.componentRef, 'noFormGroup', this.noFormGroup);
      }
    }
  }

  // region Functions for creating an input component for the property configuration

  /**
   * Type-safe function for setting @Input properties of the given component.
   * @param componentRef Generated input component.
   * @param propertyName Name of an @Input property of the given component.
   * @param value New value to be assigned to the @Input property.
   * @template T Type of the given component.
   */
  private setInput<T>(componentRef: ComponentRef<any>, propertyName: keyof T, value: any): void {
    componentRef.setInput(propertyName as string, value);
  }

  /**
   * Assigns the input properties of the given `InputBase`
   * component from the property configuration.
   * @param componentRef Generated input component.
   */
  private assignInputProperties(componentRef: ComponentRef<InputBase>): void {
    if (!this.configuration) return;

    // Unsubscribe any previously subscribed event
    for (const subscription of this.subscriptions) {
      if (!subscription.closed)
        subscription.unsubscribe();
    }
    this.subscriptions = [];

    // Assign the input properties of `InputBase`:
    this.setInput<InputBase>(componentRef, 'id', this.configuration.propertyName || PEGlobalFunctions.generateRandomId());
    this.setInput<InputBase>(componentRef, 'name', this.configuration.propertyName);
    this.setInput<InputBase>(componentRef, 'label', this.configuration.getLabel(this.data, this.mode));
    this.setInput<InputBase>(componentRef, 'placeholder', this.configuration.getLabel(this.data, this.mode));
    // this.setInput<InputBase>(componentRef, 'infoIconTooltip', undefined);
    this.setInput<InputBase>(componentRef, 'helpText', this.configuration.helpText);
    this.setInput<InputBase>(componentRef, 'disabled', !this.readonly && !this.configuration.isEditable(this.data, this.mode));
    this.setInput<InputBase>(componentRef, 'readonly', this.readonly);
    this.setInput<InputBase>(componentRef, 'required', this.configuration.isRequired(this.data, this.mode));
    // this.setInput<InputBase>(componentRef, 'isValid', undefined);
    // this.setInput<InputBase>(componentRef, 'validFeedback', undefined);
    // this.setInput<InputBase>(componentRef, 'invalidFeedback', undefined);
    // this.setInput<InputBase>(componentRef, 'validityFeedbackAsTooltip', false);
    this.setInput<InputBase>(componentRef, 'noFormGroup', this.noFormGroup);
    // this.setInput<InputBase>(componentRef, 'inlineLabel', false);
    // this.setInput<InputBase>(componentRef, 'flexGrow', 1);

    // Assign the input properties of `InputBaseWithValue`:
    if (componentRef.instance instanceof InputBaseWithValue) {
      this.setInput<InputBaseWithValue<any>>(componentRef, 'value', this.configuration.getValue(this.data, this.mode));
      const subscription = componentRef.instance.valueChange.subscribe((newValue: any): void => {
        this.onValueChanged(newValue);
      });
      this.subscriptions.push(subscription);
    }

    // Assign the input properties of `SelectInputBase` or `SelectInputBaseWithDataSource`:
    if (componentRef.instance instanceof SelectInputBase ||
      componentRef.instance instanceof SelectInputBaseWithDataSource) {
      this.setInput<SelectInputBase<any>>(componentRef, 'multiple', this.configuration.isArray);
      this.setInput<SelectInputBase<any>>(componentRef, 'allowEmpty', !this.configuration.isRequired(this.data, this.mode));
    }

    // Assign the input properties of `InputBaseWithValueAndDataSource`:
    if (componentRef.instance instanceof InputBaseWithValueAndDataSource) {
      this.setInput<InputBaseWithValueAndDataSource<any>>(componentRef, 'dataSource', this.configuration.getDataSource(this.data, this.mode));
      this.setInput<InputBaseWithValueAndDataSource<any>>(componentRef, 'valuePropertyName', this.configuration.valuePropertyName);
      this.setInput<InputBaseWithValueAndDataSource<any>>(componentRef, 'displayPropertyName', this.configuration.displayPropertyName);
    }

    // Assign the input properties of other components
    if (componentRef.instance instanceof BooleanInputComponent) {
      this.setInput<BooleanInputComponent>(componentRef, 'allowIndeterminate', this.configuration.propertyType == 'boolean-indeterminate');
    }

    if (componentRef.instance instanceof DateInputComponent) {
      this.setInput<DateInputComponent>(componentRef, 'type', this.configuration.propertyType == 'datetime' ? 'datetime-local' : this.configuration.propertyType);
    }

    if (componentRef.instance instanceof TextInputComponent) {
      this.setInput<TextInputComponent>(componentRef, 'type', this.configuration.propertyType == 'string' || this.configuration.propertyType == 'id' ? 'text' : this.configuration.propertyType);
      this.setInput<TextInputComponent>(componentRef, 'autocompleteList', this.configuration.getDataSourceDisplayValues(this.data, this.mode));
      this.setInput<TextInputComponent>(componentRef, 'trimValue', this.configuration.propertyType !== 'password');
    }

    if (componentRef.instance instanceof ButtonInputComponent) {
      this.setInput<ButtonInputComponent>(componentRef, 'tooltip', this.configuration.getRouterLinkTooltip(this.data, this.mode));
      // Register setValueFunction or router link to button click
      const setValueFunction = this.configuration?.setValueFunction;
      const routerLink = this.configuration.getRouterLink(this.data, this.mode);
      const routerLinkIsExternal: boolean = this.configuration.getRouterLinkIsExternal(this.data, this.mode);
      const subscription = componentRef.instance.buttonClick.subscribe((): void => {
        if (setValueFunction) {
          // Trigger setValueFunction
          setValueFunction(this.data, undefined);
          this.valueChange.emit(undefined);
        } else {
          // Trigger routerLink
          if (routerLink) {
            if (routerLinkIsExternal) {
              window.open(Array.isArray(routerLink) ? routerLink.join('/') : routerLink, '_blank');
            } else {
              this.router.navigate(Array.isArray(routerLink) ? routerLink : [routerLink]).then();
            }
          }
        }
      });
      this.subscriptions.push(subscription);
    }
  }

  private createPropertyComponent(): ComponentRef<any> | undefined {
    // Destroy old property component before creating a new one
    this.componentRef?.destroy();

    if (!this.viewContainerRef ||
      !this.configuration?.propertyType ||
      this.configuration.separator ||
      this.configuration.isHidden(this.data, this.mode)) {
      // The property component can or should not be created
      this.componentRef = undefined;
      this.componentPropertyType = undefined;
      return undefined;
    }

    const propertyType = this.configuration.propertyType;

    const createComponent = <T extends InputBase>(componentType: Type<T>): ComponentRef<any> => {
      const componentRef = this.viewContainerRef!.createComponent(componentType);
      this.assignInputProperties(componentRef);
      this.componentRef = componentRef;
      this.componentPropertyType = propertyType;
      return componentRef;
    };

    switch (propertyType) {

      case 'boolean':
      case 'boolean-indeterminate':
        return createComponent(BooleanInputComponent);

      case 'date':
      case 'datetime':
      case 'time':
      case 'month':
        return createComponent(DateInputComponent);

      case 'year':
      case 'number':
        return createComponent(NumberInputComponent);

      case 'string':
      case 'id':
      case 'password':
      case 'tel':
      case 'email':
      case 'url':
      case 'color':
        return createComponent(TextInputComponent);

      case 'string-multiline':
        return createComponent(TextAreaInputComponent);

      case 'code':
        return createComponent(CodeInputComponent);

      case 'language':
        return createComponent(LanguageSelectInputComponent);

      case 'country':
        return createComponent(CountrySelectInputComponent);

      case 'color-class':
        return createComponent(ColorSelectInputComponent);

      case 'icon':
        return createComponent(IconSelectInputComponent);

      case 'rating':
        return createComponent(RatingInputComponent);

      case 'difficulty':
        return createComponent(DifficultyInputComponent);

      case 'select':
        return createComponent(SelectInputComponent);

      case 'button':
        return createComponent(ButtonInputComponent);
    }
  }

  // endregion

  // region Event handling functions

  /**
   * This method is triggered when the user changed the value of the input element.
   * It calls the `setValue` function of the property configuration.
   * @param newValue The changed property value.
   */
  protected onValueChanged(newValue: any): void {
    this.configuration?.setValue(this.data, newValue);
    this.valueChange.emit(newValue);
  }

  // endregion

}
