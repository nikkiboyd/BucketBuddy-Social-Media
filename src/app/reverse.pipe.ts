import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'reverse',
  pure: false
})
export class ReversePipe {
  transform (values) {
    if (values) {
      return values.reverse();
    }
  }
}
