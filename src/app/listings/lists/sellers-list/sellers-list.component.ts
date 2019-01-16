import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import { Listing } from '../../../shared/listing';
import { CrudService } from '../../../shared/crud.service';

@Component({
  selector: 'app-sellers-list',
  templateUrl: './sellers-list.component.html',
  styleUrls: ['./sellers-list.component.css']
})
export class SellersListComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;   


  sellers: Listing[];
  dataSource = new MatTableDataSource(this.sellers);
  
  displayedColumns: string[] = ['buyerSeller', 'contactInfo', 'propertyInfo', 'listingRegion','price', 'pendingCode', 'possessionDate', 'editDelete'];

  constructor(
    public crudApi: CrudService
  ) { }

  ngOnInit() {
    let c = this.crudApi.GetSellersList(); 
    c.snapshotChanges().subscribe(data => { // Using snapshotChanges() method to retrieve list of data along with metadata($key)
      this.sellers = [];
      data.forEach(item => {
        let a = item.payload.toJSON(); 
        a['$key'] = item.key;
        this.sellers.push(a as Listing);
      })
      this.dataSource = new MatTableDataSource(this.sellers);
      this.dataSource.sort = this.sort;  
      this.dataSource.paginator = this.paginator;
    })
  }

  deleteListing(listing) {
    if (window.confirm('Are sure you want to delete this listing ?')) { // Asking from user before Deleting listing data.
      this.crudApi.DeleteListing(listing.$key) // Using Delete listing API to delete listing.
      // this.toastr.success(listing.$key + ' successfully deleted!'); // Alert message will show up when listing successfully deleted.
    }
  }
}
