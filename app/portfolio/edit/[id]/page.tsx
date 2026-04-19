// app/projects/[id]/edit/page.tsx
import { Suspense } from 'react';
import { Project } from '@/lib/db';
import { ProjectForm } from '@/app/components/ProjectForm';
import { notFound } from 'next/navigation';
import Loading from '@/app/components/loading';


export const dynamic = 'force-dynamic'

export default async function EditProjectPage({ params }: {params: Promise<{id: string}>}) {
  const {id} = await params;

  return (
    <Suspense fallback={<Loading />}>
      <FetchProjectToEdit id={id} />
    </Suspense>
  );
}


async function FetchProjectToEdit({ id }: { id: string}) {
  const project = await Project.findByPk(id);
  
  if (!project) {
    notFound();
  }

  // Convert Sequelize model to plain JSON object
  // Use get({ plain: true }) to get a plain JavaScript object
  const projectData = project.get({ plain: true });
  console.log("project data : ", projectData);

  return (
    <ProjectForm initialData={projectData} isEditing={true} />
  );
}