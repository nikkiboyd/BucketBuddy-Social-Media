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
  editor;
  allCategories = ["Achievement", "Adventure",
"Body & Health","Career","Charity","Creative","Cultural","Events","Family & Kids","Financial","Food & Drink","Personal Development","Relationship","Sports","Travel"];

  constructor(private router: Router, private route: ActivatedRoute, private location: Location, private userService: UserService) { }
  ngOnInit() {
    this.allUsersFromDatabase = this.userService.getUsers();
    this.userBucketList = this.userService.getUserBucketList("-LL07Xxdv1UpH28R383U"
);
    this.userFromDatabase = this.userService.getUserById("-LL07Xxdv1UpH28R383U"
);
    this.userBucketList.subscribe(dataLastEmittedFromObserver => {
      this.userFromDatabaseObject = dataLastEmittedFromObserver;
    });
  };

  changeStatusToTrue(taskTitle:string, completeness: string, keyId:string){
    let index = this.userFromDatabaseObject.findIndex(i => i.title === taskTitle);
    let bucketListTrue = this.userService.getUserBucketListItemById("-LL07Xxdv1UpH28R383U"
, keyId);
    let currentDate = new Date().toString();

      bucketListTrue.update({
        completeness: true,
        dateCompleted: currentDate
      });
    }

    changeStatusToFalse(taskTitle:string, completeness: string, keyId:string){
      let index = this.userFromDatabaseObject.findIndex(i => i.title === taskTitle);
      let bucketListFalse = this.userService.getUserBucketListItemById("-LL07Xxdv1UpH28R383U"
, keyId);

      bucketListFalse.update({
        completeness: false,
        dateCompleted: "N/A"
      });
      }

      saveNewBucketItem(title:string, category: string){
        let currentDate = new Date().toString();
        let newBucketItem = new BucketList(category, false, currentDate, "N/A", title);
        this.userService.addNewBucketItem(newBucketItem, "-LL07Xxdv1UpH28R383U"
);
      }

      deleteBucketItem(bucketItemKey: string){
        this.userService.deleteBucketItem(bucketItemKey);
      }

      enableEditor(bucketItemKey: string){
        this.editor = bucketItemKey;
      }
      editTitle(bucketItemKey: string, newTitle: string){
        this.editor = 0;
        this.userService.updateBucketItemTitle(bucketItemKey, newTitle);
      }
}
