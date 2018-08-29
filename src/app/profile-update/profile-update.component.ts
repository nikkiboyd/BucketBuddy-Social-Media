import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from '../user.service';
// import { FirebaseListObservable } from 'angularfire2/database';
var firebase = require('firebase');
var firebaseui = require('firebaseui');

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.css'],
  providers: [UserService]
})

export class ProfileUpdateComponent implements OnInit {
  currentUser;
  // userFromDb = firebase.auth().currentUser;

  constructor(private router: Router, private route: ActivatedRoute, private location: Location, private userService: UserService) { }

  ngOnInit() {
    this.currentUser = this.userService.getUserById("0");

    // var userFromDb = firebase.auth().currentUser;
    // var userId = userFromDb.uid
    // console.log(userFromDb.uid)
  }

  updateUserProfile(newName: string, newAge: string, newBio: string){
    this.currentUser.update({
      name: newName,
      age: newAge,
      bio: newBio
    });
      // var userFromDb = firebase.auth().currentUser;
      // var userId = userFromDb.uid
      // console.log(userFromDb.uid)


  }



}
