import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from '../user.service';
import { User } from '../models/user.model';
import { BucketList } from '../models/bucketlist.model';
import { AuthenticationService } from '../authentication.service';
var firebase = require('firebase');
var firebaseui = require('firebaseui');

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [UserService, AuthenticationService]
})

export class HomeComponent implements OnInit {
  user;
  private isLoggedIn: Boolean;
  private userName: String;

  constructor(public authService: AuthenticationService, private router: Router, private userService: UserService) {
    this.authService.user.subscribe(user => {
      if (user == null) {
        this.isLoggedIn = false;
        this.router.navigate(['/']);
      } else {
        this.isLoggedIn = true;
        this.userName = user.displayName;
        let userFromTable = this.userService.getUserById("0");
        console.log("the current user id is " + user.email)
        console.log(userFromTable.email)
        // this if isn't working, it should pull the email from the users table based on the uid from the userAuth table
        if(typeof(userFromTable.email) == 'undefined'){
          userService.createNewUserInTable(user.uid, user.email);
          this.router.navigate(['profileuser/update']);
        } else {
          this.router.navigate(['profileuser']);
        }
      }
    });
  }

  ngOnInit() {
  }

  createUser(username: string, password: string, firstName: string, lastName: string, phone: number, email: string, dob: Date, bio: string, bucketList: BucketList[], comments: string[], friends: string[]) {
    let newUser: User = new User(username, password, firstName, lastName, phone, email, dob, bio, bucketList, comments, friends);
    this.userService.addUser(newUser);
  }

  login() {
    this.authService.login();
    //if to route new users to profile update page
    //route exisiting users to profile page
  }

  logout() {
    this.authService.logout();
  }
}
