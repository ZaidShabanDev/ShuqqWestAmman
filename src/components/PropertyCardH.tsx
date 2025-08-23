import { TRealEstateListing } from '@/data/listings';
import { Badge } from '@/shared/Badge';
import { MapPinIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { FC } from 'react';
import GallerySlider from './GallerySlider';
import { Bathtub01Icon, BedSingle01Icon, CropIcon } from './Icons';

interface PropertyCardHProps {
  className?: string;
  data: TRealEstateListing;
}

const PropertyCardH: FC<PropertyCardHProps> = ({ className = '', data }) => {
  const { galleryImgs, title, handle: listingHandle, price, bathrooms, area, areaUnit, bedrooms, address } = data;

  const listingHref = `/properties-list/${listingHandle}`;
  const tRealEstate = useTranslations('RealEstate');

  const renderSliderGallery = () => {
    return (
      <div className="w-full shrink-0 p-3 sm:w-64">
        <GallerySlider
          ratioClass="aspect-w-1 aspect-h-1"
          galleryImgs={galleryImgs}
          className="h-full w-full overflow-hidden rounded-2xl"
          href={listingHref}
        />
      </div>
    );
  };

  const renderTienIch = () => {
    return (
      <div className="inline-grid grid-cols-3 gap-2">
        <div className="flex items-center gap-x-2">
          <span className="hidden sm:inline-block">
            <BedSingle01Icon className="h-4 w-4" />
          </span>
          <span className="text-xs text-neutral-500 dark:text-neutral-400">
            {bedrooms} {tRealEstate('beds')}
          </span>
        </div>

        {/* ---- */}
        <div className="flex items-center gap-x-2">
          <span className="hidden sm:inline-block">
            <Bathtub01Icon className="h-4 w-4" />
          </span>
          <span className="text-xs text-neutral-500 dark:text-neutral-400">
            {bathrooms} {tRealEstate('baths')}
          </span>
        </div>

        {/* ---- */}
        <div className="flex items-center gap-x-2">
          <span className="hidden sm:inline-block">
            <CropIcon className="h-4 w-4" />
          </span>
          <span className="text-xs text-neutral-500 dark:text-neutral-400">
            {area} {areaUnit}
          </span>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    return (
      <div className="flex grow flex-col items-start p-3 sm:pe-6">
        <div className="w-full space-y-4">
          <div className="inline-flex gap-x-3">
            <Badge color="yellow">
              <div className="flex items-center">
                <MapPinIcon className="h-3 w-3" />
                <span className="ms-1">{address}</span>
              </div>
            </Badge>
          </div>
          <div className="flex items-center gap-x-2">
            <h2 className="text-lg font-medium capitalize">
              <span className="line-clamp-2">{title}</span>
            </h2>
          </div>
          {renderTienIch()}
          <div className="w-14 border-b border-neutral-200/80 dark:border-neutral-700"></div>
          <div className="flex w-full items-end justify-between">
            <span className="flex items-center justify-center rounded-lg border-2 border-secondary-500 px-2.5 py-1.5 text-sm leading-none font-medium text-secondary-500">
              {price}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`group nc-PropertyCardH relative overflow-hidden rounded-3xl border border-neutral-200/80 bg-white dark:border-neutral-700 dark:bg-neutral-900 ${className}`}
    >
      <Link href={listingHref} className="absolute inset-0"></Link>
      <div className="flex h-full w-full flex-col sm:flex-row sm:items-center">
        {renderSliderGallery()}
        {renderContent()}
      </div>
    </div>
  );
};

export default PropertyCardH;
