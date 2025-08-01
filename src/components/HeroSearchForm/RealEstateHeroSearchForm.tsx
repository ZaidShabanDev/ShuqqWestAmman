'use client';

import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import Form from 'next/form';
import { useRouter } from 'next/navigation';
import { FC, useEffect } from 'react';
import {
  ButtonSubmit,
  LocationInputField,
  PriceRangeInputField,
  PropertyTypeSelectField,
  VerticalDividerLine,
} from './ui';

interface Props {
  className?: string;
  formStyle: 'default' | 'small';
}

export const RealEstateHeroSearchForm: FC<Props> = ({ className, formStyle = 'default' }) => {
  const t = useTranslations('HeroSearchForm');
  const router = useRouter();

  // Prefetch the stay categories page to improve performance
  useEffect(() => {
    router.prefetch('/real-estate-categories/all');
  }, [router]);

  const handleFormSubmit = (formData: FormData) => {
    const formDataEntries = Object.fromEntries(formData.entries());
    console.log('Form submitted', formDataEntries);
    // You can also redirect or perform other actions based on the form data

    // example: add location to the URL
    const location = formDataEntries['location'] as string;
    let url = '/real-estate-categories/all';
    if (location) {
      url = url + `?location=${encodeURIComponent(location)}`;
    }
    router.push(url);
  };

  return (
    <Form
      action={handleFormSubmit}
      className={clsx(
        'relative z-10 w-full bg-white [--form-bg:var(--color-white)] dark:bg-neutral-800 dark:[--form-bg:var(--color-neutral-800)]',
        className,
        formStyle === 'small' && 'rounded-t-2xl rounded-b-4xl custom-shadow-1',
        formStyle === 'default' &&
          'rounded-t-2xl rounded-b-[40px] shadow-xl xl:rounded-t-3xl xl:rounded-b-[48px] dark:shadow-2xl'
      )}
    >
      {/*  */}
      <div className="relative flex">
        <LocationInputField className="hero-search-form__field-after flex-1" fieldStyle={formStyle} />
        <VerticalDividerLine />
        <PropertyTypeSelectField
          fieldStyle={formStyle}
          className="hero-search-form__field-before hero-search-form__field-after flex-1"
        />
        <VerticalDividerLine />
        <PriceRangeInputField
          fieldStyle={formStyle}
          className="hero-search-form__field-before flex-1"
          clearDataButtonClassName={clsx(formStyle === 'small' && 'sm:end-18', formStyle === 'default' && 'sm:end-22')}
        />

        <ButtonSubmit fieldStyle={formStyle} />
      </div>
    </Form>
  );
};
