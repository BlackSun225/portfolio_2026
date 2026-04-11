// app/projects/[id]/edit/page.tsx
import { Project } from '@/lib/db';
import { ProjectForm } from '@/app/components/ProjectForm';
import { notFound } from 'next/navigation';

interface PageProps {
  params: {
    id: string;
  };
}

export const dynamic = 'force-dynamic'

export default async function EditProjectPage({ params }: PageProps) {
  const project = await Project.findByPk(params.id);
  
  if (!project) {
    notFound();
  }

  // Convert Sequelize model to plain JSON object
  // Use get({ plain: true }) to get a plain JavaScript object
  const projectData = project.get({ plain: true });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Edit Project</h1>
      <ProjectForm initialData={projectData} isEditing={true} />
    </div>
  );
}