import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'checkAlphabets'
})
export class CheckAlphabetsPipe implements PipeTransform {

  transform(value: any): any {
    if (value.match(/[a-z]/i)) {
      return 'NA';
    }
    return value;
  }
}
