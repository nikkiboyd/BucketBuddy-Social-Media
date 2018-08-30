import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from '../user.service';
import { FirebaseListObservable } from 'angularfire2/database';
import { Comment } from '../models/comment.model';
import { AuthenticationService } from '../authentication.service';



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
  currentUser;
  currentUserID;

  constructor(private router: Router, private route: ActivatedRoute, private location: Location, private userService: UserService, private authService: AuthenticationService) { }


  ngOnInit() {
    this.route.params.forEach((urlParameters) => {
      this.itemTitle = urlParameters['id'];
    });
    this.userService.getUsers().subscribe(dataLastEmittedFromObserver => {
      this.allUsers = dataLastEmittedFromObserver;
      this.getMutualItems();
    });
    this.authService.user.subscribe(u => {
      this.currentUserID = u.uid;
      this.currentUser = this.userService.getUserById(u.uid);
    })
  }

  getMutualItems(){
  let usersThatMatchQuery = [];
      this.allUsers.forEach(user => {
        for (let item in user.bucketlist){
          if(user.bucketlist[item].title == this.itemTitle){
            usersThatMatchQuery.push(user);
          } else{
          }
        }
      });
      this.bucketItemMatches = usersThatMatchQuery;
    }

messageUser(senderName:string, senderId:string, userId:string, message:string){
  let currentDate = new Date().toString();
  let comment = new Comment(senderName, senderId, message, currentDate, "false");
  console.log(comment);
  // this.userService.messageUser(userId, message);
}
}
