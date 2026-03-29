import { Suspense } from 'react';
import { Project } from '@/lib/db';
import ProjectList from "../components/ProjectList";
import StoriesLoading from './loading';

async function StoriesCollection() {
    const projects = await Project.findAll({
        order: [['createdAt', 'DESC']],
    });

    return (
        <main>
            {projects.length === 0 ? (
                <div className={""}>
                    <p className={""}>No projects yet. Create your first project!</p>
                </div>
            ) : 
                <ProjectList data={projects.map(elem => elem.get({plain: true}))} />
            }
        </main>
    );
}

export default async function Stories() {

    return (
        <>
            {/* I use suspense to be sure to display the nav and footer component instantly 
            and show the loading component between the nav and footer component while the work collection load.
            All the tag or component above the suspense will be shown directly even if 
            the work loading isn't available*/}
            <Suspense fallback={<StoriesLoading />}>
                <StoriesCollection />
            </Suspense>
        </>
    );
}