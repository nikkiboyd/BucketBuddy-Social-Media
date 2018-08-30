import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from '../user.service';
import { AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.css'],
  providers: [UserService]
})

export class ProfileUpdateComponent implements OnInit {
  currentUser;
  currentUserID;
  currentUserEmail;

  constructor(private router: Router, private route: ActivatedRoute, private location: Location, private userService: UserService, private authService: AuthenticationService, private database: AngularFireDatabase) { }

  ngOnInit() {
    this.authService.user.subscribe(u => {
      this.currentUserID = u.uid;
      this.currentUserEmail = u.email;
      this.currentUser = this.userService.getUserById(u.uid);
    })
  };

  updateUserProfile(newFirstName: string, newLastName: string, newDob: string, newBio: string, newContact: string, newProfilePicture: string){
    var userEmailpath = this.database.object('users/'+ this.currentUserID);
    userEmailpath.update(
      {
        email: this.currentUserEmail,
        bio: newBio,
        dob: newDob,
        firstName: newFirstName,
        lastName: newLastName,
        contact: newContact,
        profilePicture: newProfilePicture
      })
    this.router.navigate(['profileuser']);
  }
}
