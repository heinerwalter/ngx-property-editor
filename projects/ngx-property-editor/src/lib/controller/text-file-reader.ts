import { detect as detectEncoding, DetectResult } from 'chardet';

export module TextFileReader {

  /**
   * Reads the content of a given file object as string.
   * @param file A text file object which must have been chosen by the user via a file input field.
   * @param encoding A string specifying the encoding of the given file.
   *                 If the encoding is undefined (default), we use `chardet` to detect the file encoding.
   */
  export function readTextFile(file: File, encoding: string | undefined = undefined): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!file)
        return reject('No file selected.');

      // Read content of selected file
      const fileReader = new FileReader();

      function onLoadResolve(e: ProgressEvent<FileReader>): any {
        const fileContent = e.target?.result;
        if (!fileContent || typeof fileContent !== 'string')
          resolve('');
        else
          resolve(fileContent);
      }

      function onLoadDetectEncoding(e: ProgressEvent<FileReader>): any {
        const fileContent = e.target?.result;
        if (!fileContent || !(fileContent instanceof ArrayBuffer))
          resolve('');
        else {
          const detectedEncoding: DetectResult = detectEncoding(new Uint8Array(fileContent));
          if (!detectedEncoding) {
            resolve('');
          } else {
            // Read file again with detected encoding
            readTextFile(file, detectedEncoding).then(resolve).catch(reject);
          }
        }
      }

      if (encoding) {
        // An encoding was given
        fileReader.onload = onLoadResolve;
        fileReader.readAsText(file, encoding);
      } else {
        // No encoding given => detect encoding first
        fileReader.onload = onLoadDetectEncoding;
        fileReader.readAsArrayBuffer(file);
      }
    });
  }

}
