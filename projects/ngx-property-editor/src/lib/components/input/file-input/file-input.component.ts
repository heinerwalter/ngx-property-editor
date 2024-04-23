import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InputBase } from '../input-base';
import { TextFileReader } from '../../../controller/text-file-reader';


/**
 * Event argument type of the `FileInputComponent.fileContent` event.
 */
export type FileInputFileContentType = {
  /** The file object selected by the user. */
  file: File,
  /** The content of the file or undefined, if reading failed. */
  fileContent: string | undefined,
}


@Component({
  selector: 'pe-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss'],
})
export class FileInputComponent extends InputBase {

  /**
   * Define the file type (extension or MIME type of files you want to accept in this file input, e.g. ".txt").
   * You may define one file type or a comma-separated list of multiple file types.
   */
  @Input() public accept: string | undefined = undefined;
  /** If true, accept multi file selection (default: false). */
  @Input() public multiple: boolean = false;

  /**
   * The selected files.
   */
  public files: File[] = [];

  /**
   * This event is triggered when the user selected one or multiple files.
   * The selected files are passed as event argument.
   */
  @Output() public readonly valueChange: EventEmitter<File[]> = new EventEmitter<File[]>();

  /**
   * If true, the content of selected file(s) is read as string and returned by the `fileContent` event.
   */
  @Input() public readFileContent: boolean = false;

  /**
   * If `readFileContent` is true, the content of selected file(s) is read as string and returned by this event.
   * If a file failed to be read, the error message is printed to the console and instead of the file content
   * undefined is returned by this event. Additionally, to the file content, the file object itself is returned
   * by this event, too. This event is emitted after `valueChange` and the length of the event argument array
   * is the same as the event argument of `valueChange`.
   * @see FileInputFileContentType
   */
  @Output() public readonly fileContent: EventEmitter<FileInputFileContentType[]> = new EventEmitter<FileInputFileContentType[]>();

  /**
   * The user selected one or multiple file.
   */
  protected async onChange(event: Event): Promise<void> {
    const inputElement = event?.target as HTMLInputElement;
    if (!inputElement) return;

    // Emit selected File objects
    this.files = inputElement.files?.length ? Array.from(inputElement.files) : [];
    this.valueChange.emit(this.files);

    // If requested, read and emit file contents
    if (this.readFileContent) {
      const fileContents: FileInputFileContentType[] = [];
      for (const file of this.files) {
        let fileContent: string | undefined = undefined;
        try {
          fileContent = await TextFileReader.readTextFile(file);
        } catch (error) {
          console.error(error);
        }
        fileContents.push({ file, fileContent });
      }

      this.fileContent.emit(fileContents);
    }
  }

}
