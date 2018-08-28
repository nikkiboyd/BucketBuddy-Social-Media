import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BucketListComponent } from './bucket-list/bucket-list.component';
import { HomeComponent } from './home/home.component';

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
