import { Pipe, PipeTransform } from '@angular/core';
import { BucketList } from './models/bucketlist.model';
import * as _ from 'lodash';

@Pipe({
  name: 'notCompleted',
  pure: false
})

export class NotCompletedPipe implements PipeTransform {

  transform(input: BucketList[]){
    let filteredArray = [];
      if(input !== null){
    input.forEach(function(element){
          if(element.completeness == false){
            filteredArray.push(element);
          } else {
          }
    });
    return filteredArray;
  }};
}
