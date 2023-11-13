export module TextFileReader {

  /**
   * Reads the content of a given file object as string.
   * @param file A text file object which must have been chosen by the user via a file input field.
   * @param encoding A string specifying the encoding of the given file.
   *                 By default, UTF-8 is assumed if this parameter is not specified.
   */
  export function readTextFile(file: File, encoding?: string): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!file)
        return reject('No file selected.');

      // Read content of selected file
      const fileReader = new FileReader();

      fileReader.onload = (e) => {
        const fileContent = e.target?.result;
        if (!fileContent || typeof fileContent !== 'string')
          resolve('');
        else
          resolve(fileContent);
      };

      fileReader.readAsText(file, encoding || 'utf8');
    });
  }

}
