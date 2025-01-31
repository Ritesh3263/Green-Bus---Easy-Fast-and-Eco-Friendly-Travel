import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'separate'
})
export class SeparatePipe implements PipeTransform {
  transform(value: any[], separator: string = ', '): string {
    if (!value || !Array.isArray(value)) {
      return '';
    }
    return value.map(item => item.label).join(separator);
  }
}
