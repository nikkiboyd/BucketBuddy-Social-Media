import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from '../user.service';
import { FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.css'],
  providers: [UserService]
})

export class ProfileUserComponent implements OnInit {
  currentUser;
  currentUserObject;
  // allUsersFromDatabase;

    constructor(private router: Router, private route: ActivatedRoute, private location: Location, private userService: UserService) {
      // this.allUsersFromDatabase = this.userService.getUsers();
      this.currentUser = this.userService.getUserById("0");
      this.currentUser.subscribe(dataLastEmittedFromObserver => {
      this.currentUserObject = dataLastEmittedFromObserver;
});
     }

ngOnInit() {
  //  this.route.params.forEach((urlParameters) => {
  //   this.currentUserId = urlParameters['id'];
  // });
  this.currentUser = this.userService.getUserById("0");
  this.currentUser.subscribe(dataLastEmittedFromObserver => {
    this.currentUserObject = dataLastEmittedFromObserver;
    });
  }
};
