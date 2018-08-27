import { Injectable } from '@angular/core';
import { User } from './models/user.model';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';


@Injectable()
export class UserService {
  users: FirebaseListObservable<any[]>;

  constructor(private database: AngularFireDatabase) {
  this.users = database.list('users')
  }

  getUsers(){
    return this.users;
  }

  getUserById(userId: string) {
    return this.database.object('users/' + userId);
  }

  updateDatabase(newUser: User){
    this.users.push(newUser);
  }
}
