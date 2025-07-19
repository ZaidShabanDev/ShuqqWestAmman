import avatars2 from '@/images/avatars/Image-2.png';

//  REAL-ESTATE LISTING  //
export async function getRealEstateListings() {
  return [
    {
      id: 'real-estate-listing://1',
      title: 'Best Western Cedars Hotel ',
      handle: 'best-western-cedars-hotel',
      description: 'Located in the heart of the city',
      date: 'May 20, 2021',
      listingCategory: 'Entire cabin',
      featuredImage:
        'https://images.unsplash.com/photo-1498503182468-3b51cbb6cb24?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      galleryImgs: [
        'https://images.unsplash.com/photo-1604145195376-e2c8195adf29?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.pexels.com/photos/6969831/pexels-photo-6969831.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        'https://images.pexels.com/photos/6438752/pexels-photo-6438752.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        'https://images.pexels.com/photos/1320686/pexels-photo-1320686.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        'https://images.pexels.com/photos/261394/pexels-photo-261394.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      ],
      like: false,
      address: '1 Anzinger Court',
      reviewStart: 4.8,
      reviewCount: 28,
      price: '$26',
      maxGuests: 6,
      bedrooms: 10,
      bathrooms: 3,
      acreage: 100,
      saleOff: '-10% today',
      isAds: null,
      map: { lat: 43.0405, lng: -89.245 },
    },
    {
      id: 'real-estate-listing://2',
      date: 'May 20, 2021',
      listingCategory: 'Entire cabin',
      title: 'Bell by Greene King Inns ',
      description: 'Located in the heart of the city',
      handle: 'bell-by-greene-king-inns',
      featuredImage:
        'https://images.unsplash.com/photo-1498503403619-e39e4ff390fe?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      galleryImgs: [
        'https://images.unsplash.com/photo-1498503403619-e39e4ff390fe?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.pexels.com/photos/6129967/pexels-photo-6129967.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
        'https://images.pexels.com/photos/7163619/pexels-photo-7163619.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        'https://images.pexels.com/photos/6527036/pexels-photo-6527036.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        'https://images.pexels.com/photos/6969831/pexels-photo-6969831.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      ],
      like: false,
      address: '32923 Judy Hill',
      reviewStart: 4.4,
      reviewCount: 198,
      price: '$250',
      maxGuests: 10,
      bedrooms: 6,
      acreage: 100,
      bathrooms: 7,
      saleOff: '-10% today',
      isAds: null,
      map: { lat: 43.0605, lng: -89.245 },
    },
    {
      id: 'real-estate-listing://3',
      date: 'May 20, 2021',
      listingCategory: 'Entire cabin',
      title: "Half Moon, Sherborne by Marston's Inns ",
      description: 'Located in the heart of the city',
      handle: 'half-moon-sherborne-by-marstons-inns',
      featuredImage:
        'https://images.pexels.com/photos/6438752/pexels-photo-6438752.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',

      galleryImgs: [
        'https://images.pexels.com/photos/6438752/pexels-photo-6438752.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        'https://images.pexels.com/photos/7163619/pexels-photo-7163619.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        'https://images.pexels.com/photos/6527036/pexels-photo-6527036.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        'https://images.pexels.com/photos/6969831/pexels-photo-6969831.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      ],
      like: true,
      address: '6731 Killdeer Park',
      reviewStart: 3.6,
      reviewCount: 16,
      price: '$278',
      maxGuests: 9,
      acreage: 100,
      bedrooms: 9,
      bathrooms: 8,
      saleOff: null,
      isAds: null,
      map: { lat: 43.0205, lng: -89.245 },
    },
    {
      id: 'real-estate-listing://4',
      date: 'May 20, 2021',
      listingCategory: 'Entire cabin',
      title: 'White Horse Hotel by Greene King Inns ',
      handle: 'white-horse-hotel-by-greene-king-inns',
      description: 'Located in the heart of the city',
      featuredImage:
        'https://images.unsplash.com/photo-1571509706433-a89eecf63dc8?q=80&w=3858&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      galleryImgs: [
        'https://images.unsplash.com/photo-1571509706433-a89eecf63dc8?q=80&w=3858&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.pexels.com/photos/1320686/pexels-photo-1320686.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        'https://images.pexels.com/photos/261394/pexels-photo-261394.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        'https://images.pexels.com/photos/2861361/pexels-photo-2861361.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      ],
      like: false,
      address: '35 Sherman Park',
      reviewStart: 4.8,
      reviewCount: 34,
      price: '$40',
      maxGuests: 6,
      acreage: 100,
      bedrooms: 7,
      bathrooms: 5,
      saleOff: null,
      isAds: null,
      map: { lat: 43.0505, lng: -89.285 },
    },
    {
      id: 'real-estate-listing://5',
      date: 'May 20, 2021',
      listingCategory: 'Holiday home',
      title: 'Ship and Castle Hotel ',
      handle: 'ship-and-castle-hotel',
      description: 'Located in the heart of the city',
      featuredImage:
        'https://images.unsplash.com/photo-1535205148555-bcbbc2a78913?q=80&w=3948&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      galleryImgs: [
        'https://images.unsplash.com/photo-1535205148555-bcbbc2a78913?q=80&w=3948&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.pexels.com/photos/6129967/pexels-photo-6129967.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
        'https://images.pexels.com/photos/7163619/pexels-photo-7163619.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        'https://images.pexels.com/photos/6527036/pexels-photo-6527036.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      ],
      like: false,
      address: '3 Crest Line Park',
      reviewStart: 3.4,
      reviewCount: 340,
      price: '$147',
      maxGuests: 8,
      acreage: 100,
      bedrooms: 3,
      bathrooms: 2,
      saleOff: null,
      isAds: null,
      map: { lat: 43.0605, lng: -89.205 },
    },
    {
      id: 'real-estate-listing://6',
      date: 'May 20, 2021',
      listingCategory: 'Home stay',
      title: 'The Windmill Family & Commercial Hotel ',
      handle: 'the-windmill-family-and-commercial-hotel',
      description: 'Located in the heart of the city',
      featuredImage:
        'https://images.unsplash.com/photo-1589923158776-cb4485d99fd6?q=80&w=2048&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      galleryImgs: [
        'https://images.unsplash.com/photo-1589923158776-cb4485d99fd6?q=80&w=2048&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.pexels.com/photos/261394/pexels-photo-261394.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        'https://images.pexels.com/photos/2861361/pexels-photo-2861361.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        'https://images.pexels.com/photos/2677398/pexels-photo-2677398.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      ],
      like: true,
      address: '55974 Waxwing Junction',
      reviewStart: 3.8,
      reviewCount: 508,
      price: '$90',
      maxGuests: 8,
      bedrooms: 7,
      acreage: 100,
      bathrooms: 7,
      saleOff: null,
      isAds: null,
      map: { lat: 43.0305, lng: -89.295 },
    },
    {
      id: 'real-estate-listing://7',
      date: 'May 20, 2021',
      listingCategory: 'Hotel room',
      title: "Unicorn, Gunthorpe by Marston's Inns ",
      handle: 'unicorn-gunthorpe-by-marstons-inns',
      description: 'Located in the heart of the city',
      featuredImage:
        'https://images.unsplash.com/photo-1605581813258-076a6654a37f?q=80&w=3987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      galleryImgs: [
        'https://images.unsplash.com/photo-1605581813258-076a6654a37f?q=80&w=3987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.pexels.com/photos/2861361/pexels-photo-2861361.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        'https://images.pexels.com/photos/1320686/pexels-photo-1320686.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        'https://images.pexels.com/photos/261394/pexels-photo-261394.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      ],
      like: false,
      address: '79361 Chinook Place',
      reviewStart: 3.0,
      reviewCount: 481,
      price: '$282',
      maxGuests: 9,
      bedrooms: 2,
      acreage: 100,
      bathrooms: 5,
      saleOff: '-10% today',
      isAds: null,
      map: { lat: 43.0705, lng: -89.295 },
    },
    {
      id: 'real-estate-listing://8',
      date: 'May 20, 2021',
      listingCategory: 'Hotel room',
      title: 'Holiday Inn Express Ramsgate Minster, an IHG Hotel ',
      handle: 'holiday-inn-express-ramsgate-minster-an-ihg-hotel',
      description: 'Located in the heart of the city',
      featuredImage:
        'https://images.unsplash.com/photo-1616423841125-8307665a0469?q=80&w=3948&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      galleryImgs: [
        'https://images.unsplash.com/photo-1616423841125-8307665a0469?q=80&w=3948&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.pexels.com/photos/6969831/pexels-photo-6969831.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        'https://images.pexels.com/photos/7163619/pexels-photo-7163619.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        'https://images.pexels.com/photos/6527036/pexels-photo-6527036.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      ],
      like: true,
      address: '6 Chive Avenue',
      reviewStart: 3.9,
      reviewCount: 188,
      price: '$79',
      maxGuests: 6,
      acreage: 100,
      bedrooms: 7,
      bathrooms: 4,
      saleOff: null,
      isAds: null,
      map: { lat: 43.0755, lng: -89.265 },
    },
  ];
}
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
      avatarUrl: avatars2.src,
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
      label: 'Property type',
      name: 'listingCategory',
      tabUIType: 'checkbox',
      options: [
        {
          name: 'Entire place',
          value: 'entire_place',
          description: 'Have a place to yourself',
          defaultChecked: true,
        },
        {
          name: 'Private room',
          value: 'private_room',
          description: 'Have your own room and share some common spaces',
          defaultChecked: true,
        },
        {
          name: 'Hotel room',
          value: 'hotel_room',
          description: 'Have a private or shared room in a boutique hotel, hostel, and more',
        },
        {
          name: 'Shared room',
          value: 'shared_room',
          description: 'Stay in a shared space, like a common room',
        },
      ],
    },
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
    {
      label: 'Amenities',
      name: 'amenities',
      tabUIType: 'checkbox',
      options: [
        {
          name: 'Kitchen',
          value: 'kitchen',
          description: 'Have a place to yourself',
          defaultChecked: true,
        },
        {
          name: 'Air conditioning',
          value: 'air_conditioning',
          description: 'Have your own room and share some common spaces',
          defaultChecked: true,
        },
        {
          name: 'Heating',
          value: 'heating',
          description: 'Have a private or shared room in a boutique hotel, hostel, and more',
        },
        {
          name: 'Dryer',
          value: 'dryer',
          description: 'Stay in a shared space, like a common room',
        },
        {
          name: 'Washer',
          value: 'washer',
          description: 'Stay in a shared space, like a common room',
        },
      ],
    },
    {
      label: 'Facilities',
      name: 'facilities',
      tabUIType: 'checkbox',
      options: [
        {
          name: 'Free parking on premise',
          value: 'free_parking_on_premise',
          description: 'Have a place to yourself',
        },
        {
          name: 'Hot tub',
          value: 'hot_tub',
          description: 'Have your own room and share some common spaces',
        },
        {
          name: 'Gym',
          value: 'gym',
          description: 'Have a private or shared room in a boutique hotel, hostel, and more',
        },
        {
          name: 'Pool',
          value: 'pool',
          description: 'Stay in a shared space, like a common room',
        },
        {
          name: 'EV charger',
          value: 'ev_charger',
          description: 'Stay in a shared space, like a common room',
        },
      ],
    },
    {
      label: 'Property type',
      name: 'propertyType',
      tabUIType: 'checkbox',
      options: [
        {
          name: 'House',
          value: 'house',
          description: 'Have a place to yourself',
        },
        {
          name: 'Bed and breakfast',
          value: 'bed_and_breakfast',
          description: 'Have your own room and share some common spaces',
        },
        {
          name: 'Apartment',
          defaultChecked: true,
          value: 'apartment',
          description: 'Have a private or shared room in a boutique hotel, hostel, and more',
        },
        {
          name: 'Boutique hotel',
          value: 'boutique_hotel',
          description: 'Have a private or shared room in a boutique hotel, hostel, and more',
        },
        {
          name: 'Bungalow',
          value: 'bungalow',
          description: 'Have a private or shared room in a boutique hotel, hostel, and more',
        },
        {
          name: 'Chalet',
          defaultChecked: true,
          value: 'chalet',
          description: 'Have a private or shared room in a boutique hotel, hostel, and more',
        },
        {
          name: 'Condominium',
          defaultChecked: true,
          value: 'condominium',
          description: 'Have a private or shared room in a boutique hotel, hostel, and more',
        },
        {
          name: 'Cottage',
          value: 'cottage',
          description: 'Have a private or shared room in a boutique hotel, hostel, and more',
        },
        {
          name: 'Guest suite',
          value: 'guest_suite',
          description: 'Have a private or shared room in a boutique hotel, hostel, and more',
        },
        {
          name: 'Guesthouse',
          value: 'guesthouse',
          description: 'Have a private or shared room in a boutique hotel, hostel, and more',
        },
      ],
    },
    {
      label: 'House rules',
      name: 'houseRules',
      tabUIType: 'checkbox',
      options: [
        {
          name: 'Pets allowed',
          value: 'pets_allowed',
          description: 'Have a place to yourself',
        },
        {
          name: 'Smoking allowed',
          value: 'smoking_allowed',
          description: 'Have your own room and share some common spaces',
        },
      ],
    },
  ];
}
