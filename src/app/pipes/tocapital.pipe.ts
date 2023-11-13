import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tocapital',
})
export class TocapitalPipe implements PipeTransform {
  transform(value: string): string {
    return value.toUpperCase();
  }
}
