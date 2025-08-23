'use client';

import { Amenity, FormErrors, PropertyFormData, PropertyFormSchema, PropertyType } from '@/lib/validators';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, JSX, useState } from 'react';
import z from 'zod';

export default function CreatePropertyForm(): JSX.Element {
  const router = useRouter();
  const [formData, setFormData] = useState<PropertyFormData>({
    // Basic Information
    title: '',
    description: '',
    propertyType: 'House',
    listingType: 'rent',

    // Location
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',

    // Property Details
    bedrooms: '',
    bathrooms: '',
    area: '',
    areaUnit: 'sqft',
    yearBuilt: '',

    // Pricing
    price: '',
    currency: 'USD',

    // Amenities
    amenities: [],

    // Images
    images: [],

    // Contact Information
    contactName: '',
    contactEmail: '',
    contactPhone: '',
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

  const amenitiesList: Amenity[] = [
    'Parking',
    'Swimming Pool',
    'Gym',
    'Garden',
    'Balcony',
    'Furnished',
    'Air Conditioning',
    'Heating',
    'WiFi',
    'Pet Friendly',
    'Security System',
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

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);

      // Validate file types and sizes
      const validFiles = fileArray.filter((file) => {
        const isValidType = file.type.startsWith('image/');
        const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB
        return isValidType && isValidSize;
      });

      if (validFiles.length !== fileArray.length) {
        alert('Some files were rejected. Please only upload image files under 5MB.');
      }

      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...validFiles],
      }));
    }
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

      // Append all form fields
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'images') {
          // Handle file uploads
          (value as File[]).forEach((file, index) => {
            submitData.append(`images[${index}]`, file);
          });
        } else if (key === 'amenities') {
          // Handle array data
          submitData.append(key, JSON.stringify(value));
        } else {
          submitData.append(key, value as string);
        }
      });

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
      <h1 className="mb-8 text-3xl font-bold">List Your Property</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="rounded-lg bg-white p-6 text-neutral-900 shadow-md dark:bg-neutral-900 dark:text-neutral-100">
          <h2 className="mb-4 text-xl font-semibold">Basic Information</h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">Property Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className={`w-full rounded-lg border bg-white p-3 text-neutral-900 focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800 dark:text-neutral-100 ${
                  errors.title ? 'border-red-500' : 'border-gray-300 dark:border-neutral-600'
                }`}
                placeholder="e.g., Beautiful 3BR House in Downtown"
              />
              {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Property Type *</label>
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
                    {type}
                  </option>
                ))}
              </select>
              {errors.propertyType && <p className="mt-1 text-sm text-red-500">{errors.propertyType}</p>}
            </div>
          </div>

          <div className="mt-4">
            <label className="mb-2 block text-sm font-medium">Listing Type</label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="listingType"
                  value="rent"
                  checked={formData.listingType === 'rent'}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                For Rent
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="listingType"
                  value="sale"
                  checked={formData.listingType === 'sale'}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                For Sale
              </label>
            </div>
          </div>

          <div className="mt-4">
            <label className="mb-2 block text-sm font-medium">Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className={`w-full rounded-lg border bg-white p-3 text-neutral-900 focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800 dark:text-neutral-100 ${
                errors.description ? 'border-red-500' : 'border-gray-300 dark:border-neutral-600'
              }`}
              placeholder="Describe your property..."
            />
            {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
          </div>
        </div>

        {/* Location */}
        <div className="rounded-lg bg-white p-6 text-neutral-900 shadow-md dark:bg-neutral-900 dark:text-neutral-100">
          <h2 className="mb-4 text-xl font-semibold">Location</h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium">Address *</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className={`w-full rounded-lg border bg-white p-3 text-neutral-900 focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800 dark:text-neutral-100 ${
                  errors.address ? 'border-red-500' : 'border-gray-300 dark:border-neutral-600'
                }`}
                placeholder="Street address"
              />
              {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address}</p>}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">City *</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className={`w-full rounded-lg border bg-white p-3 text-neutral-900 focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800 dark:text-neutral-100 ${
                  errors.city ? 'border-red-500' : 'border-gray-300 dark:border-neutral-600'
                }`}
              />
              {errors.city && <p className="mt-1 text-sm text-red-500">{errors.city}</p>}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">State/Province</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className={`w-full rounded-lg border bg-white p-3 text-neutral-900 focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800 dark:text-neutral-100 ${
                  errors.state ? 'border-red-500' : 'border-gray-300 dark:border-neutral-600'
                }`}
              />
              {errors.state && <p className="mt-1 text-sm text-red-500">{errors.state}</p>}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">ZIP/Postal Code</label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                className={`w-full rounded-lg border bg-white p-3 text-neutral-900 focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800 dark:text-neutral-100 ${
                  errors.zipCode ? 'border-red-500' : 'border-gray-300 dark:border-neutral-600'
                }`}
              />
              {errors.zipCode && <p className="mt-1 text-sm text-red-500">{errors.zipCode}</p>}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Country</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className={`w-full rounded-lg border bg-white p-3 text-neutral-900 focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800 dark:text-neutral-100 ${
                  errors.country ? 'border-red-500' : 'border-gray-300 dark:border-neutral-600'
                }`}
              />
              {errors.country && <p className="mt-1 text-sm text-red-500">{errors.country}</p>}
            </div>
          </div>
        </div>

        {/* Property Details */}
        <div className="rounded-lg bg-white p-6 text-neutral-900 shadow-md dark:bg-neutral-900 dark:text-neutral-100">
          <h2 className="mb-4 text-xl font-semibold">Property Details</h2>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div>
              <label className="mb-2 block text-sm font-medium">Bedrooms</label>
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
              <label className="mb-2 block text-sm font-medium">Bathrooms</label>
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
              <label className="mb-2 block text-sm font-medium">Area</label>
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
              <label className="mb-2 block text-sm font-medium">Unit</label>
              <select
                name="areaUnit"
                value={formData.areaUnit}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-gray-300 bg-white p-3 text-neutral-900 focus:ring-2 focus:ring-blue-500 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-100"
              >
                <option value="sqft">sq ft</option>
                <option value="sqm">sq m</option>
              </select>
            </div>
          </div>

          <div className="mt-4">
            <label className="mb-2 block text-sm font-medium">Year Built</label>
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
          <h2 className="mb-4 text-xl font-semibold">Pricing</h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium">
                Price * ({formData.listingType === 'rent' ? 'per month' : 'total'})
              </label>
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

            <div>
              <label className="mb-2 block text-sm font-medium">Currency</label>
              <select
                name="currency"
                value={formData.currency}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-gray-300 bg-white p-3 text-neutral-900 focus:ring-2 focus:ring-blue-500 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-100"
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="JOD">JOD</option>
              </select>
            </div>
          </div>
        </div>

        {/* Amenities */}
        <div className="rounded-lg bg-white p-6 text-neutral-900 shadow-md dark:bg-neutral-900 dark:text-neutral-100">
          <h2 className="mb-4 text-xl font-semibold">Amenities</h2>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {amenitiesList.map((amenity) => (
              <label key={amenity} className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.amenities.includes(amenity)}
                  onChange={() => handleAmenityChange(amenity)}
                  className="mr-2"
                />
                {amenity}
              </label>
            ))}
          </div>
        </div>

        {/* Images */}
        <div className="rounded-lg bg-white p-6 text-neutral-900 shadow-md dark:bg-neutral-900 dark:text-neutral-100">
          <h2 className="mb-4 text-xl font-semibold">Images</h2>

          <div>
            <label className="mb-2 block text-sm font-medium">Upload Property Images</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full rounded-lg border border-gray-300 bg-white p-3 text-neutral-900 focus:ring-2 focus:ring-blue-500 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-100"
            />
            <p className="mt-1 text-sm text-gray-500 dark:text-neutral-400">
              Max 5MB per image. Supported formats: JPG, PNG, WebP
            </p>

            {formData.images.length > 0 && (
              <div className="mt-4">
                <p className="mb-2 text-sm text-gray-600 dark:text-neutral-300">
                  {formData.images.length} image(s) selected:
                </p>
                <div className="space-y-2">
                  {formData.images.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded bg-gray-50 p-2 dark:bg-neutral-800"
                    >
                      <span className="truncate text-sm text-gray-700 dark:text-neutral-200">{file.name}</span>
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="ml-2 text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Contact Information */}
        <div className="rounded-lg bg-white p-6 text-neutral-900 shadow-md dark:bg-neutral-900 dark:text-neutral-100">
          <h2 className="mb-4 text-xl font-semibold">Contact Information</h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-medium">Contact Name</label>
              <input
                type="text"
                name="contactName"
                value={formData.contactName}
                onChange={handleInputChange}
                className={`w-full rounded-lg border bg-white p-3 text-neutral-900 focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800 dark:text-neutral-100 ${
                  errors.contactName ? 'border-red-500' : 'border-gray-300 dark:border-neutral-600'
                }`}
              />
              {errors.contactName && <p className="mt-1 text-sm text-red-500">{errors.contactName}</p>}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Email *</label>
              <input
                type="email"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleInputChange}
                className={`w-full rounded-lg border bg-white p-3 text-neutral-900 focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800 dark:text-neutral-100 ${
                  errors.contactEmail ? 'border-red-500' : 'border-gray-300 dark:border-neutral-600'
                }`}
              />
              {errors.contactEmail && <p className="mt-1 text-sm text-red-500">{errors.contactEmail}</p>}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Phone Number</label>
              <input
                type="tel"
                name="contactPhone"
                value={formData.contactPhone}
                onChange={handleInputChange}
                className={`w-full rounded-lg border bg-white p-3 text-neutral-900 focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800 dark:text-neutral-100 ${
                  errors.contactPhone ? 'border-red-500' : 'border-gray-300 dark:border-neutral-600'
                }`}
              />
              {errors.contactPhone && <p className="mt-1 text-sm text-red-500">{errors.contactPhone}</p>}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-lg border border-gray-300 bg-white px-6 py-3 text-neutral-900 hover:bg-gray-50 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 disabled:bg-blue-400"
          >
            {isSubmitting ? 'Creating...' : 'Create Property Listing'}
          </button>
        </div>
      </form>
    </div>
  );
}
