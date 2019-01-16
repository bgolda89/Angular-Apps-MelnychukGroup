import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../shared/crud.service';    // CRUD services API
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'; // Reactive form services
import { ToastrService } from 'ngx-toastr'; // Alert message using NGX toastr

@Component({
  selector: 'app-add-listing',
  templateUrl: './add-listing.component.html',
  styleUrls: ['./add-listing.component.css']
})
export class AddListingComponent implements OnInit {
  public listingForm: FormGroup;  // Define FormGroup to listing's form
 
  constructor(
    public crudApi: CrudService,  // CRUD API services
    public fb: FormBuilder,       // Form Builder service for Reactive forms
    public toastr: ToastrService  // Toastr service for alert message
  ) { }

 
  ngOnInit() {
    this.crudApi.GetListingsList();  // Call GetListingsList() before main form is being called
    this.listinForm();              // Call listing form when component is ready
  }

  // Reactive listing form
  listinForm() {
    this.listingForm = this.fb.group({
      // firstName: ['', [Validators.required, Validators.minLength(2)]],
      // lastName: [''],
      // email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      // mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      buyerSeller: ['', [Validators.required, Validators.minLength(2)]],
      contactInfo: [''],
      propertyInfo: [''],
      listingID: [''],
      price: [''],
      expireDate: [''],
      listingType: [''],
      priceF: [''],
      creationTS: [''],
      priceReduced: [''],
      pendingCode: [''],
      pending: [''],
      possessionDate: [''],
      pendingPrice: [''],
      pendingPriceF: [''],
      archive: [''],
      listingRegion: ['']
    })
    this.listingForm.patchValue({priceReduced: false}); 
    this.listingForm.patchValue({pending: false});  
    this.listingForm.patchValue({pendingCode: ''});  
    this.listingForm.patchValue({possessionDate: ''});  
    this.listingForm.patchValue({pendingPrice: ''});
    this.listingForm.patchValue({pendingPriceF: ''});
    this.listingForm.patchValue({archive: ''});  
    this.listingForm.patchValue({listingRegion: ''});
  }

  // Accessing form control using getters
  get buyerSeller() {
    return this.listingForm.get('buyerSeller');
  }

  get contactInfo() {
    return this.listingForm.get('contactInfo');
  }

  get propertyInfo() {
    return this.listingForm.get('propertyInfo');
  }

  get listingID() {
    return this.listingForm.get('listingID');
  }

  get price() {
    return this.listingForm.get('price');
  }

  get expireDate() {
    return this.listingForm.get('expireDate');
  }

  get priceReduced() {
    return this.listingForm.get('priceReduced');
  }

  get listingType() {
    return this.listingForm.get('listingType');
  }

  get pending() {
    return this.listingForm.get('pending');
  }

  // Reset listing form's values
  ResetForm() {
    this.listingForm.reset();
    this.listingForm.patchValue({priceReduced: false}); 
    this.listingForm.patchValue({pending: false});  
    this.listingForm.patchValue({pendingCode: ''});  
    this.listingForm.patchValue({possessionDate: ''});  
    this.listingForm.patchValue({pendingPrice: ''});
    this.listingForm.patchValue({pendingPriceF: ''});
    this.listingForm.patchValue({archive: ''});
    this.listingForm.patchValue({listingRegion: ''});  
  }  
 
  submitListingData() {
    this.crudApi.AddListing(this.listingForm.value); // Submit listing data using CRUD API
    this.toastr.success(this.listingForm.controls['buyerSeller'].value + ' successfully added!'); // Show success message when data is successfully submited
    this.ResetForm();  // Reset form when clicked on reset button
   };
}