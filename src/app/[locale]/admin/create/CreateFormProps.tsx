'use client';

import { createProduct } from '@/lib/actions/property.actions';
import { UploadButton } from '@/lib/uploadthing';
import { Amenity, GovernorateType, PropertyFormData, PropertyFormSchema, PropertyType } from '@/lib/validators';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { JSX, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export default function CreatePropertyForm(): JSX.Element {
  const router = useRouter();
  const t = useTranslations('propertiesListings');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PropertyFormData>({
    resolver: zodResolver(PropertyFormSchema),
    defaultValues: {
      // Basic Information
      title: '',
      handle: '',
      description: '',
      propertyType: 'House',
      governorateType: 'Amman',

      // Location
      address: '',
      city: '',
      state: '',
      country: '',
      buildingNumber: '',
      floorApartment: '',
      neighborhood: '',
      governorate: '',
      landmark: '',
      postalCode: '',

      // Property Details
      bedrooms: 0,
      bathrooms: 0,
      area: '',
      areaUnit: 'sqft',
      yearBuilt: '',

      // Pricing
      price: '',

      // Amenities
      amenities: [],

      // Images
      galleryImgs: [],
    },
  });

  const watchedAmenities = watch('amenities');
  const watchedImages = watch('galleryImgs');

  const propertyTypes: PropertyType[] = [
    'House',
    'Apartment',
    'Condo',
    'Townhouse',
    'Studio',
    'Villa',
    'Commercial',
    'Land',
  ];

  const governorateType: GovernorateType[] = [
    'Amman',
    'Zarqa',
    'Irbid',
    'Aqaba',
    'Mafraq',
    'Karak',
    'Tafilah',
    'Jerash',
    'Ajloun',
  ];

  const amenitiesList: Amenity[] = [
    'Parking',
    'Pool',
    'Gym',
    'Garden',
    'Balcony',
    'Furnished',
    'AirConditioning',
    'Heating',
    'Wifi',
    'Security',
    'Elevator',
  ];

  const handleAmenityChange = (amenity: Amenity): void => {
    const currentAmenities = watchedAmenities || [];
    const newAmenities = currentAmenities.includes(amenity)
      ? currentAmenities.filter((a) => a !== amenity)
      : [...currentAmenities, amenity];

    setValue('amenities', newAmenities);
  };

  const onSubmit: SubmitHandler<PropertyFormData> = async (data) => {
    setIsSubmitting(true);

    try {
      // Generate handle from title
      const handle = data.title
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9\-]/g, '')
        .substring(0, 100);

      const submitData = {
        ...data,
        handle,
      };

      const result = await createProduct(submitData);

      if (!result.success) {
        toast.error(result.message);
      } else {
        toast.success(result.message);
        router.push('/properties');
      }
    } catch (error) {
      console.error('Error creating property:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="mb-8 text-3xl font-bold">{t('title')}</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Basic Information */}
        <div className="rounded-lg bg-white p-6 text-neutral-900 shadow-md dark:bg-neutral-900 dark:text-neutral-100">
          <h2 className="mb-4 text-xl font-semibold">{t('basicInfoTitle')}</h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">{t('propertyTitle')} *</label>
              <input
                type="text"
                {...register('title')}
                className={`w-full rounded-lg border bg-white p-3 text-neutral-900 focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800 dark:text-neutral-100 ${
                  errors.title ? 'border-red-500' : 'border-gray-300 dark:border-neutral-600'
                }`}
                placeholder={t('propertyTitlePlaceholder')}
              />
              {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">{t('propertyType')} *</label>
              <select
                {...register('propertyType')}
                className={`w-full rounded-lg border bg-white p-3 text-neutral-900 focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800 dark:text-neutral-100 ${
                  errors.propertyType ? 'border-red-500' : 'border-gray-300 dark:border-neutral-600'
                }`}
              >
                {propertyTypes.map((type) => (
                  <option key={type} value={type}>
                    {t(`propertyType${type}`)}
                  </option>
                ))}
              </select>
              {errors.propertyType && <p className="mt-1 text-sm text-red-500">{errors.propertyType.message}</p>}
            </div>
          </div>

          <div className="mt-4">
            <label className="mb-2 block text-sm font-medium">{t('description')} *</label>
            <textarea
              {...register('description')}
              rows={4}
              className={`w-full rounded-lg border bg-white p-3 text-neutral-900 focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800 dark:text-neutral-100 ${
                errors.description ? 'border-red-500' : 'border-gray-300 dark:border-neutral-600'
              }`}
              placeholder={t('descriptionPlaceholder')}
            />
            {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>}
          </div>
        </div>

        {/* Location */}
        <div className="rounded-lg bg-white p-6 text-neutral-900 shadow-md dark:bg-neutral-900 dark:text-neutral-100">
          <h2 className="mb-4 text-xl font-semibold">{t('locationTitle')}</h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Street Address */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium">{t('streetAddress')} *</label>
              <input
                type="text"
                {...register('address')}
                className={`w-full rounded-lg border bg-white p-3 text-neutral-900 focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800 dark:text-neutral-100 ${
                  errors.address ? 'border-red-500' : 'border-gray-300 dark:border-neutral-600'
                }`}
                placeholder={t('streetAddressPlaceholder')}
              />
              {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address.message}</p>}
            </div>

            {/* Building Number */}
            <div>
              <label className="mb-2 block text-sm font-medium">{t('buildingNumber')}</label>
              <input
                type="text"
                {...register('buildingNumber')}
                className={`w-full rounded-lg border bg-white p-3 text-neutral-900 focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800 dark:text-neutral-100 ${
                  errors.buildingNumber ? 'border-red-500' : 'border-gray-300 dark:border-neutral-600'
                }`}
                placeholder="123"
              />
              {errors.buildingNumber && <p className="mt-1 text-sm text-red-500">{errors.buildingNumber.message}</p>}
            </div>

            {/* Floor/Apartment */}
            <div>
              <label className="mb-2 block text-sm font-medium">{t('floorApartment')}</label>
              <input
                type="text"
                {...register('floorApartment')}
                className={`w-full rounded-lg border bg-white p-3 text-neutral-900 focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800 dark:text-neutral-100 ${
                  errors.floorApartment ? 'border-red-500' : 'border-gray-300 dark:border-neutral-600'
                }`}
                placeholder={t('floorApartmentPlaceholder')}
              />
              {errors.floorApartment && <p className="mt-1 text-sm text-red-500">{errors.floorApartment.message}</p>}
            </div>

            {/* Area/Neighborhood */}
            <div>
              <label className="mb-2 block text-sm font-medium">{t('area')}</label>
              <input
                type="text"
                {...register('neighborhood')}
                className={`w-full rounded-lg border bg-white p-3 text-neutral-900 focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800 dark:text-neutral-100 ${
                  errors.area ? 'border-red-500' : 'border-gray-300 dark:border-neutral-600'
                }`}
                placeholder={t('areaPlaceholder')}
              />
              {errors.area && <p className="mt-1 text-sm text-red-500">{errors.area.message}</p>}
            </div>

            {/* City */}
            <div>
              <label className="mb-2 block text-sm font-medium">{t('city')}</label>
              <input
                type="text"
                {...register('city')}
                className={`w-full rounded-lg border bg-white p-3 text-neutral-900 focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800 dark:text-neutral-100 ${
                  errors.city ? 'border-red-500' : 'border-gray-300 dark:border-neutral-600'
                }`}
                placeholder={t('cityPlaceholder')}
              />
              {errors.city && <p className="mt-1 text-sm text-red-500">{errors.city.message}</p>}
            </div>

            {/* Governorate */}
            <div>
              <label className="mb-2 block text-sm font-medium">{t('governorate')}</label>
              <select
                {...register('governorate')}
                className={`w-full rounded-lg border bg-white p-3 text-neutral-900 focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800 dark:text-neutral-100 ${
                  errors.governorate ? 'border-red-500' : 'border-gray-300 dark:border-neutral-600'
                }`}
              >
                {governorateType.map((type) => (
                  <option key={type} value={type}>
                    {t(`governorate${type}`)}
                  </option>
                ))}
              </select>
              {errors.governorate && <p className="mt-1 text-sm text-red-500">{errors.governorate.message}</p>}
            </div>

            {/* Postal Code */}
            <div>
              <label className="mb-2 block text-sm font-medium">{t('postalCode')}</label>
              <input
                type="text"
                {...register('postalCode')}
                className={`w-full rounded-lg border bg-white p-3 text-neutral-900 focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800 dark:text-neutral-100 ${
                  errors.postalCode ? 'border-red-500' : 'border-gray-300 dark:border-neutral-600'
                }`}
                placeholder="11111"
                pattern="[0-9]{5}"
              />
              {errors.postalCode && <p className="mt-1 text-sm text-red-500">{errors.postalCode.message}</p>}
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{t('postalCodeHint')}</p>
            </div>

            {/* Landmark */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium">{t('landmark')}</label>
              <input
                type="text"
                {...register('landmark')}
                className={`w-full rounded-lg border bg-white p-3 text-neutral-900 focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800 dark:text-neutral-100 ${
                  errors.landmark ? 'border-red-500' : 'border-gray-300 dark:border-neutral-600'
                }`}
                placeholder={t('landmarkPlaceholder')}
              />
              {errors.landmark && <p className="mt-1 text-sm text-red-500">{errors.landmark.message}</p>}
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{t('landmarkHint')}</p>
            </div>
          </div>
        </div>

        {/* Property Details */}
        <div className="rounded-lg bg-white p-6 text-neutral-900 shadow-md dark:bg-neutral-900 dark:text-neutral-100">
          <h2 className="mb-4 text-xl font-semibold">{t('detailsTitle')}</h2>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div>
              <label className="mb-2 block text-sm font-medium">{t('bedrooms')}</label>
              <input
                type="number"
                {...register('bedrooms', { valueAsNumber: true })}
                min="0"
                max="50"
                className={`w-full rounded-lg border bg-white p-3 text-neutral-900 focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800 dark:text-neutral-100 ${
                  errors.bedrooms ? 'border-red-500' : 'border-gray-300 dark:border-neutral-600'
                }`}
              />
              {errors.bedrooms && <p className="mt-1 text-sm text-red-500">{errors.bedrooms.message}</p>}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">{t('bathrooms')}</label>
              <input
                type="number"
                {...register('bathrooms', { valueAsNumber: true })}
                min="0"
                max="20"
                step="0.5"
                className={`w-full rounded-lg border bg-white p-3 text-neutral-900 focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800 dark:text-neutral-100 ${
                  errors.bathrooms ? 'border-red-500' : 'border-gray-300 dark:border-neutral-600'
                }`}
              />
              {errors.bathrooms && <p className="mt-1 text-sm text-red-500">{errors.bathrooms.message}</p>}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">{t('propertyArea')}</label>
              <input
                type="text"
                {...register('area')}
                className={`w-full rounded-lg border bg-white p-3 text-neutral-900 focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800 dark:text-neutral-100 ${
                  errors.area ? 'border-red-500' : 'border-gray-300 dark:border-neutral-600'
                }`}
              />
              {errors.area && <p className="mt-1 text-sm text-red-500">{errors.area.message}</p>}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">{t('unit')}</label>
              <select
                {...register('areaUnit')}
                className="w-full rounded-lg border border-gray-300 bg-white p-3 text-neutral-900 focus:ring-2 focus:ring-blue-500 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-100"
              >
                <option value="sqft">{t('sqft')}</option>
                <option value="sqm">{t('sqm')}</option>
              </select>
            </div>
          </div>

          <div className="mt-4">
            <label className="mb-2 block text-sm font-medium">{t('yearBuilt')}</label>
            <input
              type="text"
              {...register('yearBuilt')}
              className={`w-full rounded-lg border bg-white p-3 text-neutral-900 focus:ring-2 focus:ring-blue-500 md:w-1/4 dark:bg-neutral-800 dark:text-neutral-100 ${
                errors.yearBuilt ? 'border-red-500' : 'border-gray-300 dark:border-neutral-600'
              }`}
            />
            {errors.yearBuilt && <p className="mt-1 text-sm text-red-500">{errors.yearBuilt.message}</p>}
          </div>
        </div>

        {/* Pricing */}
        <div className="rounded-lg bg-white p-6 text-neutral-900 shadow-md dark:bg-neutral-900 dark:text-neutral-100">
          <h2 className="mb-4 text-xl font-semibold">{t('pricingTitle')}</h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium">{t('price')}</label>
              <input
                type="text"
                {...register('price')}
                className={`w-full rounded-lg border bg-white p-3 text-neutral-900 focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800 dark:text-neutral-100 ${
                  errors.price ? 'border-red-500' : 'border-gray-300 dark:border-neutral-600'
                }`}
              />
              {errors.price && <p className="mt-1 text-sm text-red-500">{errors.price.message}</p>}
            </div>
          </div>
        </div>

        {/* Amenities */}
        <div className="rounded-lg bg-white p-6 text-neutral-900 shadow-md dark:bg-neutral-900 dark:text-neutral-100">
          <h2 className="mb-4 text-xl font-semibold">{t('amenitiesTitle')}</h2>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {amenitiesList.map((amenity) => (
              <label key={amenity} className="flex items-center">
                <input
                  type="checkbox"
                  checked={watchedAmenities?.includes(amenity) || false}
                  onChange={() => handleAmenityChange(amenity)}
                  className="mr-2"
                />
                {t(`amenity${amenity}`)}
              </label>
            ))}
          </div>
        </div>

        {/* Images */}
        <div className="rounded-lg bg-white p-6 text-neutral-900 shadow-md dark:bg-neutral-900 dark:text-neutral-100">
          <h2 className="mb-4 text-xl font-semibold">{t('imagesTitle')}</h2>

          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {watchedImages.map((image: string, index: number) => (
                <div key={index} className="relative">
                  <Image
                    src={image}
                    alt="property image"
                    className="h-20 w-20 rounded-sm object-cover object-center"
                    width={80}
                    height={80}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const newImages = watchedImages.filter((_: string, i: number) => i !== index);
                      setValue('galleryImgs', newImages);
                    }}
                    className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white hover:bg-red-600"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={(res: { url: string }[]) => {
                const currentImages = watchedImages || [];
                setValue('galleryImgs', [...currentImages, res[0].url]);
                toast.success('Image uploaded successfully!');
              }}
              onUploadError={(error: Error) => {
                toast.error(`Upload failed: ${error.message}`);
              }}
            />

            <p className="mt-1 text-sm text-gray-500 dark:text-neutral-400">{t('imageRequirements')}</p>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-lg border border-gray-300 bg-white px-6 py-3 text-neutral-900 hover:bg-gray-50 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700"
          >
            {t('cancel')}
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 disabled:bg-blue-400"
          >
            {isSubmitting ? t('creating') : t('createListing')}
          </button>
        </div>
      </form>
    </div>
  );
}
