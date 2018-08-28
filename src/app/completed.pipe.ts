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
    if(input !== null){
      input.forEach(function(element){
            if(element.completeness == true){
              filteredArray.push(element);
              console.log(element.completeness)
            } else {
            }
      });
    }

    return filteredArray;
  }
}
