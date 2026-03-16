import { Project } from '@/lib/db';
import Link from 'next/link';
import Card from '../components/card';
import { DeleteButton } from '@/app/components/DeleteButton';
import styles from "../lib/styles/stories.module.css";

// This is a Server Component - fetches data directly from DB
export default async function ProjectsPage() {
  const projects = await Project.findAll({
    order: [['createdAt', 'DESC']],
  });

  return (
    <main>
      <h1 className="text-3xl font-bold">My Projects</h1>
      <div>
        <p className="text-gray-600 mt-2">
          {projects.length} project{projects.length !== 1 ? 's' : ''}
        </p>
        <Link
          href="/projects/new"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + New Project
        </Link>
      </div>
      {/* Projects grid */}
      {projects.length === 0 ? (
        <div className={""}>
          <p className={""}>No projects yet. Create your first project!</p>
        </div>
      ) : (
        <div className={styles.gallery} >
          {projects.map((project) => {
            project = project.toJSON();

            return (
              <Card key={project.id} project={project} />
              // <div key={project.id} className="relative group">
              //   {/* Admin actions - visible on hover */}
              //   <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
              //     <Link
              //       href={`/projects/${project.id}/edit`}
              //       className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600"
              //     >
              //       Edit
              //     </Link>
              //     <DeleteButton projectId={project.id} />
              //   </div>
              // </div>
            );
            
          })}
        </div>
      )}
    </main>
  );
}