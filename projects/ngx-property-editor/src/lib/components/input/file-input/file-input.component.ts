import { Component, Input, EventEmitter, Output } from '@angular/core';
import { InputBase } from '../input-base';

@Component({
  selector: 'npe-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss'],
})
export class FileInputComponent extends InputBase {

  /** Define the file type (extension you want to accept in this file input (e.g. ".txt"). */
  @Input() accept: string | undefined = undefined;
  /** If true, accept multi file selection (default: false). */
  @Input() multiple: boolean = false;

  /**
    * This event is triggered when the user selected on or multiple files.
    * The selected files are passed as event argument.
    */
  @Output() readonly valueChange: EventEmitter<File[]> = new EventEmitter<File[]>();

  /**
   * The user selected one or multiple file.
   */
  onChange(event: Event) {
    const inputElement = event?.target as HTMLInputElement;
    if (!inputElement) return;

    this.valueChange.emit(inputElement.files?.length ? Array.from(inputElement.files) : []);
  }

}
