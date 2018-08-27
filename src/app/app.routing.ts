import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BucketListComponent } from './bucket-list/bucket-list.component';

const appRoutes: Routes = [
  {
     path: '',
     component: HomeComponent
   },
   {
      path: 'bucketlist',
      component: BucketListComponent
    }
 ];

 export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
