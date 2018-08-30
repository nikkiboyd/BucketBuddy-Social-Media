import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from '../user.service';
import { FirebaseListObservable } from 'angularfire2/database';
import { Comment } from '../models/comment.model';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.css'],
  providers:[UserService]
})
export class MessageBoxComponent implements OnInit {
  buddyId;
  currentUser;
  currentUserID;

  constructor(private router: Router, private route: ActivatedRoute, private location: Location, private userService: UserService, private authService: AuthenticationService) { }

  ngOnInit() {
    this.route.params.forEach((urlParameters) => {
      this.buddyId = urlParameters['id'];
    });

    this.authService.user.subscribe(u => {
      this.currentUserID = u.uid;
      this.userService.getUserById(u.uid).subscribe(dataLastEmittedFromObserver => {
        this.currentUser = dataLastEmittedFromObserver;
      });;
    })
  }

  messageUser(message:string){
    let currentDate = new Date().toString();
    let senderName = this.currentUser.firstName + " " + this.currentUser.lastName;
    let comment = new Comment(senderName, this.currentUser.$key, message, currentDate);
    this.userService.messageUser(comment, this.buddyId);
  }

}
