import realEstateCategoryCoverImage from '@/images/hero-right-real-estate.png';

// Real-Estate categories --------
export async function getRealEstateCategories() {
  return [
    {
      id: 'real-estate://1',
      name: 'New York, USA',
      handle: 'new-york',
      href: '/real-estate-categories/new-york',
      count: 144000,
      thumbnail:
        'https://images.pexels.com/photos/64271/queen-of-liberty-statue-of-liberty-new-york-liberty-statue-64271.jpeg',
      coverImage: {
        src: realEstateCategoryCoverImage.src,
        width: realEstateCategoryCoverImage.width,
        height: realEstateCategoryCoverImage.height,
      },
      description: 'lorem ipsum dolor sit amet',
      region: 'United States',
    },
    {
      id: 'real-estate://2',
      name: 'Singapore',
      handle: 'singapore',
      href: '/real-estate-categories/singapore',
      count: 188288,
      thumbnail: 'https://images.pexels.com/photos/7740160/pexels-photo-7740160.jpeg',
      coverImage: {
        src: realEstateCategoryCoverImage.src,
        width: realEstateCategoryCoverImage.width,
        height: realEstateCategoryCoverImage.height,
      },
      description: 'lorem ipsum dolor sit amet',
      region: 'Singapore',
    },
    {
      id: 'real-estate://3',
      name: 'Paris, France',
      handle: 'paris',
      href: '/real-estate-categories/paris',
      count: 218288,
      thumbnail: 'https://images.pexels.com/photos/739407/pexels-photo-739407.jpeg',
      coverImage: {
        src: realEstateCategoryCoverImage.src,
        width: realEstateCategoryCoverImage.width,
        height: realEstateCategoryCoverImage.height,
      },
      description: 'lorem ipsum dolor sit amet',
      region: 'France',
    },
    {
      id: 'real-estate://4',
      name: 'London, UK',
      handle: 'london',
      href: '/real-estate-categories/london',
      count: 116288,
      thumbnail: 'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg',
      coverImage: {
        src: realEstateCategoryCoverImage.src,
        width: realEstateCategoryCoverImage.width,
        height: realEstateCategoryCoverImage.height,
      },
      description: 'lorem ipsum dolor sit amet',
      region: 'United Kingdom',
    },
    {
      id: 'real-estate://5',
      name: 'Tokyo, Japan',
      handle: 'tokyo',
      href: '/real-estate-categories/tokyo',
      count: 232288,
      thumbnail: 'https://images.pexels.com/photos/4151484/pexels-photo-4151484.jpeg',
      coverImage: {
        src: realEstateCategoryCoverImage.src,
        width: realEstateCategoryCoverImage.width,
        height: realEstateCategoryCoverImage.height,
      },
      description: 'lorem ipsum dolor sit amet',
      region: 'Japan',
    },
    {
      id: 'real-estate://6',
      name: 'Maldives',
      handle: 'maldives',
      href: '/real-estate-categories/maldives',
      count: 77566,
      thumbnail: 'https://images.pexels.com/photos/3250613/pexels-photo-3250613.jpeg',
      coverImage: {
        src: realEstateCategoryCoverImage.src,
        width: realEstateCategoryCoverImage.width,
        height: realEstateCategoryCoverImage.height,
      },
      description: 'lorem ipsum dolor sit amet',
      region: 'Indian Ocean',
    },
  ];
}
export async function getRealEstateCategoryByHandle(handle?: string) {
  // lower case handle
  handle = handle?.toLowerCase();

  if (!handle || handle === 'all') {
    return {
      id: 'real-estate://all',
      name: 'Real-estates',
      handle: 'all',
      href: '/real-estate-categories/all',
      count: 20000,
      thumbnail:
        'https://images.pexels.com/photos/64271/queen-of-liberty-statue-of-liberty-new-york-liberty-statue-64271.jpeg',
      coverImage: {
        src: realEstateCategoryCoverImage.src,
        width: realEstateCategoryCoverImage.width,
        height: realEstateCategoryCoverImage.height,
      },
      region: 'Worldwide',
      description: 'Explore all real estates around the world',
    };
  }
  const categories = await getRealEstateCategories();
  return categories.find((category) => category.handle === handle);
}

// types
export type TRealEstateCategory = Awaited<ReturnType<typeof getRealEstateCategories>>[number];
export type TCategory = TRealEstateCategory;
