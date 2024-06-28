import { Component, HostBinding, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

/**
 * The button component contains a <button> element with the bootstrap `.btn` class and
 * some properties to simply style the <button> element.
 *
 * You can either add content to the <button> element by defining the `icon` and `text` properties,
 * or by passing any element as content to the button component.
 */
@Component({
  selector: 'button[ngb-btn]',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit, OnChanges {

  /**
   * The default behavior of the button. Possible values are:
   * - `submit`: The button submits the form data to the server.
   * - `reset`: The button resets all the controls to their initial values, like `<input type="reset">`.
   *            (This behavior tends to annoy users.)
   * - `button` (default): The button has no default behavior, and does nothing when pressed by default.
   *                       It can have client-side scripts listen to the element's events, which are triggered
   *                       when the events occur.
   */
  @HostBinding('type')
  @Input() public type: 'submit' | 'reset' | 'button' = 'button';

  /**
   * Bootstrap "btn..." classes are assigned to the host element of this component
   * via this property and its host binding.
   */
  @HostBinding('class') protected class: string = '';

  /**
   * Define the bootstrap button style class (e.g. "btn-primary") here.
   * You can add any other class which should be applied to the <button> element, too.
   */
  @Input() public buttonClass: string = 'btn-primary';

  /**
   * If `true`, the bootstrap button class `.btn` is not added to this button.
   * Instead you can define the whole button class on your own by assigning it
   * to the `buttonClass` property.
   */
  @Input() public removeBtnButtonClass: boolean = false;

  /**
   * Assign true, if the `.active` class should be added to the <button> element.
   */
  @HostBinding('class.active')
  @HostBinding('attr.aria-current')
  @Input() public active: boolean = false;

  /**
   * Assign true, if the `.disabled` class should be added to the <button> element.
   */
  @HostBinding('class.disabled')
  @HostBinding('attr.aria-disabled')
  @Input() public disabled: boolean = false;

  /**
   * FontAwesome icon displayed on the button.
   *
   * You can either add content to the <button> element by defining the `icon` and `text` properties,
   * or by passing any element as content to the button component.
   */
  @Input() public icon: IconDefinition | undefined = undefined;

  /**
   * Text displayed on the button.
   *
   * You can either add content to the <button> element by defining the `icon` and `text` properties,
   * or by passing any element as content to the button component.
   */
  @Input() public text: string | undefined = undefined;

  public ngOnInit(): void {
    this.updateClass();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('buttonClass') ||
        changes.hasOwnProperty('removeBtnButtonClass')) {
      this.updateClass();
    }
  }

  /**
   * Update the class property and thereby the class attribute of the host element of this component.
   */
  private updateClass(): void {
    this.class = (this.removeBtnButtonClass ? '' : 'btn ') + this.buttonClass;
  }

}
