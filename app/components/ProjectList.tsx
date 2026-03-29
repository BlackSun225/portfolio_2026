import type { Project } from "@/lib/types";
import Card from "./card";

import styles from "../lib/styles/work.module.css";


export default function ProjectList({data}: {data: Project[]}) {

    return (
        <div className={styles.gallery}>
            {data.map((project) => {
                return <Card key={project.id} project={project} />;
            })}
        </div>
    );

}