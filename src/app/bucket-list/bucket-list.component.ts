import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from '../user.service';
import { FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-bucket-list',
  templateUrl: './bucket-list.component.html',
  styleUrls: ['./bucket-list.component.css'],
  providers: [UserService]
})
export class BucketListComponent implements OnInit {
  userFromDatabase;
  userFromDatabaseObject;
  allUsersFromDatabase;

  constructor(private router: Router, private route: ActivatedRoute, private location: Location, private userService: UserService) { }
  ngOnInit() {
    this.allUsersFromDatabase = this.userService.getUsers();
    this.userFromDatabase = this.userService.getUserById("0");
    this.userFromDatabase.subscribe(dataLastEmittedFromObserver => {
      this.userFromDatabaseObject = dataLastEmittedFromObserver;
    });
  };

  changeStatusToTrue(taskTitle:string, completeness: string){
    console.log(completeness);

    let index = this.userFromDatabaseObject.bucketlist.findIndex(i => i.title === taskTitle);
    let test = this.userService.getUserBucketListItemById("0", index);

      test.update({
        completeness: true,
      });
    }

    changeStatusToFalse(taskTitle:string, completeness: string){
      console.log(completeness);

      let index = this.userFromDatabaseObject.bucketlist.findIndex(i => i.title === taskTitle);
      let test = this.userService.getUserBucketListItemById("0", index);

      test.update({
        completeness: false,
      });
      }
}
