import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from '../environments/environment';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { ReactiveFormsModule } from '@angular/forms';  

import { MatTableModule, MatSortModule, MatCardModule, MatProgressSpinnerModule, MatMenuModule, MatIconModule, MatToolbarModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatPaginatorModule, MatSidenavModule, MatListModule } from '@angular/material';

import { DeletedListingsComponent } from './listings/lists/deleted-listings/deleted-listings.component';
import { ListingsListComponent } from './listings/lists/listings-list/listings-list.component';

import { AddListingComponent } from './listings/add-listing/add-listing.component';
import { EditListingComponent } from './listings/edit-listing/edit-listing.component';

import { TestComponent } from './test/test.component';
import { DatePipe } from '@angular/common';
import { CondoListComponent } from './listings/lists/condo-list/condo-list.component';
import { ListsComponent } from './listings/lists/lists.component';
import { SfHomesListComponent } from './listings/lists/sf-homes-list/sf-homes-list.component';
import { BuyersListComponent } from './listings/lists/buyers-list/buyers-list.component';
import { SellersListComponent } from './listings/lists/sellers-list/sellers-list.component';
import { CdkTableModule } from '@angular/cdk/table';
import { MainNavComponent } from './core/main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MonitorOneComponent } from './tv/monitor-one/monitor-one.component';
import { MonitorTwoComponent } from './tv/monitor-two/monitor-two.component';


@NgModule({
  declarations: [
    AppComponent,
    ListingsListComponent,
    AddListingComponent,
    EditListingComponent,
    TestComponent,
    DeletedListingsComponent,
    CondoListComponent,
    ListsComponent,
    SfHomesListComponent,
    BuyersListComponent,
    SellersListComponent,
    MainNavComponent,
    MonitorOneComponent,
    MonitorTwoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot(), 
    ReactiveFormsModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatSidenavModule,
    MatListModule,
    MatPaginatorModule,
    AngularFirestoreModule,
    CdkTableModule,
    LayoutModule,
    
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
