import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from '../user.service';
import { BucketList } from '../models/bucketlist.model';
import { FirebaseListObservable } from 'angularfire2/database';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-bucket-list-buddy',
  templateUrl: './bucket-list-buddy.component.html',
  styleUrls: ['./bucket-list-buddy.component.css'],
  providers: [UserService]
})
export class BucketListBuddyComponent implements OnInit {
  buddyId
  userFromDatabase;
  userFromDatabaseObject;
  allUsersFromDatabase;
  userBucketList;
  editor;
  currentUserID
  currentUser;

constructor(private router: Router, private route: ActivatedRoute, private location: Location, private userService: UserService, private authService: AuthenticationService) { }

  ngOnInit() {
    this.route.params.forEach((urlParameters) => {
      this.buddyId = urlParameters['id'];
      console.log("the id from the url is " + this.buddyId)
      this.userBucketList = this.userService.getUserBucketList(this.buddyId);
    });
  }

}
