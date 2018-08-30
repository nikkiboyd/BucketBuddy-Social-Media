import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css'],
  providers:[UserService]
})
export class InboxComponent implements OnInit {
  currentUserInbox;
  currentUserID;

  constructor(private authService: AuthenticationService, private userService: UserService) { }

  ngOnInit() {

    this.authService.user.subscribe(u => {
      this.currentUserID = u.uid;
      this.currentUserInbox = this.userService.getMessageInboxByUserId(u.uid);
      console.log(this.currentUserInbox)
    })
  }

}
