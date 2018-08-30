import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { UserService } from '../user.service';
import { Comment } from '../models/comment.model';


@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css'],
  providers:[UserService]
})
export class InboxComponent implements OnInit {
  currentUserInbox;
  currentUserID;
  currentUser;
  showOrHideReply;

  constructor(private authService: AuthenticationService, private userService: UserService) { }

  ngOnInit() {

    this.authService.user.subscribe(u => {
      this.currentUserID = u.uid;
      this.currentUserInbox = this.userService.getMessageInboxByUserId(u.uid);
      this.userService.getUserById(u.uid).subscribe(dataLastEmittedFromObserver => {
        this.currentUser = dataLastEmittedFromObserver;
      });
    });
  }

  initiateReply(senderId:string){
    this.showOrHideReply = senderId;
  }


  messageUser(senderId:string, message:string){
    this.showOrHideReply = 0;
    let currentDate = new Date().toString();
    let senderName = this.currentUser.firstName + " " + this.currentUser.lastName;
    let comment = new Comment(senderName, senderId, message, currentDate);
    this.userService.messageUser(comment, this.currentUserID);
  }

  closeMessageBox(){
    this.showOrHideReply = 0;
  }

}
