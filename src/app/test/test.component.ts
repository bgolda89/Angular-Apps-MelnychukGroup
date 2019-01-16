import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { AngularFireDatabase } from '@angular/fire/database';
import { DatePipe } from '@angular/common';
import { CrudService } from '../shared/crud.service';
import { Listing } from '../shared/listing';



@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  // @ViewChild(MatSort) sort: MatSort;
  @ViewChild('condoTableSort') public condoTableSort: MatSort;
  @ViewChild('homeTableSort') public homeTableSort: MatSort;
  @ViewChild('buyerTableSort') public buyerTableSort: MatSort;
  @ViewChild('sellerTableSort') public sellerTableSort: MatSort;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  hideWhenNoListing: boolean = false; // Hide listings data table when no listing.
  noData: boolean = false;            // Showing No Listing Message, when no listing in database.
  preLoader: boolean = true;          // Showing Preloader to show user data is coming for you from thre server(A tiny UX Shit)

  Condos: Listing[];
  Homes: Listing[];
  Buyers: Listing[];
  Sellers: Listing[];


  condoDataSource = new MatTableDataSource(this.Condos);
  homeDataSource = new MatTableDataSource(this.Homes);
  buyerDataSource = new MatTableDataSource(this.Buyers);
  sellerDataSource = new MatTableDataSource(this.Sellers);

  displayedColumns: string[] = ['buyerSeller', 'contactInfo', 'propertyInfo', 'price', 'listingID', 'pendingCode', 'expireDate', 'editDelete'];
  displayedHomeColumns: string[] = ['buyerSeller', 'contactInfo', 'propertyInfo','price',  'listingID', 'pendingCode', 'expireDate', 'editDelete'];
  displayedBuyerColumns: string[] = ['buyerSeller', 'contactInfo', 'propertyInfo', 'priceF', 'pendingCode', 'possessionDate', 'editDelete'];
  displayedSellerColumns: string[] = ['buyerSeller', 'contactInfo', 'propertyInfo', 'priceF', 'pendingCode', 'possessionDate', 'editDelete'];


  constructor(private firebase: AngularFireDatabase, public datepipe: DatePipe, public crudApi: CrudService) { }

  ngOnInit() {
    this.dataState(); // Initialize listing's list, when component is ready


    let c = this.crudApi.GetCondoList(); 
    c.snapshotChanges().subscribe(data => { // Using snapshotChanges() method to retrieve list of data along with metadata($key)
      this.Condos = [];
      data.forEach(item => {
        let a = item.payload.toJSON(); 
        a['$key'] = item.key;
        this.Condos.push(a as Listing);
      })
      this.condoDataSource = new MatTableDataSource(this.Condos);
      this.condoDataSource.sort = this.condoTableSort;
    })

    let h = this.crudApi.GetHomesList(); 
    h.snapshotChanges().subscribe(data => { // Using snapshotChanges() method to retrieve list of data along with metadata($key)
      this.Homes = [];
      data.forEach(item => {
        let a = item.payload.toJSON(); 
        a['$key'] = item.key;
        this.Homes.push(a as Listing);
      })
      this.homeDataSource = new MatTableDataSource(this.Homes);
      this.homeDataSource.sort = this.homeTableSort;
    })

    let b = this.crudApi.GetBuyersList(); 
    b.snapshotChanges().subscribe(data => { // Using snapshotChanges() method to retrieve list of data along with metadata($key)
      this.Buyers = [];
      data.forEach(item => {
        let a = item.payload.toJSON(); 
        a['$key'] = item.key;
        this.Buyers.push(a as Listing);
      })
      this.buyerDataSource = new MatTableDataSource(this.Buyers);
      this.buyerDataSource.sort = this.buyerTableSort;
    })

    let s = this.crudApi.GetSellersList(); 
    s.snapshotChanges().subscribe(data => { // Using snapshotChanges() method to retrieve list of data along with metadata($key)
      this.Sellers = [];
      data.forEach(item => {
        let a = item.payload.toJSON(); 
        a['$key'] = item.key;
        this.Sellers.push(a as Listing);
      })
      this.sellerDataSource = new MatTableDataSource(this.Sellers);
      this.sellerDataSource.sort = this.sellerTableSort;
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
      // this.toastr.success(listing.$key + ' successfully deleted!'); // Alert message will show up when listing successfully deleted.
    }
  }
}
