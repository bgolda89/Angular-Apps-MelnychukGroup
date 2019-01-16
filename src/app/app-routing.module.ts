import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ListingsListComponent } from './listings/lists/listings-list/listings-list.component';
import { EditListingComponent } from './listings/edit-listing/edit-listing.component';
import { AddListingComponent } from './listings/add-listing/add-listing.component';
import { TestComponent } from './test/test.component';
import { DeletedListingsComponent } from './listings/lists/deleted-listings/deleted-listings.component';
import { ListsComponent } from './listings/lists/lists.component';
import { MonitorOneComponent } from './tv/monitor-one/monitor-one.component';
import { MonitorTwoComponent } from './tv/monitor-two/monitor-two.component';

const routes: Routes = [
  { path: '', redirectTo: '/add-listing', pathMatch: 'full' },
  { path: 'active-listings', component: ListingsListComponent },
  { path: 'deleted-listings', component: DeletedListingsComponent },
  { path: 'monitor-one', component: MonitorOneComponent },
  { path: 'monitor-two', component: MonitorTwoComponent },
  { path: 'lists', component: ListsComponent },
  { path: 'test', component: TestComponent },
  { path: 'add-listing', component: AddListingComponent },
  { path: 'edit-listing/:id', component: EditListingComponent }
];

@NgModule({
  imports: [CommonModule,RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
