import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayConstructor'
})
export class ArrayConstructorPipe<T> implements PipeTransform {
  transform(value: T) {
    return Array(value);
  }
}
