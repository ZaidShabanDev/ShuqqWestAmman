'use client';

import convertNumbThousand from '@/utils/convertNumbThousand';
import { useTranslations } from 'next-intl';
import Form from 'next/form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import FieldPanelContainer from './FieldPanelContainer';
import LocationInput from './LocationInput';
import PriceRangeInput from './ui/PriceRangeInput';
import PropertyTypeSelect from './ui/PropertyTypeSelect';

const RealestateSearchFormMobile = () => {
  const t = useTranslations('HeroSearchForm');

  //
  const [fieldNameShow, setFieldNameShow] = useState<'location' | 'propertyType' | 'price'>('location');
  //
  const [locationInputTo, setLocationInputTo] = useState('');
  const [rangePrices, setRangePrices] = useState([10000, 400000]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const router = useRouter();

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

  let typeStringConverted = selectedTypes.length ? selectedTypes.join(', ') : t('Add property');
  return (
    <Form id="form-hero-search-form-mobile" action={handleFormSubmit} className="flex w-full flex-col gap-y-3">
      {/* LOCATION INPUT */}
      <FieldPanelContainer
        isActive={fieldNameShow === 'location'}
        headingOnClick={() => setFieldNameShow('location')}
        headingTitle={t('Where')}
        headingValue={locationInputTo || t('Location')}
      >
        <LocationInput
          defaultValue={locationInputTo}
          onChange={(value) => {
            setLocationInputTo(value);
            setFieldNameShow('propertyType');
          }}
        />
      </FieldPanelContainer>

      {/* SELECT */}
      <FieldPanelContainer
        isActive={fieldNameShow === 'propertyType'}
        headingOnClick={() => setFieldNameShow('propertyType')}
        headingTitle={t('Property')}
        headingValue={typeStringConverted}
      >
        <PropertyTypeSelect onChange={setSelectedTypes} />
      </FieldPanelContainer>

      {/* PRICE RANGE  */}
      <FieldPanelContainer
        isActive={fieldNameShow === 'price'}
        headingOnClick={() => setFieldNameShow('price')}
        headingTitle={t('Price')}
        headingValue={`$${convertNumbThousand(rangePrices[0] / 1000)}k ~ $${convertNumbThousand(rangePrices[1] / 1000)}k`}
      >
        <PriceRangeInput defaultValue={rangePrices} onChange={setRangePrices} />
      </FieldPanelContainer>
    </Form>
  );
};

export default RealestateSearchFormMobile;
