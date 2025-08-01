import PropertyCardH from '@/components/PropertyCardH';
import { TRealEstateListing } from '@/data/listings';
import ButtonPrimary from '@/shared/ButtonPrimary';
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import SectionTabHeader from './SectionTabHeader';

interface Props {
  listing: TRealEstateListing[];
  className?: string;
}

const SectionGridFeatureProperty: FC<Props> = ({
  listing,
  className,
}) => {
  const t = useTranslations('common');
  const tHero = useTranslations('HeroSearchForm');

  return (
    <div className={clsx('relative', className)}>
      <SectionTabHeader
        subHeading={tHero("Explore the finest residential and commercial properties in Jordan's capital")}
        heading={tHero('Your Perfect Amman Property Awaits')}
        rightButtonHref="/properties"
      />
      <div className={'mt-8 grid grid-cols-1 gap-x-6 gap-y-7 sm:grid-cols-1 xl:grid-cols-2'}>
        {listing.map((listing) => {
          return <PropertyCardH key={listing.id} className="h-full" data={listing} />;
        })}
      </div>
      <div className="mt-16 flex items-center justify-center">
        <ButtonPrimary href={'/properties'}>
          {t('Show me more')}
          <ArrowRightIcon className="h-5 w-5 rtl:rotate-180" />
        </ButtonPrimary>
      </div>
    </div>
  );
};

export default SectionGridFeatureProperty;
