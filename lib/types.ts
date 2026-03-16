// types/actions.ts
export type ActionResponse = 
  | { success: true }
  | { success: false; error: string }
  | { success: false; errors: Array<{ field: string; message: string }> };



// types/project.ts
export interface Project {
  id: number;
  title: string;
  description: string;
  urlPath: string;
  imageUrl: string;
  technologies: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

// For form data (technologies as string)
export interface ProjectFormData {
  title: string;
  description: string;
  urlPath: string;
  technologies: string; // Comma-separated string
}