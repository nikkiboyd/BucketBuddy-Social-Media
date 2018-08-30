import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './app.routing';
import { masterFirebaseConfig } from './api-keys';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';


import { AppComponent } from './app.component';
import { BucketListComponent } from './bucket-list/bucket-list.component';
import { UniquePipe } from './unique.pipe';
import { CompletedPipe } from './completed.pipe';
import { NotCompletedPipe } from './notcompleted.pipe';
import { HomeComponent } from './home/home.component';
import { BuddyListComponent } from './buddy-list/buddy-list.component';
import { ProfileUpdateComponent } from './profile-update/profile-update.component';
import { ProfileUserComponent } from './profile-user/profile-user.component';
import { BuddyDetailComponent } from './buddy-detail/buddy-detail.component';
import { MutualBucketItemsComponent } from './mutual-bucket-items/mutual-bucket-items.component';
import { BucketListBuddyComponent } from './bucket-list-buddy/bucket-list-buddy.component';
import { InboxComponent } from './inbox/inbox.component';


export const firebaseConfig = {
  apiKey: masterFirebaseConfig.apiKey,
  authDomain: masterFirebaseConfig.authDomain,
  databaseURL: masterFirebaseConfig.databaseURL,
  storageBucket: masterFirebaseConfig.storageBucket
};

@NgModule({
  declarations: [
    AppComponent,
    BucketListComponent,
    BuddyListComponent,
    UniquePipe,
    CompletedPipe,
    NotCompletedPipe,
    HomeComponent,
    ProfileUpdateComponent,
    ProfileUserComponent,
    BuddyDetailComponent,
    MutualBucketItemsComponent,
    BucketListBuddyComponent,
    InboxComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
