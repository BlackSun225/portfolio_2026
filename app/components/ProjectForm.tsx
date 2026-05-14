"use client"

import { useRouter } from 'next/navigation';
import { useState, useRef, useContext } from 'react';
import { createProject, updateProject } from '@/app/actions/projects';
import { hasError, hasErrors } from '@/lib/typeGuards';
import Image from 'next/image';
import { LangContext} from "./navContext";
// import { LangPrefix } from "../utils/models";

import styles from "../lib/styles/projectForm.module.css";

import type { Project } from '@/lib/types';

interface ProjectFormProps {
  initialData?: Project;
  isEditing?: boolean;
}

export function ProjectForm({ initialData, isEditing = false }: ProjectFormProps) {
  const router = useRouter();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {lang} = useContext(LangContext);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    initialData?.imageUrl || null
  );
  const [imageName, setImageName] = useState<string>("");

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

    console.log("result : ", result);
    if (result.success) {
      router.push('/portfolio');
      router.refresh();
    } else {
      // Use type guards to check the error type
      if (hasError(result)) {
        // result is now typed as { success: false; error: string }
        setErrors({ form: result.error });
      } else if (hasErrors(result)) {
        // result is now typed as { success: false; errors: Array<{ field: string; message: string }> }
        const errorMap: Record<string, string> = {};
        result.errors.forEach(err => {
          errorMap[err.field] = err.message;
        });
        setErrors(errorMap);
      } else {
        setErrors({ form: 'An unexpected error occurred' });
      }
      setPreviewUrl(null);
      setImageName("");
    }

    setIsSubmitting(false);
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    console.log("file : ", file);

    if (file) {
      if(file.size > 1024 * 1024) { //to check if image is gretter than 1Mo
        const imageSizeError = {
          fr: "L'image séléctionnée fait plus d'1Mo",
          en: "Image size was greater than 1Mo"
        }
        setErrors({image: imageSizeError[lang]});
      }else{
        setErrors({image: ""});
        setImageName(file.name);
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
      }
    }
  }


  return (
    <section className={styles.projectForm}>
      <h1>{initialData ? "Edit project" : "Create New Project"}</h1>
      <div className={styles.fakeBody}>
        <form action={handleSubmit} className={styles.form}>
          {/* Form error message */}
          {errors.form && (
            <div className={styles.error}>
              {errors.form}
            </div>
          )}

          {/* Title field */}
          <label htmlFor="title" className={styles.inputBox}>
            <span className={`${styles.label} ${styles.required}`}>Title</span>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={initialData?.title}
              className={styles.input}
              placeholder="Project title"
            />
            {errors.title && (
              <p className={styles.error}>{errors.title}</p>
            )}
          </label>

          {/* Description field */}
          <label htmlFor="description"className={styles.inputBox}  >
            <span className={`${styles.label} ${styles.required}`} >Description</span>
            <textarea
              id="description"
              name="description"
              rows={4}
              defaultValue={initialData?.description}
              className={styles.textarea}
              placeholder="Describe your project, it's used in image alt for SEO so add techno details "
            />
            {errors.description && (
              <p className={styles.error}>{errors.description}</p>
            )}
          </label>

          {/* Project URL field */}
          <label htmlFor="urlPath" className={styles.inputBox} >
            <span className={`${styles.label} ${styles.required}`} >Project URL</span>
            <input
              type="url"
              id="urlPath"
              name="urlPath"
              defaultValue={initialData?.urlPath}
              className={styles.input}
              placeholder="https://myproject.com"
            />
            {errors.urlPath && (
              <p className={styles.error}>{errors.urlPath}</p>
            )}
          </label>

          {/* Technologies field */}
          <label htmlFor="technologies" className={styles.inputBox} >
            <span className={`${styles.label} ${styles.required}`} >Technologies (comma-separated)</span>
            <input
              type="text"
              id="technologies"
              name="technologies"
              defaultValue={initialTechnologies}
              className={styles.input}
              placeholder="Very useful for SEO so list all like : React, TypeScript, Node.js"
            />
            {errors.technologies && (
              <p className={styles.error}>{errors.technologies}</p>
            )}
          </label>

          {/* Image upload field */}
          <label htmlFor="image" className={styles.mediaInputBox}  >
            <span className={`${styles.label} ${styles.required}`} >Add Project Image 🖼️</span>
            <input
              ref={fileInputRef} 
              className={styles.mediaInput}
              type="file"
              id="image"
              name="image"
              accept="image/jpeg,image/png,image/gif,image/webp"
              onChange={handleImageChange}
            />
            {errors.image && (
              <p className={styles.error}>{errors.image}</p>
            )}
          </label>
          <span>{imageName}</span>

          {/* Form buttons */}
          <div className={styles.rowBetween}>
            <button
              type="submit"
              disabled={isSubmitting}
              className={styles.submitBtn}
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
              disabled={isSubmitting}
              onClick={() => router.back()}
              className={styles.backBtn}
            >
              Retour
            </button>
          </div>
        </form>

        {/* Image preview */}

        {
          previewUrl && (
          <div className={styles.imgBox} >
            <Image
              src={previewUrl}
              alt="Preview"
              fill
              className={styles.previewImg}
            />
          </div>
          )
        }
        
      </div>
    </section>
    
  );
}