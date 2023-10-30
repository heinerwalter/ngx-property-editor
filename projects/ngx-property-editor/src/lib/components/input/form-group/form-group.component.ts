import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-group',
  templateUrl: './form-group.component.html',
  styleUrls: ['./form-group.component.scss'],
})
export class FormGroupComponent {

  /**
   * Id of the input element which the label of this form group is describing.
   * Only required, if a label is defined.
   */
  @Input() for: string | undefined = undefined;

  /** If not empty a label is displayed at the top of this form group. */
  @Input() label: string | undefined = undefined;

  get labelWithColon(): string | undefined {
    if (!this.label) return undefined;
    // Add colon only if label does not already end with a punctuation mark
    if (':,;?!'.includes(this.label[this.label.length - 1]))
      return this.label;
    return this.label + ':';
  }

  /** If true, label and content are displayed in a grid in one line. */
  @Input() inlineLabel: boolean = false;

  /** If true, the input element is not wrapped inside a FormGroup component. */
  @Input() noFormGroup: boolean = false;

}
