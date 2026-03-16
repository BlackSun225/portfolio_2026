"use client"

import { useRouter } from 'next/navigation';
import { useState, useRef } from 'react';
import { createProject, updateProject } from '@/app/actions/projects';
import { hasError, hasErrors } from '@/lib/typeGuards'; // Import type guards
import Image from 'next/image';
import type { Project } from '@/lib/types';

interface ProjectFormProps {
  initialData?: Project;
  isEditing?: boolean;
}

export function ProjectForm({ initialData, isEditing = false }: ProjectFormProps) {
  const router = useRouter();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    initialData?.imageUrl || null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Convert technologies array to comma-separated string for form
  const initialTechnologies = initialData?.technologies?.join(', ') || '';

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    setErrors({});

    let result;
    if (isEditing && initialData) {
      result = await updateProject(initialData.id, formData);
    } else {
      result = await createProject(formData);
    }

    if (result.success) {
      router.push('/projects');
      router.refresh();
    } else {
      // Use type guards to check the error type
      if (hasError(result)) {
        // result is now typed as { success: false; error: string }
        setErrors({ form: result.error });
      } 
      else if (hasErrors(result)) {
        // result is now typed as { success: false; errors: Array<{ field: string; message: string }> }
        const errorMap: Record<string, string> = {};
        result.errors.forEach(err => {
          errorMap[err.field] = err.message;
        });
        setErrors(errorMap);
      }
      else {
        setErrors({ form: 'An unexpected error occurred' });
      }
    }

    setIsSubmitting(false);
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  }

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Create New Project</h1>
      <form action={handleSubmit} className="space-y-6 max-w-2xl">
        {/* Form error message */}
        {errors.form && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {errors.form}
          </div>
        )}

        {/* Title field */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            defaultValue={initialData?.title}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="My Awesome Project"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title}</p>
          )}
        </div>

        {/* Description field */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            defaultValue={initialData?.description}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Describe your project..."
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description}</p>
          )}
        </div>

        {/* Project URL field */}
        <div>
          <label htmlFor="urlPath" className="block text-sm font-medium text-gray-700">
            Project URL *
          </label>
          <input
            type="url"
            id="urlPath"
            name="urlPath"
            defaultValue={initialData?.urlPath}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="https://myproject.com"
          />
          {errors.urlPath && (
            <p className="mt-1 text-sm text-red-600">{errors.urlPath}</p>
          )}
        </div>

        {/* Technologies field */}
        <div>
          <label htmlFor="technologies" className="block text-sm font-medium text-gray-700">
            Technologies * (comma-separated)
          </label>
          <input
            type="text"
            id="technologies"
            name="technologies"
            defaultValue={initialTechnologies}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="React, TypeScript, Node.js"
          />
          {errors.technologies && (
            <p className="mt-1 text-sm text-red-600">{errors.technologies}</p>
          )}
          <p className="mt-1 text-sm text-gray-500">
            Example: React, Next.js, Tailwind CSS
          </p>
        </div>

        {/* Image upload field */}
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">
            Project Image *
          </label>
          <input
            ref={fileInputRef}
            type="file"
            id="image"
            name="image"
            accept="image/jpeg,image/png,image/gif,image/webp"
            onChange={handleImageChange}
            className="mt-1 block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
          
          {/* Image preview */}
          {previewUrl && (
            <div className="mt-4 relative h-48 w-full rounded-lg overflow-hidden border">
              <Image
                src={previewUrl}
                alt="Preview"
                fill
                className="object-cover"
              />
            </div>
          )}
          
          {errors.image && (
            <p className="mt-1 text-sm text-red-600">{errors.image}</p>
          )}
        </div>

        {/* Form buttons */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
          >
            {isSubmitting 
              ? 'Saving...' 
              : isEditing 
                ? 'Update Project' 
                : 'Create Project'
            }
          </button>
          
          <button
            type="button"
            onClick={() => router.back()}
            className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </>
    
  );
}