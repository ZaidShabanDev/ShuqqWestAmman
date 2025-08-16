type Tab = 'buy' | 'rent' | 'sell';

type RealEstateListingType = {
  id: string;
  title: string;
  handle: string;
  description: string | null;
  date: Date;
  listingCategory: string;
  featuredImage: string | null;
  galleryImgs: string[];
  address: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  acreage: number;
  createdAt: Date;
  updatedAt: Date;
};