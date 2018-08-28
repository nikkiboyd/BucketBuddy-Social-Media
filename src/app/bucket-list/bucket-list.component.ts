import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from '../user.service';
import { BucketList } from '../models/bucketlist.model';
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
  allUsersFromDatabaseObject;
  allCategories = [];

  constructor(private router: Router, private route: ActivatedRoute, private location: Location, private userService: UserService) { }
  ngOnInit() {
    this.allUsersFromDatabase = this.userService.getUsers();
    let categoryList = [];
    this.allUsersFromDatabase.subscribe(dataLastEmittedFromObserver => {
      dataLastEmittedFromObserver.forEach(function(user){
        for(let r = 0; r < user.bucketlist.length; r++){
          categoryList.push(user.bucketlist[r].category);
        }
      });
      this.allCategories = categoryList;
    });
    this.userFromDatabase = this.userService.getUserById("0");
    this.userFromDatabase.subscribe(dataLastEmittedFromObserver => {
      this.userFromDatabaseObject = dataLastEmittedFromObserver;
    });
  };

  changeStatusToTrue(taskTitle:string, completeness: string){
    let index = this.userFromDatabaseObject.bucketlist.findIndex(i => i.title === taskTitle);
    let bucketListTrue = this.userService.getUserBucketListItemById("0", index);

      bucketListTrue.update({
        completeness: true,
      });
    }

    changeStatusToFalse(taskTitle:string, completeness: string){
      let index = this.userFromDatabaseObject.bucketlist.findIndex(i => i.title === taskTitle);
      let bucketListFalse = this.userService.getUserBucketListItemById("0", index);

      bucketListFalse.update({
        completeness: false,
      });
      }

      saveNewBucketItem(title:string, category: string){
        let currentDate = new Date().toString();
        let newBucketItem = new BucketList(category, false, currentDate, title);
        let bucketList = this.userService.getUserBucketList("0");
        this.userService.addNewBucketItem(newBucketItem, "0");

      }
}
