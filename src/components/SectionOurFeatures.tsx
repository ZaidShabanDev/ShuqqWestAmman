import ourFeatureImage from '@/images/our-features.png';
import { Badge } from '@/shared/Badge';
import { Heading } from '@/shared/Heading';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { FC } from 'react';

const SectionOurFeatures: FC = () => {
  const t = useTranslations('HeroSearchForm');
  const subHeading = t('benefits');
  const heading = t('primeProperties');
  type BadgeColor = 'red' | 'green' | 'blue';

  const listItems: {
    badge: string;
    badgeColor?: BadgeColor;
    title: string;
    description: string;
  }[] = [
    {
      badge: t('listing'),
      title: t('professionalPropertyListing'),
      description: t('professionalListingDescription'),
    },
    {
      badge: t('exposure'),
      badgeColor: 'green',
      title: t('connectWithQualifiedBuyers'),
      description: t('qualifiedBuyersDescription'),
    },
    {
      badge: t('service'),
      badgeColor: 'red',
      title: t('personalAndReliable'),
      description: t('personalServiceDescription'),
    },
  ];
  return (
    <div className={'relative flex flex-col items-center lg:flex-row'}>
      <div className="grow">
        <Image src={ourFeatureImage} alt="Features" sizes="(max-width: 1024px) 100vw, 50vw" priority />
      </div>
      <div className={`mt-10 max-w-2xl shrink-0 lg:mt-0 lg:w-2/5 lg:ps-16`}>
        <span className="text-sm tracking-widest text-gray-400 uppercase">{subHeading}</span>
        <Heading className="mt-4">{heading}</Heading>

        <ul className="mt-16 flex flex-col items-start gap-y-10">
          {listItems.map((item, index) => (
            <li className="flex flex-col items-start gap-y-4" key={index}>
              <Badge color={item.badgeColor}>{item.badge}</Badge>
              <span className="block text-xl font-semibold">{item.title}</span>
              <span className="block text-neutral-500 dark:text-neutral-400">{item.description}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SectionOurFeatures;
