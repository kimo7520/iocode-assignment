import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeUndescore',
  standalone: true
})
export class RemoveUndescorePipe implements PipeTransform {

  transform(value: string): string {
    return value.split('_').join(' ');
  }

}
