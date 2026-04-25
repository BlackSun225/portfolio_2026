import { Project } from '@/lib/db';
import { Suspense } from 'react';
import Card from '../components/card';
import { DeleteButton } from '@/app/components/DeleteButton';
import BorderButton from '../components/borderButton';
import styles from "../lib/styles/work.module.css";
import Loading from '../components/loading';

export const dynamic = 'force-dynamic'

// This is a Server Component - fetches data directly from DB
export default async function ProjectsPage() {
  return (
    <Suspense fallback={<Loading />} >
      <FetchProjectsPage />
    </Suspense>

  );
}


async function FetchProjectsPage() {
  const projects = await Project.findAll({
    order: [['createdAt', 'DESC']],
  });

  return (
    <main>
      <section className={styles.projectListHeader}>
        <h1>My Projects</h1>
        <div>
          <p>{projects.length} project{projects.length !== 1 ? 's' : ''}</p>
          <BorderButton text="New Project" to="/portfolio/new" />
        </div>
      </section>
      
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
              <Card key={project.id} project={project} edit={true} remove={true} />
            );
            
          })}
        </div>
      )}
    </main>
  );
}