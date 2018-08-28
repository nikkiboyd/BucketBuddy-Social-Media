import { Component, OnInit} from '@angular/core';
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
export class BucketListComponent implements OnInit{
  userFromDatabase;
  userFromDatabaseObject;
  allUsersFromDatabase;
  userBucketList;
  allCategories = ["Achievement", "Adventure",
"Body & Health","Career","Charity","Creative","Cultural","Events","Family & Kids","Financial","Food & Drink","Personal Development","Relationship","Sports","Travel"];

  constructor(private router: Router, private route: ActivatedRoute, private location: Location, private userService: UserService) { }
  ngOnInit() {
    this.allUsersFromDatabase = this.userService.getUsers();
    this.userBucketList = this.userService.getUserBucketList("0");
    this.userFromDatabase = this.userService.getUserById("0");
    this.userBucketList.subscribe(dataLastEmittedFromObserver => {
      this.userFromDatabaseObject = dataLastEmittedFromObserver;
    });
  };

  changeStatusToTrue(taskTitle:string, completeness: string, keyId:string){
    let index = this.userFromDatabaseObject.findIndex(i => i.title === taskTitle);
    let bucketListTrue = this.userService.getUserBucketListItemById("0", keyId);

      bucketListTrue.update({
        completeness: true,
      });
    }

    changeStatusToFalse(taskTitle:string, completeness: string, keyId:string){
      let index = this.userFromDatabaseObject.findIndex(i => i.title === taskTitle);
      let bucketListFalse = this.userService.getUserBucketListItemById("0", keyId);

      bucketListFalse.update({
        completeness: false,
      });
      }

      saveNewBucketItem(title:string, category: string){
        let currentDate = new Date().toString();
        let newBucketItem = new BucketList(category, false, currentDate, title);
        this.userService.addNewBucketItem(newBucketItem, "0");
      }

      deleteBucketItem(bucketItemKey: string){
        this.userService.deleteBucketItem(bucketItemKey);
      }
}
