import React from 'react';
import { ListPlus, X } from 'lucide-react';
import type { CustomField } from '../../types/mood';

interface CustomFieldsSectionProps {
  fields: CustomField[];
  onUpdate: (fields: CustomField[]) => void;
}

export function CustomFieldsSection({ fields, onUpdate }: CustomFieldsSectionProps) {
  const addField = () => {
    const newField: CustomField = {
      id: Date.now().toString(),
      label: '',
      type: 'text',
      required: false,
    };
    onUpdate([...fields, newField]);
  };

  const updateField = (id: string, updates: Partial<CustomField>) => {
    onUpdate(
      fields.map((field) =>
        field.id === id ? { ...field, ...updates } : field
      )
    );
  };

  const removeField = (id: string) => {
    onUpdate(fields.filter((field) => field.id !== id));
  };

  return (
    <section className="space-y-4">
      <div className="flex items-center space-x-2">
        <ListPlus className="h-5 w-5 text-gray-500" />
        <h2 className="text-lg font-medium text-gray-900">Custom Fields</h2>
      </div>

      <div className="space-y-4">
        {fields.map((field) => (
          <div key={field.id} className="flex items-start space-x-4 bg-gray-50 p-4 rounded-md">
            <div className="flex-grow space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Field Label
                </label>
                <input
                  type="text"
                  value={field.label}
                  onChange={(e) => updateField(field.id, { label: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>

              <div className="flex space-x-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Field Type
                  </label>
                  <select
                    value={field.type}
                    onChange={(e) => updateField(field.id, { type: e.target.value as CustomField['type'] })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  >
                    <option value="text">Text</option>
                    <option value="number">Number</option>
                    <option value="multiselect">Multi-select</option>
                  </select>
                </div>

                <div className="flex items-center pt-6">
                  <input
                    type="checkbox"
                    id={`required-${field.id}`}
                    checked={field.required}
                    onChange={(e) => updateField(field.id, { required: e.target.checked })}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor={`required-${field.id}`} className="ml-2 block text-sm text-gray-900">
                    Required
                  </label>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => removeField(field.id)}
              className="p-1 text-gray-400 hover:text-gray-500"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={addField}
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <ListPlus className="h-4 w-4 mr-2" />
          Add Custom Field
        </button>
      </div>
    </section>
  );
}