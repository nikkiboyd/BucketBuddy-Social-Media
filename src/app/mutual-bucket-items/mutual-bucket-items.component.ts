import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from '../user.service';
import { FirebaseListObservable } from 'angularfire2/database';


@Component({
  selector: 'app-mutual-bucket-items',
  templateUrl: './mutual-bucket-items.component.html',
  styleUrls: ['./mutual-bucket-items.component.css'],
  providers:[UserService]

})
export class MutualBucketItemsComponent implements OnInit {
  itemTitle;
  allUsers;
  bucketItemMatches;

  constructor(private router: Router, private route: ActivatedRoute, private location: Location, private userService: UserService) { }

  ngOnInit() {
    this.route.params.forEach((urlParameters) => {
      this.itemTitle = urlParameters['id'];
    });
    this.userService.getUsers().subscribe(dataLastEmittedFromObserver => {
      this.allUsers = dataLastEmittedFromObserver;
      this.getMutualItems();
    });
  }

  getMutualItems(){

  let usersThatMatchQuery = [];
  let test = "Get 100 Catssfadfs";
      this.allUsers.forEach(user => {
        for (let item in user.bucketlist){
          if(user.bucketlist[item].title == test){
            usersThatMatchQuery.push(user);
          } else{
          }
        }
      });
      this.bucketItemMatches = usersThatMatchQuery;
      console.log(this.bucketItemMatches)
    }

}
