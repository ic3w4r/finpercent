import React from 'react';
import { ChevronDown } from 'lucide-react';

interface UserDetailsFormProps {
  onSubmit: (data: UserFormData) => void;
}

export interface UserFormData {
  name: string;
  businessName: string;
  businessCategory: string;
  phoneNumber: string;
  location: string;
}

const businessCategories = [
  'Retail',
  'Manufacturing',
  'Services',
  'Technology',
  'Healthcare',
  'Finance',
  'Other',
];

export default function UserDetailsForm({ onSubmit }: UserDetailsFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      businessName: formData.get('businessName') as string,
      businessCategory: formData.get('businessCategory') as string,
      phoneNumber: formData.get('phoneNumber') as string,
      location: formData.get('location') as string,
    };
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="businessName" className="block text-sm font-medium text-gray-700">
            Business Name
          </label>
          <input
            type="text"
            name="businessName"
            id="businessName"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="businessCategory" className="block text-sm font-medium text-gray-700">
            Business Category
          </label>
          <div className="relative">
            <select
              name="businessCategory"
              id="businessCategory"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 appearance-none"
            >
              <option value="">Select a category</option>
              {businessCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none w-5 h-5" />
          </div>
        </div>

        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="tel"
            name="phoneNumber"
            id="phoneNumber"
            required
            pattern="[0-9]{10}"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            type="text"
            name="location"
            id="location"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Submit Details
      </button>
    </form>
  );
}
