type Tab = 'buy' | 'rent' | 'sell';

type RealEstateListingType = {
  id: string;
  title: string;
  handle: string;
  description: string | null;
  featuredImage: string | null;
  galleryImgs: string[];
  address: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  city: string;
  country: string;
  governorate: string;
  governorateType: string;
  amenities: string[]; // Array to store multiple amenities
  area: string; // Store as string to handle "150" format
  areaUnit: string; // Store unit separately (sqft, sqm, etc.)
  buildingNumber: string;
  floorApartment: string;
  landmark: string;
  postalCode: string;
  propertyType: string;
  state: string;
  yearBuilt: string; // Store as string to handle "2013" format
  createdAt: Date;
  updatedAt: Date;
};
