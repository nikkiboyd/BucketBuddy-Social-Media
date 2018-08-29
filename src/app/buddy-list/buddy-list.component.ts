import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FirebaseObjectObservable } from 'angularfire2/database';
import { User } from '../models/user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-buddy-list',
  templateUrl: './buddy-list.component.html',
  styleUrls: ['./buddy-list.component.css'],
  providers: [ UserService ]
})
export class BuddyListComponent implements OnInit {
  private user;
  private userId;
  private loggedInUser;
  private loggedIn: Boolean = true;
  private alreadyBuddied: Boolean = false;
  private buddyList;
  private buddyObjects;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.forEach((urlParameters) => {
    this.userId = "0"; //urlParameters['id'];
    });

    this.user = this.userService.getUserById('0');
    // here we will send the userId via the URL
    this.loggedInUser = this.userService.getUserById('0');
    // here we will send the userId via the permanent logged in user Id established at authentication
    this.loggedInUser.subscribe(dataLastEmittedFromObserver => {
      this.buddyList = dataLastEmittedFromObserver.friends;
      this.createBuddyObjects();
    });


    //
    // this.loggedInUser.subscribe(loggedInUser => {
    //   if (loggedInUser == null) {
    //     this.loggedIn = false;
    //   } else {
    //     this.loggedIn = true;
    //   }
    // })
  }

  createBuddyObjects() {
    let tempBuddyObjects = [];
    this.buddyList.forEach((buddyId) => {
    let buddyToAdd; this.userService.getUserById(buddyId).subscribe(dataLastEmittedFromObserver => {
      buddyToAdd = dataLastEmittedFromObserver;
      tempBuddyObjects.push(buddyToAdd);
    });
    this.buddyObjects = tempBuddyObjects;
    });
  }

  addBuddy() {
    this.buddyList.push(this.userId);
    let theUser = this.userService.getUserById('0');
    // here we will send in the userId via the loggedInUser
    theUser.update({friends: this.buddyList});
    this.alreadyBuddied = true;
  }

  deleteBuddy() {
      let index = this.buddyList.indexOf(this.userId);
      this.buddyList.splice(index, 1);
      console.log(this.buddyList);
      let theUser = this.userService.getUserById('0');
      theUser.update({friends: this.buddyList});
      this.alreadyBuddied = false;
  }

  // goToProfilePage(clickedBuddy: User) {
  //   this.router.navigate(['profileuser', clickedBuddy.id])
  // }

  }

  // Need to find buddy info for display via id
