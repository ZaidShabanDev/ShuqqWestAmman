import HeroSectionWithSearchForm from '@/components/Header/HeroSectionWithSearchForm';
import { RealEstateHeroSearchForm } from '@/components/HeroSearchForm/RealEstateHeroSearchForm';
import ListingFilterTabs from '@/components/ListingFilterTabs';
import PropertyCardH from '@/components/PropertyCardH';
import { getRealEstateListingFilterOptions } from '@/data/listings';
import realEstateCategoryCoverImage from '@/images/hero-right-real-estate.png';
import { getRealEstateListings } from '@/lib/actions/property.actions';
import { Divider } from '@/shared/divider';
import Pagination from '@/shared/Pagination';
import { House01Icon, MapPinpoint02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { getTranslations } from 'next-intl/server';

async function Page() {
  const listings = await getRealEstateListings();
  const filterOptions = await getRealEstateListingFilterOptions();

  const t = await getTranslations('RealEstate');
  return (
    <div className="pb-28">
      {/* Hero section */}
      <div className="container">
        <HeroSectionWithSearchForm
          heading={t('Shuqq West Amman')}
          image={realEstateCategoryCoverImage}
          imageAlt={t('Shuqq West Amman')}
          searchForm={<RealEstateHeroSearchForm formStyle="default" />}
          description={
            <div className="flex items-center sm:text-lg">
              <HugeiconsIcon icon={MapPinpoint02Icon} size={20} color="currentColor" strokeWidth={1.5} />
              <span className="ms-2.5">{t('Jordan')} </span>
              <span className="mx-5"></span>
              <HugeiconsIcon icon={House01Icon} size={20} color="currentColor" strokeWidth={1.5} />
              <span className="ms-2.5">
                {listings.length} {t('properties')}
              </span>
            </div>
          }
        />
      </div>

      {/* Content */}
      <div className="relative container mt-14 lg:mt-24">
        {/* start heading */}
        <div className="flex flex-wrap items-end justify-between gap-x-2.5 gap-y-5">
          <h2 id="heading" className="scroll-mt-20 text-lg font-semibold text-pretty sm:text-xl">
            {t('Over')} {listings.length} {t('propertiesObj')}
          </h2>
        </div>
        <Divider className="my-8 md:mb-12" />
        {/* end heading */}

        <ListingFilterTabs filterOptions={filterOptions} />
        <div className="mt-8 grid grid-cols-1 gap-8 lg:mt-10 xl:grid-cols-2">
          {listings.map((listing) => (
            <PropertyCardH key={listing.id} data={listing} />
          ))}
        </div>
        <div className="mt-20 flex items-center justify-center">
          <Pagination />
        </div>
      </div>
    </div>
  );
}

export default Page;
