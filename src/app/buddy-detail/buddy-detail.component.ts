import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from '../user.service';
import { FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-buddy-detail',
  templateUrl: './buddy-detail.component.html',
  styleUrls: ['./buddy-detail.component.css'],
  providers: [UserService]
})
export class BuddyDetailComponent implements OnInit {
  currentBuddy;
  currentBuddyId;

  constructor(private router: Router, private route: ActivatedRoute, private location: Location, private userService: UserService) { }

  ngOnInit() {
    this.route.params.forEach((urlParameters) => {
    this.currentBuddyId = urlParameters['id'];
    this.currentBuddy = this.userService.getUserById(this.currentBuddyId);
  }



}
