import { Component, OnInit, ViewChild } from '@angular/core';
import { CrudService } from '../../../shared/crud.service';  // CRUD API service class
import { Listing } from '../../../shared/listing';   // Listing interface class for Data types.
import { ToastrService } from 'ngx-toastr';      // Alert message using NGX toastr
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-listings-list',
  templateUrl: './listings-list.component.html',
  styleUrls: ['./listings-list.component.css']
})

export class ListingsListComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;   

  
  listing: Listing[];                 // Save listings data in Listing's array.
  
  hideWhenNoListing: boolean = false; // Hide listings data table when no listing.
  noData: boolean = false;            // Showing No Listing Message, when no listing in database.
  preLoader: boolean = true;          // Showing Preloader to show user data is coming for you from thre server(A tiny UX Shit)
  

  dataSource = new MatTableDataSource(this.listing);

  displayedColumns: string[] = ['listingType', 'buyerSeller', 'contactInfo', 'propertyInfo', 'listingRegion','price', 'listingID', 'pendingCode', 'expireDate','creationTS', 'editDelete'];

  constructor(
    public crudApi: CrudService, // Inject listing CRUD services in constructor.
    private toastr: ToastrService // Toastr service for alert message
    ){ }

  ngOnInit() {
    this.dataState(); // Initialize listing's list, when component is ready
    let s = this.crudApi.GetListingsList(); 
    s.snapshotChanges().subscribe(data => { // Using snapshotChanges() method to retrieve list of data along with metadata($key)
      this.listing = [];
      data.forEach(item => {
        let a = item.payload.toJSON(); 
        a['$key'] = item.key;
        this.listing.push(a as Listing);
      })
      this.dataSource = new MatTableDataSource(this.listing);
      this.dataSource.sort = this.sort;  
      this.dataSource.paginator = this.paginator;
    })
  }

  // Using valueChanges() method to fetch simple list of listings data. It updates the state of hideWhenNoListing, noData & preLoader variables when any changes occurs in listing data list in real-time.
  dataState() {     
    this.crudApi.GetListingsList().valueChanges().subscribe(data => {
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
    if (window.confirm('Are sure you want to delete this listing ?')) { // Asking from user before Deleting listing data.
      this.crudApi.DeleteListing(listing.$key) // Using Delete listing API to delete listing.
      this.toastr.success(listing.buyerSeller + ' Successfully deleted!'); // Alert message will show up when listing successfully deleted.
    }
  }
}
