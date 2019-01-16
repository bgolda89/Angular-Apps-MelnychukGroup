export interface Listing {
    $key: string;
    creationTS: String;
    updateTS: String;

    listingType: String;
    buyerSeller: String;
    contactInfo: String;
    propertyInfo: String;
    listingRegion: String;
    listingID: Number;

    price: number;
    priceF: number;
    priceReduced: Boolean;

    pending: Boolean;
    pendingCode: String;
    pendingPrice: number;
    pendingPriceF: number;

    expireDate: Date;
    possessionDate: Date;

    sold: Boolean;
    salePrice: number;
    archive: boolean;
 }