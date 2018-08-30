import { Injectable } from '@angular/core';
import { User } from './models/user.model';
import { BucketList } from './models/bucketlist.model';
import { AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import { Comment } from './models/comment.model';


@Injectable()
export class UserService {
  users: FirebaseListObservable<any[]>;
  bucketList: FirebaseListObservable<any[]>;
  userToMessage: FirebaseListObservable<any[]>;

  constructor(private database: AngularFireDatabase) {
  this.users = database.list('users');
  }

  addUser(newUser: User) {
    this.users.push(newUser);
  }

  getUsers(){
    return this.users;
  }

  createNewUserInTable(userId: string, userEmail: string){
    var userEmailpath = this.database.object('users/'+userId);
    userEmailpath.set(
      {
        email: userEmail,
        bio: "",
        age: "",
        bucketlist: [""],
        comments: [""],
        userName: "",
        friends: [""],
        firstName: "newFirstName",
        lastname: "newLastName",
        contact: ""
      }
    );
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

  deleteBucketItem(bucketItemId: string, currentUserId: string){
    let userId = currentUserId;
    let bucketListItem = this.database.object('users/' + userId + '/bucketlist/' + bucketItemId);
    bucketListItem.remove();
  }

  updateBucketItemTitle(bucketItemId:string, newTitle:string, currentUserId: string){
    let userId = currentUserId;
    let bucketListItem = this.database.object('users/' + userId + '/bucketlist/' + bucketItemId);
    bucketListItem.update({
      title: newTitle
    });
  }

  messageUser(comment: Comment, userId: string){
    this.userToMessage = this.database.list('users/' + userId + '/comments');
    this.userToMessage.push(comment);
  }

  getMessageInboxByUserId(userId:string){
    return this.database.list('users/' + userId + '/comments');
  }
}
