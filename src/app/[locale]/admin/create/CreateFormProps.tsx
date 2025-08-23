'use client';

import {
  Amenity,
  FormErrors,
  GovernorateType,
  PropertyFormData,
  PropertyFormSchema,
  PropertyType,
} from '@/lib/validators';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, JSX, useState } from 'react';
import z from 'zod';

export default function CreatePropertyForm(): JSX.Element {
  const router = useRouter();
  const t = useTranslations('propertiesListings');
  const [formData, setFormData] = useState<PropertyFormData>({
    // Basic Information
    title: '',
    description: '',
    propertyType: 'House',
    governorateType: 'Amman',

    // Location
    address: '',
    city: '',
    state: '',
    country: '',

    // Property Details
    bedrooms: '',
    bathrooms: '',
    area: '',
    areaUnit: 'sqft',
    yearBuilt: '',

    // Pricing
    price: '',

    // Amenities
    amenities: [],

    // Images
    images: [],
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});

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

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
    const { name, value, type } = e.target;

    if (type === 'radio') {
      const target = e.target as HTMLInputElement;
      setFormData((prev) => ({
        ...prev,
        [name]: target.value as 'rent' | 'sale',
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleAmenityChange = (amenity: Amenity): void => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const validateForm = (): boolean => {
    try {
      // Exclude images from validation as it's handled separately
      const { images, ...formDataWithoutImages } = formData;
      PropertyFormSchema.parse(formDataWithoutImages);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: FormErrors = {};
        error.issues.forEach((err) => {
          if (err.path.length > 0) {
            const pathString = String(err.path[0]);
            newErrors[pathString] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!validateForm()) {
      // Scroll to first error
      const firstErrorField = Object.keys(errors)[0];
      if (firstErrorField) {
        const element = document.querySelector(`[name="${firstErrorField}"]`) as HTMLElement;
        element?.focus();
        element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsSubmitting(true);

    try {
      // Create FormData for file upload
      const submitData = new FormData();

      console.log('Submitting form data:', formData);

      //   const response = await fetch('/api/properties', {
      //     method: 'POST',
      //     body: submitData,
      //   });

      //   const result = await response.json();

      //   if (response.ok) {
      //     console.log('Property created:', result);
      //     // Show success message
      //     alert('Property listing created successfully!');
      //     // Redirect to properties page or property detail page
      //     router.push(`/properties/${result.property?.id || ''}`);
      //   } else {
      //     throw new Error(result.message || 'Failed to create property listing');
      //   }
    } catch (error) {
      console.error('Error creating property:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      alert(`Error creating property listing: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeImage = (index: number): void => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="mb-8 text-3xl font-bold">{t('title')}</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="rounded-lg bg-white p-6 text-neutral-900 shadow-md dark:bg-neutral-900 dark:text-neutral-100">
          <h2 className="mb-4 text-xl font-semibold">{t('basicInfoTitle')}</h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">{t('propertyTitle')} *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className={`w-full rounded-lg border bg-white p-3 text-neutral-900 focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800 dark:text-neutral-100 ${
                  errors.title ? 'border-red-500' : 'border-gray-300 dark:border-neutral-600'
                }`}
                placeholder={t('propertyTitlePlaceholder')}
              />
              {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">{t('propertyType')} *</label>
              <select
                name="propertyType"
                value={formData.propertyType}
                onChange={handleInputChange}
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
              {errors.propertyType && <p className="mt-1 text-sm text-red-500">{errors.propertyType}</p>}
            </div>
          </div>

          <div className="mt-4">
            <label className="mb-2 block text-sm font-medium">{t('description')} *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className={`w-full rounded-lg border bg-white p-3 text-neutral-900 focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800 dark:text-neutral-100 ${
                errors.description ? 'border-red-500' : 'border-gray-300 dark:border-neutral-600'
              }`}
              placeholder={t('descriptionPlaceholder')}
            />
            {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
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
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className={`w-full rounded-lg border bg-white p-3 text-neutral-900 focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800 dark:text-neutral-100 ${
                  errors.address ? 'border-red-500' : 'border-gray-300 dark:border-neutral-600'
                }`}
                placeholder={t('streetAddressPlaceholder')}
              />
              {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address}</p>}
            </div>

            {/* Building Number */}
            <div>
              <label className="mb-2 block text-sm font-medium">{t('buildingNumber')}</label>
              <input
                type="text"
                name="buildingNumber"
                value={formData.buildingNumber}
                onChange={handleInputChange}
                className={`w-full rounded-lg border bg-white p-3 text-neutral-900 focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800 dark:text-neutral-100 ${
                  errors.buildingNumber ? 'border-red-500' : 'border-gray-300 dark:border-neutral-600'
                }`}
                placeholder="123"
              />
              {errors.buildingNumber && <p className="mt-1 text-sm text-red-500">{errors.buildingNumber}</p>}
            </div>

            {/* Floor/Apartment */}
            <div>
              <label className="mb-2 block text-sm font-medium">{t('floorApartment')}</label>
              <input
                type="text"
                name="floorApartment"
                value={formData.floorApartment}
                onChange={handleInputChange}
                className={`w-full rounded-lg border bg-white p-3 text-neutral-900 focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800 dark:text-neutral-100 ${
                  errors.floorApartment ? 'border-red-500' : 'border-gray-300 dark:border-neutral-600'
                }`}
                placeholder={t('floorApartmentPlaceholder')}
              />
              {errors.floorApartment && <p className="mt-1 text-sm text-red-500">{errors.floorApartment}</p>}
            </div>

            {/* Area/Neighborhood */}
            <div>
              <label className="mb-2 block text-sm font-medium">{t('area')}</label>
              <input
                type="text"
                name="area"
                value={formData.area}
                onChange={handleInputChange}
                className={`w-full rounded-lg border bg-white p-3 text-neutral-900 focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800 dark:text-neutral-100 ${
                  errors.area ? 'border-red-500' : 'border-gray-300 dark:border-neutral-600'
                }`}
                placeholder={t('areaPlaceholder')}
              />
              {errors.area && <p className="mt-1 text-sm text-red-500">{errors.area}</p>}
            </div>

            {/* City */}
            <div>
              <label className="mb-2 block text-sm font-medium">{t('city')}</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className={`w-full rounded-lg border bg-white p-3 text-neutral-900 focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800 dark:text-neutral-100 ${
                  errors.city ? 'border-red-500' : 'border-gray-300 dark:border-neutral-600'
                }`}
                placeholder={t('cityPlaceholder')}
              />
              {errors.city && <p className="mt-1 text-sm text-red-500">{errors.city}</p>}
            </div>

            {/* Governorate */}
            <div>
              <label className="mb-2 block text-sm font-medium">{t('governorate')}</label>
              <select
                name="governorate"
                value={formData.governorate}
                onChange={handleInputChange}
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
              {errors.governorate && <p className="mt-1 text-sm text-red-500">{errors.governorate}</p>}
            </div>

            {/* Postal Code */}
            <div>
              <label className="mb-2 block text-sm font-medium">{t('postalCode')}</label>
              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleInputChange}
                className={`w-full rounded-lg border bg-white p-3 text-neutral-900 focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800 dark:text-neutral-100 ${
                  errors.postalCode ? 'border-red-500' : 'border-gray-300 dark:border-neutral-600'
                }`}
                placeholder="11111"
                pattern="[0-9]{5}"
              />
              {errors.postalCode && <p className="mt-1 text-sm text-red-500">{errors.postalCode}</p>}
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{t('postalCodeHint')}</p>
            </div>

            {/* Landmark */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium">{t('landmark')}</label>
              <input
                type="text"
                name="landmark"
                value={formData.landmark}
                onChange={handleInputChange}
                className={`w-full rounded-lg border bg-white p-3 text-neutral-900 focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800 dark:text-neutral-100 ${
                  errors.landmark ? 'border-red-500' : 'border-gray-300 dark:border-neutral-600'
                }`}
                placeholder={t('landmarkPlaceholder')}
              />
              {errors.landmark && <p className="mt-1 text-sm text-red-500">{errors.landmark}</p>}
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
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleInputChange}
                min="0"
                max="50"
                className={`w-full rounded-lg border bg-white p-3 text-neutral-900 focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800 dark:text-neutral-100 ${
                  errors.bedrooms ? 'border-red-500' : 'border-gray-300 dark:border-neutral-600'
                }`}
              />
              {errors.bedrooms && <p className="mt-1 text-sm text-red-500">{errors.bedrooms}</p>}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">{t('bathrooms')}</label>
              <input
                type="number"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleInputChange}
                min="0"
                max="20"
                step="0.5"
                className={`w-full rounded-lg border bg-white p-3 text-neutral-900 focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800 dark:text-neutral-100 ${
                  errors.bathrooms ? 'border-red-500' : 'border-gray-300 dark:border-neutral-600'
                }`}
              />
              {errors.bathrooms && <p className="mt-1 text-sm text-red-500">{errors.bathrooms}</p>}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">{t('propertyArea')}</label>
              <input
                type="number"
                name="area"
                value={formData.area}
                onChange={handleInputChange}
                min="1"
                className={`w-full rounded-lg border bg-white p-3 text-neutral-900 focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800 dark:text-neutral-100 ${
                  errors.area ? 'border-red-500' : 'border-gray-300 dark:border-neutral-600'
                }`}
              />
              {errors.area && <p className="mt-1 text-sm text-red-500">{errors.area}</p>}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">{t('unit')}</label>
              <select
                name="areaUnit"
                value={formData.areaUnit}
                onChange={handleInputChange}
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
              type="number"
              name="yearBuilt"
              value={formData.yearBuilt}
              onChange={handleInputChange}
              min="1800"
              max={new Date().getFullYear()}
              className={`w-full rounded-lg border bg-white p-3 text-neutral-900 focus:ring-2 focus:ring-blue-500 md:w-1/4 dark:bg-neutral-800 dark:text-neutral-100 ${
                errors.yearBuilt ? 'border-red-500' : 'border-gray-300 dark:border-neutral-600'
              }`}
            />
            {errors.yearBuilt && <p className="mt-1 text-sm text-red-500">{errors.yearBuilt}</p>}
          </div>
        </div>

        {/* Pricing */}
        <div className="rounded-lg bg-white p-6 text-neutral-900 shadow-md dark:bg-neutral-900 dark:text-neutral-100">
          <h2 className="mb-4 text-xl font-semibold">{t('pricingTitle')}</h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium">{t('price')}</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                min="1"
                step="0.01"
                className={`w-full rounded-lg border bg-white p-3 text-neutral-900 focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800 dark:text-neutral-100 ${
                  errors.price ? 'border-red-500' : 'border-gray-300 dark:border-neutral-600'
                }`}
              />
              {errors.price && <p className="mt-1 text-sm text-red-500">{errors.price}</p>}
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
                  checked={formData.amenities.includes(amenity)}
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

          <div>
            <label className="mb-2 block text-sm font-medium">{t('uploadImages')}</label>
            <input
              type="file"
              multiple
              accept="image/*"
              className="w-full rounded-lg border border-gray-300 bg-white p-3 text-neutral-900 focus:ring-2 focus:ring-blue-500 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-100"
            />
            <p className="mt-1 text-sm text-gray-500 dark:text-neutral-400">{t('imageRequirements')}</p>

            {formData.images.length > 0 && (
              <div className="mt-4">
                <p className="mb-2 text-sm text-gray-600 dark:text-neutral-300">
                  {t('imagesSelected', { count: formData.images.length })}
                </p>
                <div className="space-y-2">
                  {formData.images.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded bg-gray-50 p-2 dark:bg-neutral-800"
                    >
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="ml-2 text-red-500 hover:text-red-700"
                      >
                        {t('removeImage')}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
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
