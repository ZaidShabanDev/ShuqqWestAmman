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
    galleryImgs: [
      ...listing.galleryImgs,
      'https://images.pexels.com/photos/6969831/pexels-photo-6969831.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      'https://images.pexels.com/photos/6438752/pexels-photo-6438752.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      'https://images.pexels.com/photos/1320686/pexels-photo-1320686.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      'https://images.pexels.com/photos/261394/pexels-photo-261394.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      'https://images.pexels.com/photos/2861361/pexels-photo-2861361.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      'https://images.pexels.com/photos/2677398/pexels-photo-2677398.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      'https://images.pexels.com/photos/6129967/pexels-photo-6129967.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
      'https://images.pexels.com/photos/7163619/pexels-photo-7163619.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      'https://images.pexels.com/photos/6527036/pexels-photo-6527036.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      'https://images.pexels.com/photos/6969831/pexels-photo-6969831.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    ],
    host: {
      displayName: 'John Doe',
      handle: 'john-doe',
      description:
        'Experienced real estate agent with over 10 years in the industry, specializing in residential properties.',
      listingsCount: 15,
      reviewsCount: 250,
      rating: 4.9,
      responseRate: 98,
      responseTime: 'within an hour',
      isSuperhost: true,
      isVerified: true,
      joinedDate: 'January 2020',
      email: 'john-doe@gmail.com',
      phone: '+1234567890',
    },
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
