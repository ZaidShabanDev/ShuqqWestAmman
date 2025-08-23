import { z } from "zod";

export const PropertyFormSchema = z.object({
  // Basic Information
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters').max(2000, 'Description must be less than 2000 characters'),
  propertyType: z.enum(['House', 'Apartment', 'Condo', 'Townhouse', 'Studio', 'Villa', 'Commercial', 'Land']),
  governorateType: z.enum(['Amman', 'Zarqa', 'Irbid', 'Aqaba', 'Mafraq', 'Balqa', 'Madaba', 'Karak', 'Tafilah', 'Jerash', 'Ajloun',]),  
  // Location
  address: z.string().min(1, 'Address is required').max(200, 'Address must be less than 200 characters'),
  buildingNumber: z.string().max(20, 'Building number must be less than 20 characters').optional().or(z.literal('')),
  floorApartment: z.string().max(20, 'Floor/Apartment must be less than 20 characters').optional().or(z.literal('')),
  governorate: z.string().max(50, 'Governorate must be less than 50 characters').optional().or(z.literal('')),
  city: z.string().min(1, 'City is required').max(50, 'City must be less than 50 characters'),
  state: z.string().max(50, 'State must be less than 50 characters').optional().or(z.literal('')),
  postalCode: z.string().max(20, 'ZIP code must be less than 20 characters').optional().or(z.literal('')),
  landmark: z.string().max(100, 'Landmark must be less than 50 characters').optional().or(z.literal('')),
  country: z.string().max(50, 'Country must be less than 50 characters').optional().or(z.literal('')),
  
  // Property Details
  bedrooms: z.string().optional().or(z.literal('')).refine((val) => {
    if (val === '' || val === undefined) return true;
    const num = parseInt(val);
    return !isNaN(num) && num >= 0 && num <= 50;
  }, 'Bedrooms must be a valid number between 0 and 50'),
  bathrooms: z.string().optional().or(z.literal('')).refine((val) => {
    if (val === '' || val === undefined) return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0 && num <= 20;
  }, 'Bathrooms must be a valid number between 0 and 20'),
  area: z.string().optional().or(z.literal('')).refine((val) => {
    if (val === '' || val === undefined) return true;
    const num = parseFloat(val);
    return !isNaN(num) && num > 0;
  }, 'Area must be a positive number'),
  areaUnit: z.enum(['sqft', 'sqm']),
  yearBuilt: z.string().optional().or(z.literal('')).refine((val) => {
    if (val === '' || val === undefined) return true;
    const num = parseInt(val);
    const currentYear = new Date().getFullYear();
    return !isNaN(num) && num >= 1800 && num <= currentYear;
  }, `Year built must be between 1800 and ${new Date().getFullYear()}`),
  
  // Pricing
  price: z.string().min(1, 'Price is required').refine((val) => {
    const num = parseFloat(val);
    return !isNaN(num) && num > 0;
  }, 'Price must be a positive number'),
  
  // Amenities
  amenities: z.array(z.string()).default([]),
});

// Type inference from Zod schema
export type PropertyFormData = z.infer<typeof PropertyFormSchema> & {
    images: string[];
};

export interface FormErrors {
  [key: string]: string;
}

export type PropertyType = z.infer<typeof PropertyFormSchema>['propertyType'];
export type GovernorateType = z.infer<typeof PropertyFormSchema>['governorateType'];
export type Amenity = 'Parking' | 'Pool' | 'Gym' | 'Garden' | 'Balcony' | 'Furnished' | 
               'AirConditioning' | 'Heating' | 'Wifi' | 'Security' | 'Elevator'