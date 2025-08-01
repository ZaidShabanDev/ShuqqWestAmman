'use client';

import ButtonSecondary from '@/shared/ButtonSecondary';
import Heading from '@/shared/Heading';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';
import { FC, ReactNode } from 'react';

interface Props {
  heading: ReactNode;
  subHeading?: string;
  rightButtonHref?: string;
}

const SectionTabHeader: FC<Props> = ({ subHeading, heading, rightButtonHref = '/stay-categories/all' }) => {
  const t = useTranslations('common');
  return (
    <div className="relative flex flex-col">
      <Heading subheading={subHeading}>{heading}</Heading>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <ButtonSecondary className="ml-auto shrink-0" href={rightButtonHref}>
          <span>{t('View all')}</span>
          <ArrowRightIcon className="size-5 rtl:rotate-180" />
        </ButtonSecondary>
      </div>
    </div>
  );
};

export default SectionTabHeader;
