import {
  Bathtub02Icon,
  BodySoapIcon,
  CableCarIcon,
  CctvCameraIcon,
  HairDryerIcon,
  MeetingRoomIcon,
  ShampooIcon,
  Speaker01Icon,
  TvSmartIcon,
  VirtualRealityVr01Icon,
  WaterEnergyIcon,
  WaterPoloIcon,
  Wifi01Icon,
} from '@/components/Icons';
import HeaderGallery from '@/components/listingsDetialsComponents/HeaderGallery';
import SectionHeader from '@/components/listingsDetialsComponents/SectionHeader';
import { SectionHeading, SectionSubheading } from '@/components/listingsDetialsComponents/SectionHeading';
import { getRealEstateListingByHandle } from '@/data/listings';
import { Button } from '@/shared/Button';
import ButtonSecondary from '@/shared/ButtonSecondary';
import { DescriptionDetails, DescriptionList, DescriptionTerm } from '@/shared/description-list';
import { Divider } from '@/shared/divider';
import { CropIcon, Flag03Icon, Mail01Icon, Navigation03Icon, SmartPhone01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { Fragment } from 'react';

export async function generateMetadata({ params }: { params: Promise<{ handle: string }> }): Promise<Metadata> {
  const { handle } = await params;
  const listing = await getRealEstateListingByHandle(handle);

  if (!listing) {
    return {
      title: 'Listing not found',
      description: 'The listing you are looking for does not exist.',
    };
  }

  return {
    title: listing?.title,
    description: listing?.description,
  };
}

const Page = async ({ params }: { params: Promise<{ handle: string }> }) => {
  const { handle } = await params;

  const listing = await getRealEstateListingByHandle(handle);

  if (!listing?.id) {
    return redirect('/real-estate-categories/all');
  }

  const {
    address,
    bathrooms,
    bedrooms,
    date,
    description,
    featuredImage,
    galleryImgs,

    listingCategory,
    price,
    title,
    host,
    acreage,
  } = listing;

  const renderSectionHeader = () => {
    return (
      <SectionHeader address={address} listingCategory={listingCategory} title={title}>
        <div className="flex items-center gap-x-3">
          <HugeiconsIcon icon={CropIcon} size={24} strokeWidth={1.5} />
          <span>{acreage} Sq.Fit</span>
        </div>
        <div className="flex items-center gap-x-3">
          <Bathtub02Icon className="mb-0.5 size-6" />
          <span>{bathrooms} baths</span>
        </div>
        <div className="flex items-center gap-x-3">
          <MeetingRoomIcon className="mb-0.5 size-6" />
          <span>{bedrooms} bedrooms</span>
        </div>
      </SectionHeader>
    );
  };

  const renderSectionInfo = () => {
    const highlights = [
      {
        title: 'Near school & amenities',
        description: 'Near school bus, Southport Hotel, beach, and village; 20-minute drive to Dover.',
      },
      {
        title: 'Spacious and modern',
        description: 'Spacious 3-bedroom, 2-bathroom home with modern amenities and a large backyard.',
      },
      {
        title: 'Perfect for families',
        description: 'Ideal for families with children, offering a safe and friendly neighborhood.',
      },
      {
        title: 'Great investment opportunity',
        description: 'A great investment opportunity with potential for rental income or future resale.',
      },
    ];
    return (
      <div className="listingSection__wrap">
        <SectionHeading>Stay information</SectionHeading>
        <div className="leading-relaxed text-neutral-700 dark:text-neutral-300">
          <span>
            Providing lake views, The Symphony 9 Tam Coc in Ninh Binh provides accommodation, an outdoor swimming pool,
            a bar, a shared lounge, a garden and barbecue facilities. Complimentary WiFi is provided.
          </span>
          <br />
          <br />
          <span>There is a private bathroom with bidet in all units, along with a hairdryer and free toiletries.</span>
          <br /> <br />
          <span>
            The Symphony 9 Tam Coc offers a terrace. Both a bicycle rental service and a car rental service are
            available at the accommodation, while cycling can be enjoyed nearby.
          </span>
        </div>

        <Divider />

        <SectionHeading>Property highlights </SectionHeading>
        <DescriptionList>
          {highlights.map((item, index) => (
            <Fragment key={index}>
              <DescriptionTerm>{item.title}</DescriptionTerm>
              <DescriptionDetails>{item.description}</DescriptionDetails>
            </Fragment>
          ))}
        </DescriptionList>
      </div>
    );
  };

  const renderSectionAmenities = () => {
    const Amenities_demos = [
      { name: '3 Fast wifi', icon: Wifi01Icon },
      { name: '4 Bathtub', icon: Bathtub02Icon },
      { name: '4 Hair dryer', icon: HairDryerIcon },
      { name: '2 Sound system', icon: Speaker01Icon },
      { name: '2 Shampoo', icon: ShampooIcon },
      { name: '2 Body soap', icon: BodySoapIcon },
      { name: '1 Water Energy ', icon: WaterEnergyIcon },
      { name: '1 Water Polo', icon: WaterPoloIcon },
      { name: '2 Cable Car', icon: CableCarIcon },
      { name: '5 Tv Smart', icon: TvSmartIcon },
      { name: '5 Cctv Camera', icon: CctvCameraIcon },
      { name: '4 Virtual Reality Vr', icon: VirtualRealityVr01Icon },
    ];

    return (
      <div className="mb-5 listingSection__wrap">
        <div>
          <SectionHeading>Property features</SectionHeading>
          <SectionSubheading>About the property&apos;s amenities and services</SectionSubheading>
        </div>
        <Divider className="w-14!" />

        <div className="grid grid-cols-1 gap-6 text-sm text-neutral-700 xl:grid-cols-3 dark:text-neutral-300">
          {Amenities_demos.filter((_, i) => i < 12).map((item) => (
            <div key={item.name} className="flex items-center gap-x-3">
              <item.icon className="h-6 w-6" />
              <span>{item.name}</span>
            </div>
          ))}
        </div>

        {/* ----- */}
        <div className="w-14 border-b border-neutral-200"></div>
        <div>
          <ButtonSecondary>View more 20 features</ButtonSecondary>
        </div>
      </div>
    );
  };

  const renderSidebarPriceAndForm = () => {
    return (
      <div className="listingSection__wrap sm:shadow-xl">
        {/* PRICE */}
        <div>
          <p className="text-base font-normal text-neutral-500 dark:text-neutral-400">Offers over </p>
          <div className="mt-1.5 flex items-end text-2xl font-semibold sm:text-3xl">
            <span className="text-neutral-300 line-through">$350</span>
            <span className="mx-2">{price}</span>
          </div>
        </div>

        <Divider />

        {/* info */}
        <div className="flex flex-col gap-y-2.5 text-neutral-700 dark:text-neutral-300">
          <div className="flex items-center gap-x-3">
            <HugeiconsIcon icon={Mail01Icon} size={24} />
            <span>{host.email}</span>
          </div>
          <div className="flex items-center gap-x-3">
            <HugeiconsIcon icon={SmartPhone01Icon} size={24} />
            <span>{host.phone}</span>
          </div>
        </div>

        {/* == */}
        <div className="flex gap-2">
          <Button href={'/authors/' + handle}>Get in touch</Button>
          <ButtonSecondary outline>
            Sent email
            <HugeiconsIcon icon={Navigation03Icon} size={20} color="currentColor" strokeWidth={1.5} className="mb-px" />
          </ButtonSecondary>
        </div>
        <Divider />

        <div className="flex items-center gap-x-2 text-sm text-neutral-700 dark:text-neutral-300">
          <HugeiconsIcon icon={Flag03Icon} size={16} color="currentColor" strokeWidth={1.5} />
          <span>Report this host</span>
        </div>
      </div>
    );
  };

  return (
    <div className="container">
      {/*  HEADER */}
      <HeaderGallery images={galleryImgs} />

      {/* MAIN */}
      <main className="relative z-[1] mt-10 flex flex-col gap-8 lg:flex-row xl:gap-10">
        {/* CONTENT */}
        <div className="flex w-full flex-col gap-y-8 lg:w-3/5 xl:w-[64%] xl:gap-y-10">
          {renderSectionHeader()}
          {renderSectionInfo()}
          {renderSectionAmenities()}
        </div>

        {/* SIDEBAR */}
        <div className="grow">
          <div className="sticky top-5">{renderSidebarPriceAndForm()}</div>
        </div>
      </main>
    </div>
  );
};

export default Page;
