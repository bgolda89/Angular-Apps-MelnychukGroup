import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CrudService } from '../../shared/crud.service';
import { ActivatedRoute, Router } from "@angular/router"; // ActivatedRoue is used to get the current associated components information.
import { Location } from '@angular/common';  // Location service is used to go back to previous component
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-listing',
  templateUrl: './edit-listing.component.html',
  styleUrls: ['./edit-listing.component.css']
})

export class EditListingComponent implements OnInit {
  editForm: FormGroup;  // Define FormGroup to listing's edit form
  
  constructor(
    private crudApi: CrudService,       // Inject CRUD API in constructor
    private fb: FormBuilder,            // Inject Form Builder service for Reactive forms
    private location: Location,         // Location service to go back to previous component
    private actRoute: ActivatedRoute,   // Activated route to get the current component's inforamation
    private router: Router,             // Router service to navigate to specific component
    private toastr: ToastrService       // Toastr service for alert message
  ){ }

  ngOnInit() {
    this.updateListingData();   // Call updateListingData() as soon as the component is ready 
    const id = this.actRoute.snapshot.paramMap.get('id');  // Getting current component's id or information using ActivatedRoute service
    this.crudApi.GetListing(id).valueChanges().subscribe(data => {
      this.editForm.setValue(data)  // Using SetValue() method, It's a ReactiveForm's API to store intial value of reactive form 
    })
  }
  // Accessing form control using getters
  get buyerSeller() {
    return this.editForm.get('buyerSeller');
  }

  get contactInfo() {
    return this.editForm.get('contactInfo');
  }

  get propertyInfo() {
    return this.editForm.get('propertyInfo');
  }

  get listingID() {
    return this.editForm.get('listingID');
  }

  get price() {
    return this.editForm.get('price');
  }

  get expireDate() {
    return this.editForm.get('expireDate');
  }

  get priceReduced() {
    return this.editForm.get('priceReduced');
  }

  get listingType() {
    return this.editForm.get('listingType');
  }
  // Contains Reactive Form logic
  updateListingData() {
    this.editForm = this.fb.group({
      // firstName: ['', [Validators.required, Validators.minLength(2)]],
      // lastName: [''],
      // email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      // mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      buyerSeller: ['', [Validators.required, Validators.minLength(2)]],
      contactInfo: [''],
      propertyInfo: [''],
      listingID: [''],
      price: [''],
      expireDate: ['', Validators.required],
      listingType: [''],
      priceF: [''],
      creationTS: [''],
      priceReduced: [''],
      pendingCode: [''],
      pending: [''],
      possessionDate: [''],
      pendingPrice: [''],
      pendingPriceF: [''],
      updateTS: [''],
      archive: [''],
      listingRegion: ['']
    })
  }

  // Go back to previous component
  goBack() {
    this.location.back();
  }

  // Below methods fire when somebody click on submit button
  updateForm(){
    this.crudApi.UpdateListing(this.editForm.value);       // Update listing data using CRUD API
    this.toastr.success(this.editForm.controls['buyerSeller'].value + ' updated successfully');   // Show succes message when data is successfully submited
    
    this.location.back();
    // this.router.navigate(['view-listings']);               // Navigate to listing's list page when listing data is updated
  }
}