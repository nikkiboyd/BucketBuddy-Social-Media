import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from '../user.service';
import { User } from '../models/user.model';
import { BucketList } from '../models/bucketlist.model';
import { AuthenticationService } from '../authentication.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [UserService, AuthenticationService]
})

export class HomeComponent implements OnInit {
  private user;
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
        console.log(user.uid);
        let userFromTable = this.userService.getUserById(user.uid);
        //this if isn't working yet, it routes every new login to createNewUserInTable, need to determine if user exisits yet.
        if(typeof(userFromTable.email) == 'undefined'){
        console.log("the user should be sent to the users table. uid and email is " user.uid + user.email);
        this.userService.createNewUserInTable(user.uid, user.email);
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
  }

  logout() {
    this.authService.logout();
  }
}
