import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from '../user.service';
import { FirebaseListObservable } from 'angularfire2/database';
import { AuthenticationService } from '../authentication.service';
// var firebase = require('firebase');
// var firebaseui = require('firebaseui');

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.css'],
  providers: [UserService]
})

export class ProfileUserComponent implements OnInit {
  user;
  userId;

  constructor(private router: Router, private route: ActivatedRoute, private location: Location, private userService: UserService, public authService: AuthenticationService) {}

  ngOnInit() {
    this.user = this.authService.user;
    // this.userId = this.user.uid
    console.log("this is in the init " + this.user.email)

  };
    console.log("this is after the init" + this.user.email)

}
