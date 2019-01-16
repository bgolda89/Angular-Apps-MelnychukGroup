import { Injectable } from '@angular/core';
import { Listing } from '../shared/listing';  // Listing data type interface class
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';  // Firebase modules for Database, Data list and Single object
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})

export class CrudService {
  listingsRef: AngularFireList<any>;    // Reference to Listing data list, its an Observable
  deletedListingsRef: AngularFireList<any>;    // Reference to Listing data list, its an Observable
  condoListingsRef: AngularFireList<any>;    // Reference to Listing data list, its an Observable
  homesListingsRef: AngularFireList<any>;    // Reference to Listing data list, its an Observable
  buyerListingsRef: AngularFireList<any>;    // Reference to Listing data list, its an Observable
  sellerListingsRef: AngularFireList<any>;    // Reference to Listing data list, its an Observable

  moveListings: [];
  listingRef: AngularFireObject<any>;   // Reference to Listing object, its an Observable too
  deletedListingRef: AngularFireObject<any>;   // Reference to Listing object, its an Observable too
  
  // Inject AngularFireDatabase Dependency in Constructor
  constructor(private db: AngularFireDatabase) { }

  // Create Listing
  AddListing(listing: Listing) {
    this.listingsRef.push({
      buyerSeller: listing.buyerSeller,
      contactInfo: listing.contactInfo,
      propertyInfo: listing.propertyInfo,
      listingID: listing.listingID,
      price: listing.price,
      priceF: listing.price.toLocaleString(),
      listingType: listing.listingType,
      expireDate: listing.expireDate,
      creationTS: Date.now(),
      priceReduced: listing.priceReduced,
      pending: listing.pending,
      pendingCode: listing.pendingCode,
      possessionDate: listing.possessionDate,
      pendingPrice: listing.pendingPrice,
      pendingPriceF: listing.pendingPrice.toLocaleString(),
      updateTS: Date.now(),
      archive: listing.archive,
      listingRegion: listing.listingRegion
    })
  }

  // Fetch Single Listing Object
  GetListing(id: string) {
    this.listingRef = this.db.object('ACTIVE_LISTINGS/' + id);
    return this.listingRef;
  }

  // Fetch Listings List
  GetListingsList() {
    this.listingsRef = this.db.list('ACTIVE_LISTINGS');
    this.condoListingsRef = this.db.list('ACTIVE_LISTINGS', ref => ref.orderByChild('listingType').equalTo('Condo'))
    this.homesListingsRef = this.db.list('ACTIVE_LISTINGS', ref => ref.orderByChild('listingType').equalTo('SF Home'))
    this.buyerListingsRef = this.db.list('ACTIVE_LISTINGS', ref => ref.orderByChild('listingType').equalTo('Buyer'))
    this.sellerListingsRef = this.db.list('ACTIVE_LISTINGS', ref => ref.orderByChild('listingType').equalTo('Seller'))
    // this.MoveListings();
    return this.listingsRef;
  } 
    
  GetCondoList() {
    return this.condoListingsRef;
  }

  GetHomesList() {
    return this.homesListingsRef;
  }  
  
  GetBuyersList() {
    return this.buyerListingsRef;
  }  
  
  GetSellersList() {
    return this.sellerListingsRef;
  }

  GetDeletedList(){
    this.deletedListingsRef = this.db.list('DELETED_LISTINGS');
    return this.deletedListingsRef;
  }
  
  // Update Listing Object
  UpdateListing(listing: Listing) {
    this.listingRef.update({
      buyerSeller: listing.buyerSeller,
      contactInfo: listing.contactInfo,
      propertyInfo: listing.propertyInfo,
      listingID: listing.listingID,
      price: listing.price,
      priceF: listing.price.toLocaleString(),
      listingType: listing.listingType,
      expireDate: listing.expireDate,
      priceReduced: listing.priceReduced,
      pending: listing.pending,
      pendingCode: listing.pendingCode,
      possessionDate: listing.possessionDate,
      updateTS: Date.now(),
      pendingPrice: listing.pendingPrice,
      pendingPriceF: listing.pendingPrice.toLocaleString(),
      archive: listing.archive,
      listingRegion: listing.listingRegion
    })
  }  

  DeleteDeletedListing(id: string) { 
    this.listingRef = this.db.object('DELETED_LISTINGS/'+id);
    this.listingRef.remove();
  }


  DeleteListing(id: string) {
    this.listingRef = this.db.object('ACTIVE_LISTINGS/'+id);
    //firebase 3.x comes with a promise method
    firebase.database().ref('ACTIVE_LISTINGS').child(id).once("value", function(snapshot) {
      //one data is returned, you can then call the removeEvent fn
      firebase.database().ref('DELETED_LISTINGS/').child(id)
        .set(snapshot.val())
        .then(function () { 
        })
        .catch(function (error) {
          console.error("error occured trying to add to deletedEvents", error);
        });
      });
      this.listingRef.remove();
    }

  MoveListings(){
    //firebase 3.x comes with a promise method
    firebase.database().ref('ACTIVE_LISTINGS').once("value", function(snapshot) {
    //one data is returned, you can then call the removeEvent fn
      firebase.database().ref('DUMMY_LISTINGS/')
        .set(snapshot.val())
        .then(function () { 
          // this.listingRef.remove();
        })
        .catch(function (error) {
          console.error("error occured trying to add to deletedEvents", error);
        });
      });
    }

    RestoreDeletedListing(id) {
      this.listingRef = this.db.object('DELETED_LISTINGS/'+id);
      //firebase 3.x comes with a promise method
      firebase.database().ref('DELETED_LISTINGS').child(id).once("value", function(snapshot) {
        //one data is returned, you can then call the removeEvent fn
        firebase.database().ref('ACTIVE_LISTINGS/').child(id)
          .set(snapshot.val())
          .then(function () { 
          })
          .catch(function (error) {
            console.error("error occured trying to add to deletedEvents", error);
          });
        });
        this.listingRef.remove();
    }
  }
