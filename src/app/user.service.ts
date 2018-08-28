import { Injectable } from '@angular/core';
import { User } from './models/user.model';
import { BucketList } from './models/bucketlist.model';
import { AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';


@Injectable()
export class UserService {
  users: FirebaseListObservable<any[]>;
  bucketList: FirebaseListObservable<any[]>;

  constructor(private database: AngularFireDatabase) {
  this.users = database.list('users')
  }

  addUser(newUser: User) {
    this.users.push(newUser);
  }

  getUsers(){
    return this.users;
  }

  getUserById(userId: string) {
    return this.database.object('users/' + userId);
  }

  getUserBucketListItemById(userId: string, bucketItemIndex: string) {
    return this.database.object('users/' + userId + '/bucketlist/' + bucketItemIndex);
  }

  getUserBucketList(userId: string) {
    return this.database.list('users/' + userId + '/bucketlist/')
  }

  addNewBucketItem(newBucketItem: BucketList, userId: string){
    this.bucketList = this.database.list('users/' + userId + '/bucketlist/');
    this.bucketList.push(newBucketItem);
  }

  deleteBucketItem(bucketItemId: string){
    let userId = "0";
    let bucketListItem = this.database.object('users/' + userId + '/bucketlist/' + bucketItemId);
    bucketListItem.remove();
  }

  updateBucketItemTitle(bucketItemId:string, newTitle:string){
    let userId = "0";
    let bucketListItem = this.database.object('users/' + userId + '/bucketlist/' + bucketItemId);
    bucketListItem.update({
      title: newTitle
    });
  }
}
