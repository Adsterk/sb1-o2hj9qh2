import React from 'react';
import { useForm } from 'react-hook-form';
import { User } from 'lucide-react';

interface ProfileFormData {
  name: string;
  email: string;
}

interface ProfileSectionProps {
  name: string;
  email: string;
  onSave: (data: ProfileFormData) => void;
}

export function ProfileSection({ name, email, onSave }: ProfileSectionProps) {
  const { register, handleSubmit } = useForm<ProfileFormData>({
    defaultValues: { name, email },
  });

  return (
    <section className="space-y-4">
      <div className="flex items-center space-x-2">
        <User className="h-5 w-5 text-gray-500" />
        <h2 className="text-lg font-medium text-gray-900">Profile Information</h2>
      </div>
      
      <form onSubmit={handleSubmit(onSave)} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            {...register('name')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register('email')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>

        <button
          type="submit"
          className="inline-flex justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save Profile
        </button>
      </form>
    </section>
  );
}