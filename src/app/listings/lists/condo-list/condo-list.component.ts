import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource, PageEvent, MatPaginator } from '@angular/material';
import { Listing } from '../../../shared/listing';
import { CrudService } from '../../../shared/crud.service';

@Component({
  selector: 'app-condo-list',
  templateUrl: './condo-list.component.html',
  styleUrls: ['./condo-list.component.css']
})
export class CondoListComponent implements OnInit {
  
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;   


  pageEvent: PageEvent;
  datasource: null;
  pageIndex:number;
  pageSize:number;
  length:number;

  condos: Listing[];
  dataSource = new MatTableDataSource(this.condos);
  
  displayedColumns: string[] = ['buyerSeller', 'contactInfo', 'propertyInfo', 'listingRegion','price', 'pendingCode', 'listingID', 'expireDate', 'editDelete'];

  constructor(
    public crudApi: CrudService
  ) { }

  ngOnInit() {
    let c = this.crudApi.GetCondoList(); 
    c.snapshotChanges().subscribe(data => { // Using snapshotChanges() method to retrieve list of data along with metadata($key)
      this.condos = [];
      data.forEach(item => {
        let a = item.payload.toJSON(); 
        a['$key'] = item.key;
        this.condos.push(a as Listing);
      })
      this.dataSource = new MatTableDataSource(this.condos);
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
