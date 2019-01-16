import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { Listing } from '../../../shared/listing';
import { CrudService } from '../../../shared/crud.service';

@Component({
  selector: 'app-buyers-list',
  templateUrl: './buyers-list.component.html',
  styleUrls: ['./buyers-list.component.css']
})
export class BuyersListComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;

  buyers: Listing[];
  dataSource = new MatTableDataSource(this.buyers);
  
  displayedColumns: string[] = ['buyerSeller', 'contactInfo', 'propertyInfo', 'listingRegion','price', 'pendingCode', 'possessionDate', 'editDelete'];

  constructor(
    public crudApi: CrudService
  ) { }

  ngOnInit() {
    let c = this.crudApi.GetBuyersList(); 
    c.snapshotChanges().subscribe(data => { // Using snapshotChanges() method to retrieve list of data along with metadata($key)
      this.buyers = [];
      data.forEach(item => {
        let a = item.payload.toJSON(); 
        a['$key'] = item.key;
        this.buyers.push(a as Listing);
      })
      this.dataSource = new MatTableDataSource(this.buyers);
      this.dataSource.sort = this.sort;
    })
  }

  deleteListing(listing) {
    if (window.confirm('Are sure you want to delete this listing ?')) { // Asking from user before Deleting listing data.
      this.crudApi.DeleteListing(listing.$key) // Using Delete listing API to delete listing.
      // this.toastr.success(listing.$key + ' successfully deleted!'); // Alert message will show up when listing successfully deleted.
    }
  }
}
