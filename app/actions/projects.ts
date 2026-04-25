'use server';

import { revalidatePath } from 'next/cache';
import { Project } from '@/lib/db';
import { uploadImage, deleteImage } from '@/lib/imageService';
import { check, z } from 'zod';

// Validation schema
const ProjectSchema = z.object({
  title: z.string().trim()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must be less than 100 characters'),
  
  description: z.string().trim()
    .min(10, 'Description must be at least 10 characters')
    .max(1000, 'Description must be less than 1000 characters'),
  
  urlPath: z.url('Must be a valid URL'),
  
  technologies: z.string().trim()
    .transform(str => str.split(',').map(t => t.trim()).filter(Boolean))
    .refine(arr => arr.length > 0, 'At least one technology is required'),
});


// Define return types for better type safety
type ActionResponse = 
  | { success: true }
  | { success: false; error: string }
  | { success: false; errors: Array<{ field: string; message: string }> };


//CREATE
export async function createProject(formData: FormData): Promise<ActionResponse> {
  try {
    console.log('🚀 Creating new project...');

    // Validate text fields
    const validatedData = ProjectSchema.parse({
      title: formData.get('title'),
      description: formData.get('description'),
      urlPath: formData.get('urlPath'),
      technologies: formData.get('technologies'),
    });
    console.log("field validated");
    console.log("checking title and urlPath")

    const [checkTitle, checkUrlPath] = await Promise.all([
      Project.findOne({where: {title: validatedData.title}}),
      Project.findOne({where: {urlPath: validatedData.urlPath}})
    ]);

    if(checkTitle || checkUrlPath) {
      const errorsResponse: {success: false, errors: {field: string, message: string}[] | []} = {
        success: false,
        errors: []
      };

      if(checkTitle) {
        errorsResponse.errors = [...errorsResponse.errors, {
          field: "title",
          message: "title should be unique"
        }];
      }

      if(checkUrlPath) {
        errorsResponse.errors = [...errorsResponse.errors, {
          field: "urlPath",
          message: "urlPath should be unique"
        }];
      }

      return errorsResponse;
    }

    
    // Handle image upload
    const imageFile = formData.get('image') as File;
    
    if (!imageFile || imageFile.size === 0) {
      return { success: false, error: 'Image is required' };
    }

    const imageUrl = await uploadImage(imageFile);
    console.log('✅ Image uploaded:', imageUrl);

    // Save to database
    await Project.create({
      ...validatedData,
      imageUrl,
    });

    revalidatePath('/projects');
    
    return { success: true };

  } catch (error) {
    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      // ✅ FIX: Use error.issues instead of error.errors
      // ZodError has 'issues' array, each with path and message
      return { 
        success: false, 
        errors: error.issues.map(issue => ({
          field: issue.path.join('.'),
          message: issue.message
        }))
      };
    }
    
    // Handle other errors
    console.error('❌ Error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to create project' 
    };
  }
}


//UPDATE
export async function updateProject(id: number, formData: FormData): Promise<ActionResponse> {
  try {
    console.log(`🚀 Updating project ${id}...`);

    const project = await Project.findByPk(id);
    if (!project) {
      return { success: false, error: 'Project not found' };
    }
    console.log("found project : ", project.dataValues);

    // Handle image if new one uploaded
    const imageFile = formData.get('image') as File;
    let imageUrl = project.imageUrl;

    if (imageFile && imageFile.size > 0) {
      console.log('📤 Uploading new image...');
      
      // Delete old image
      console.log("prev project image url : ", project.dataValues.imageUrl);
      const oldFilename = project.dataValues.imageUrl.split('/').pop();
      if (oldFilename) {
        await deleteImage(oldFilename).catch(() => {
          console.log('⚠️ Could not delete old image');
        });
      }
      
      // Upload new image
      imageUrl = await uploadImage(imageFile);
    }

    // Validate form data
    const validatedData = ProjectSchema.parse({
      title: formData.get('title'),
      description: formData.get('description'),
      urlPath: formData.get('urlPath'),
      technologies: formData.get('technologies'),
    });

    // Update database
    await project.update({
      ...validatedData,
      imageUrl,
    });

    revalidatePath('/projects');
    revalidatePath(`/projects/${id}`);
    
    return { success: true };

  } catch (error) {
    if (error instanceof z.ZodError) {
      // ✅ FIX: Use error.issues
      return { 
        success: false, 
        errors: error.issues.map(issue => ({
          field: issue.path.join('.'),
          message: issue.message
        }))
      };
    }
    
    console.error('❌ Error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to update project' 
    };
  }
}


//DELETE
export async function deleteProject(id: number): Promise<ActionResponse> {
  try {
    console.log(`🚀 Deleting project ${id}...`);

    const project = await Project.findByPk(id);
    
    if (!project) {
      return { success: false, error: 'Project not found' };
    }

    // Delete image from image server
    const filename = project.dataValues.imageUrl.split('/').pop();
    if (filename) {
      await deleteImage(filename).catch(() => {
        console.log('⚠️ Could not delete image from server');
      });
    }

    // Delete from database
    await project.destroy();
    
    revalidatePath('/projects');
    
    return { success: true };
  } catch (error) {
    console.error('❌ Error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to delete project' 
    };
  }
}