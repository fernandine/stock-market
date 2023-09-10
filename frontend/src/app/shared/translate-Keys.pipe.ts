import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translateKeys'
})
export class TranslateKeysPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (!value) return value;

    const translatedKeys: any = {};

    for (const key in value) {
      if (value.hasOwnProperty(key)) {
        switch (key) {
          case '1. open':
            translatedKeys['abertura'] = value[key];
            break;
          case '4. close':
            translatedKeys['fechamento'] = value[key];
            break;
          case '2. high':
            translatedKeys['máxima'] = value[key];
            break;
          case '3. low':
            translatedKeys['mínimo'] = value[key];
            break;
          default:
            translatedKeys[key] = value[key];
            break;
        }
      }
    }

    return translatedKeys;
  }
}

