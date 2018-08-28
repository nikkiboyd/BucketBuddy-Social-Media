import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from './user.service';
import { User } from './models/user.model';
import { BucketList } from './models/bucketlist.model';
import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService, AuthenticationService]
})

export class AppComponent implements OnInit {
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
        this.router.navigate([]);
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
