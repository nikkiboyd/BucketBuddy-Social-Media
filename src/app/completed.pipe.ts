import { Pipe, PipeTransform } from '@angular/core';
import { BucketList } from './models/bucketlist.model';
import * as _ from 'lodash';

@Pipe({
  name: 'Completed',
  pure: false
})

export class CompletedPipe implements PipeTransform {

  transform(input: BucketList[]){
    let filteredArray = [];
    input.forEach(function(element){
          if(element.completeness == true){
            filteredArray.push(element);
          } else {
          }
    });
    return filteredArray;
  }
}
