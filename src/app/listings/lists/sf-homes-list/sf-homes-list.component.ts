import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import { Listing } from '../../../shared/listing';
import { CrudService } from '../../../shared/crud.service';

@Component({
  selector: 'app-sf-homes-list',
  templateUrl: './sf-homes-list.component.html',
  styleUrls: ['./sf-homes-list.component.css']
})
export class SfHomesListComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;   

  homes: Listing[];
  dataSource = new MatTableDataSource(this.homes);

  displayedColumns: string[] = ['buyerSeller', 'contactInfo', 'propertyInfo', 'listingRegion','price', 'pendingCode', 'listingID', 'expireDate', 'editDelete'];

  constructor(
    public crudApi: CrudService
  ) { }

  ngOnInit() {
    let c = this.crudApi.GetHomesList(); 
    c.snapshotChanges().subscribe(data => { // Using snapshotChanges() method to retrieve list of data along with metadata($key)
      this.homes = [];
      data.forEach(item => {
        let a = item.payload.toJSON(); 
        a['$key'] = item.key;
        this.homes.push(a as Listing);
      })
      this.dataSource = new MatTableDataSource(this.homes);
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
