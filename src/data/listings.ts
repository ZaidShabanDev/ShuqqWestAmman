import { getRealEstateListings } from '@/lib/actions/property.actions';

//  REAL-ESTATE LISTING  //
export const getRealEstateListingByHandle = async (handle: string) => {
  const listings = await getRealEstateListings();
  let listing = listings.find((listing) => listing.handle === handle);
  if (!listing?.id) {
    // return null

    // for demo porpose, we will return the first listing if not found
    listing = listings[0];
  }

  return {
    ...(listing || {}),
    galleryImgs: [...listing.galleryImgs],
  };
};

export type TRealEstateListing = Awaited<ReturnType<typeof getRealEstateListings>>[number];

// get Filter Options
export async function getRealEstateListingFilterOptions() {
  return [
    {
      label: 'Price range',
      name: 'priceRange',
      tabUIType: 'price-range',
      min: 0,
      max: 1000,
    },
    {
      label: 'Rooms & Beds',
      name: 'roomsAndBeds',
      tabUIType: 'select-number',
      options: [
        { name: 'Beds', max: 10 },
        { name: 'Bedrooms', max: 10 },
        { name: 'Bathrooms', max: 10 },
      ],
    },
  ];
}
