import { Bathtub02Icon, MeetingRoomIcon } from '@/components/Icons';
import HeaderGallery from '@/components/listingsDetialsComponents/HeaderGallery';
import SectionHeader from '@/components/listingsDetialsComponents/SectionHeader';
import { SectionHeading, SectionSubheading } from '@/components/listingsDetialsComponents/SectionHeading';
import { getRealEstateListingByHandle } from '@/data/listings';
import { Divider } from '@/shared/divider';
import {
  CropIcon,
  EquipmentGym03Icon,
  Fan01Icon,
  FireIcon,
  Flag03Icon,
  Mail01Icon,
  MoreIcon,
  ParkingAreaCircleIcon,
  PoolIcon,
  SecurityIcon,
  SmartPhone01Icon,
  SofaIcon,
  TreeIcon,
  Wifi01Icon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { redirect } from 'next/navigation';

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
  const t = await getTranslations('RealEstate');
  const tListing = await getTranslations('ListingDetails');

  if (!listing?.id) {
    return redirect('/real-estate-categories/all');
  }

  const {
    address,
    bathrooms,
    bedrooms,
    description,
    featuredImage,
    galleryImgs,
    price,
    title,
    area,
    areaUnit,
    propertyType,
    amenities,
  } = listing;

  const renderSectionHeader = () => {
    return (
      <SectionHeader address={address} listingCategory={propertyType} title={title}>
        <div className="flex items-center gap-x-3">
          <HugeiconsIcon icon={CropIcon} size={24} strokeWidth={1.5} />
          <span>
            {area} {areaUnit}
          </span>
        </div>
        <div className="flex items-center gap-x-3">
          <Bathtub02Icon className="mb-0.5 size-6" />
          <span>
            {bathrooms} {t('baths')}
          </span>
        </div>
        <div className="flex items-center gap-x-3">
          <MeetingRoomIcon className="mb-0.5 size-6" />
          <span>
            {bedrooms} {t('beds')}
          </span>
        </div>
      </SectionHeader>
    );
  };

  const renderSectionInfo = () => {
    return (
      <div className="listingSection__wrap">
        <SectionHeading>{tListing('listingDescrption')}</SectionHeading>
        <div className="overflow-hidden leading-relaxed text-neutral-700 dark:text-neutral-300">
          <span>{description || tListing('noDescriptionAvailable')}</span>
        </div>
      </div>
    );
  };

  const renderSectionAmenities = () => {
    const amenityIconMap = {
      Parking: ParkingAreaCircleIcon,
      Pool: PoolIcon,
      Gym: EquipmentGym03Icon,
      Garden: TreeIcon,
      // Balcony: BalconyIcon,
      Furnished: SofaIcon,
      AirConditioning: Fan01Icon,
      Heating: FireIcon,
      Wifi: Wifi01Icon,
      Security: SecurityIcon,
      // Elevator: ElevatorIcon,
    };

    const amenitiesWithIcons = amenities
      .map((amenity) => ({
        name: amenity,
        icon: amenityIconMap[amenity as keyof typeof amenityIconMap] || MoreIcon,
      }))
      .filter((item) => item.icon);

    return (
      <div className="mb-5 listingSection__wrap">
        <div>
          <SectionHeading>{tListing('PropertyFeatures')}</SectionHeading>
          <SectionSubheading>{tListing('property_amenities_services')}</SectionSubheading>
        </div>
        <Divider className="w-14!" />

        <div className="grid grid-cols-1 gap-6 text-sm text-neutral-700 xl:grid-cols-3 dark:text-neutral-300">
          {amenitiesWithIcons
            .filter((_, i) => i < 12)
            .map((item) => (
              <div key={item.name} className="flex items-center gap-x-3">
                <HugeiconsIcon icon={item.icon} size={20} color="currentColor" strokeWidth={1.5} />
                <span>{item.name}</span>
              </div>
            ))}
        </div>
      </div>
    );
  };

  const renderSidebarPriceAndForm = () => {
    return (
      <div className="listingSection__wrap sm:shadow-xl">
        {/* PRICE */}
        <div>
          <p className="text-base font-normal text-neutral-500 dark:text-neutral-400">Price </p>
          <div className="mt-1.5 flex items-end text-2xl font-semibold sm:text-3xl">
            <span className="mx-2">{price} JOD</span>
          </div>
        </div>

        <Divider />

        {/* info */}
        <div className="flex flex-col gap-y-2.5 text-neutral-700 dark:text-neutral-300">
          <div className="flex items-center gap-x-3">
            <HugeiconsIcon icon={Mail01Icon} size={24} />
            <span>mohammadsamir000d@gmail.com</span>
          </div>
          <div className="flex items-center gap-x-3">
            <HugeiconsIcon icon={SmartPhone01Icon} size={24} />
            <span>+00962792892455</span>
          </div>
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
