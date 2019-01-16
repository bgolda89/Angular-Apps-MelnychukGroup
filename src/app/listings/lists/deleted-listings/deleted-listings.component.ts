import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import { Listing } from '../../../shared/listing';
import { AngularFireDatabase } from '@angular/fire/database';
import { CrudService } from '../../../shared/crud.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-deleted-listings',
  templateUrl: './deleted-listings.component.html',
  styleUrls: ['./deleted-listings.component.css']
})
export class DeletedListingsComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;   


  hideWhenNoListing: boolean = false; // Hide listings data table when no listing.
  noData: boolean = false;            // Showing No Listing Message, when no listing in database.
  preLoader: boolean = true;          // Showing Preloader to show user data is coming for you from thre server(A tiny UX Shit)

  deleted: Listing[];
  dataSource = new MatTableDataSource(this.deleted);

  displayedColumns: string[] = ['buyerSeller', 'contactInfo', 'propertyInfo', 'price', 'listingID', 'pendingCode', 'expireDate', 'editDelete'];


  constructor(private firebase: AngularFireDatabase, public crudApi: CrudService, private toastr: ToastrService) { }

  ngOnInit() {
    this.dataState(); // Initialize listing's list, when component is ready

    let c = this.crudApi.GetDeletedList(); 
    c.snapshotChanges().subscribe(data => { // Using snapshotChanges() method to retrieve list of data along with metadata($key)
      this.deleted = [];
      data.forEach(item => {
        let a = item.payload.toJSON(); 
        a['$key'] = item.key;
        this.deleted.push(a as Listing);
      })
      this.dataSource = new MatTableDataSource(this.deleted);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }

  // Using valueChanges() method to fetch simple list of listings data. It updates the state of hideWhenNoListing, noData & preLoader variables when any changes occurs in listing data list in real-time.
  dataState() {     
    this.crudApi.GetDeletedList().valueChanges().subscribe(data => {
      this.preLoader = false;
      if(data.length <= 0){
        this.hideWhenNoListing = false;
        this.noData = true;
      } else {
        this.hideWhenNoListing = true;
        this.noData = false;
      }
    })
  }

  // Method to delete listing object
  deleteListing(listing) {
    if (window.confirm('Are sure you want to permenantly delete this listing?')) { // Asking from user before Deleting listing data.
      this.crudApi.DeleteDeletedListing(listing.$key) // Using Delete listing API to delete listing.
      this.toastr.success(listing.buyerSeller + ' Successfully Deleted!'); // Alert message will show up when listing successfully deleted.
    }
  }

  restoreListing(listing) {
    if (window.confirm('Are sure you want to restore this listing?')) { // Asking from user before Deleting listing data.
      this.crudApi.RestoreDeletedListing(listing.$key) // Using Delete listing API to delete listing.
      this.toastr.success(listing.buyerSeller + ' Successfully Restored!'); // Alert message will show up when listing successfully deleted.
    }
  }
}
