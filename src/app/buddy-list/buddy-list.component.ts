import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FirebaseObjectObservable } from 'angularfire2/database';
import { User } from '../models/user.model';
import { UserService } from '../user.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-buddy-list',
  templateUrl: './buddy-list.component.html',
  styleUrls: ['./buddy-list.component.css'],
  providers: [ UserService ]
})
export class BuddyListComponent implements OnInit {
  private user; //page being viewed
  private userLive;
  private userId; // id of user whose page is being used
  private loggedInUser; // current logged in user
  private loggedInUserLive;
  private loggedInUserId;
  private homeProfile: Boolean = false; // whether we are on the currently logged in user's page or not; true if we are
  private alreadyBuddied: Boolean = false;
  private buddyList;
  private buddyObjects;
  private viewedBuddyList;
  private viewedBuddyObjects;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private userService: UserService,
    private router: Router,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
    this.route.params.forEach((urlParameters) => {
      this.userId = urlParameters['id'];
      });

    this.authService.user.subscribe(u => {
      this.loggedInUserId = u.uid;
      this.userService.getUserById(this.loggedInUserId).subscribe(dataLastEmittedFromObserver => {
        this.loggedInUser = dataLastEmittedFromObserver;
        if (this.userId != undefined) {
          this.homeProfile = false;
          this.userLive = this.userService.getUserById(this.userId);
          this.user = this.userService.getUserById(this.userId).subscribe(dataLastEmittedFromObserver => {
            this.user = dataLastEmittedFromObserver;
            this.buddyList = this.user.friends;
            this.createViewedBuddyObjects();
          });
        } else {
          this.homeProfile = true;
          this.buddyList = this.loggedInUser.friends;
          this.createBuddyObjects();
        }
      });
    });

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

  createViewedBuddyObjects() {
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
    this.loggedInUserLive = this.userService.getUserById(this.loggedInUserId);
    this.buddyList.push(this.userId);
    this.loggedInUserLive.update({friends: this.buddyList});
    this.alreadyBuddied = true;
  }

  deleteBuddy() {
      let index = this.buddyList.indexOf(this.userId);
      this.buddyList.splice(index, 1);
      this.loggedInUserLive = this.userService.getUserById(this.loggedInUserId);
      this.loggedInUserLive.update({friends: this.buddyList});
      this.alreadyBuddied = false;
  }

  goToProfilePage(id) {
    this.router.navigate(['buddy', id]);
  }


  }
