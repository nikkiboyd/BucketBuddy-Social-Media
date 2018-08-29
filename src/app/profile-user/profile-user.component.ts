import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from '../user.service';
import { FirebaseListObservable } from 'angularfire2/database';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.css'],
  providers: [UserService]
})

export class ProfileUserComponent implements OnInit {
  currentUser;
  currentUserID;


  constructor(private router: Router, private route: ActivatedRoute, private location: Location, private userService: UserService, private authService: AuthenticationService) {}

  ngOnInit() {
    this.authService.user.subscribe(u => {
      this.currentUserID = u.uid;
      this.currentUser = this.userService.getUserById(this.currentUserID);
    })
  };

}
