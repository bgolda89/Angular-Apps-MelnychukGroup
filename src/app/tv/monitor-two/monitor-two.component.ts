import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../shared/crud.service';

@Component({
  selector: 'app-monitor-two',
  templateUrl: './monitor-two.component.html',
  styleUrls: ['./monitor-two.component.css']
})
export class MonitorTwoComponent implements OnInit {

  hideWhenNoListing: boolean = false; // Hide listings data table when no listing.
  noData: boolean = false;            // Showing No Listing Message, when no listing in database.
  preLoader: boolean = true;          // Showing Preloader to show user data is coming for you from thre server(A tiny UX Shit)


  constructor(
    public crudApi: CrudService
  ) { }

  ngOnInit() {
    this.dataState(); // Initialize listing's list, when component is ready
  }

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
}