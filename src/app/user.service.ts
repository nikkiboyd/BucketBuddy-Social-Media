import { Injectable } from '@angular/core';
import { User } from './models/user.model';
import { BucketList } from './models/bucketlist.model';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';


@Injectable()
export class UserService {
  users: FirebaseListObservable<any[]>;
  bucketList: FirebaseObjectObservable<any[]>;

  constructor(private database: AngularFireDatabase) {
  this.users = database.list('users')
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
    this.bucketList = this.database.object('users/' + userId + '/bucketlist/')
    this.bucketList.child("test");
  }

  updateDatabase(newUser: User){
    this.users.push(newUser);
  }
}
