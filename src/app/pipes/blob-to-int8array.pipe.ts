import { Pipe, PipeTransform } from '@angular/core';
import { Pdf } from '../interfaces/pdf';

@Pipe({
  name: 'blobToInt8array',
  standalone: true
})
export class BlobToInt8arrayPipe implements PipeTransform {

  transform(value: Pdf | null | undefined): Uint8Array {
    if (value) {
      var raw = atob(value.data);
      var rawLength = raw.length;
      var array = new Uint8Array(new ArrayBuffer(rawLength));
      for (var i = 0; i < rawLength; i += 1) {
        array[i] = raw.charCodeAt(i);
      }
      return array;
    }
    throw Error("No pdf supplied");
  }

}
