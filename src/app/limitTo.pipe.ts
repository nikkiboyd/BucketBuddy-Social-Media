import {Pipe, PipeTransform} from '@angular/core';
import {User} from './models/user.model';

@Pipe({
  name: "limitTo",
  pure: false
})

export class LimitToPipe implements PipeTransform {
  transform(input: User[]) {
    var output: User[] = [];
    for (var i = 0; i<6; i++) {
      output.push(input[i]);
    }
    return output;
  }
}
