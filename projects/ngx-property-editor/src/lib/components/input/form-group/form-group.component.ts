import { Component, Input } from '@angular/core';

@Component({
  selector: 'pe-form-group',
  templateUrl: './form-group.component.html',
  styleUrls: ['./form-group.component.scss'],
})
export class FormGroupComponent {

  /**
   * ID of the input element which the label of this form group is describing.
   * Only required, if a label is defined.
   */
  @Input() public for: string | undefined = undefined;

  /** If not empty a label is displayed at the top of this form group. */
  @Input() public label: string | undefined = undefined;

  public get labelWithColon(): string | undefined {
    if (!this.label) return undefined;
    // Add colon only if label does not already end with a punctuation mark
    if (':,;?!'.includes(this.label[this.label.length - 1]))
      return this.label;
    return this.label + ':';
  }

  /** If true, label and content are displayed in a grid in one line. */
  @Input() public inlineLabel: boolean = false;

  /** If not empty, an `InfoIconComponent` is added to the end of the label with this text as tooltip. */
  @Input() public infoIconTooltip: string | undefined = undefined;

  /**
   * If not empty, a `FormTextComponent` is added below the form group content (last child element
   * of the form group) with this text as content.
   */
  @Input() public helpText: string | undefined = undefined;

  /** If true, the input element is not wrapped inside a FormGroup component. */
  @Input() public noFormGroup: boolean = false;

}
