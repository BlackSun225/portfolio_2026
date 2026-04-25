import Image from "next/image";
import Link from "next/link";
import styles from "../lib/styles/card.module.css";
// import { useContext } from "react";
// import { LangContext } from "./navContext";
// import { dictionary } from "../utils/data";
import type { Project } from "@/lib/types";
import CardButton from "./cardButtonText";
import { DeleteButton } from "./DeleteButton";

const arrow = "/arrow.svg";



export default function Card({
  project, date, parentRef, edit = false, remove = false
}: {
    project: Project,
    date?: string,
    parentRef?: string,
    edit?: boolean,
    remove?: boolean
}) {

  // const {lang} = useContext(LangContext);

  return (
    <article className={`${parentRef && parentRef == project.id.toString() ? styles.activeCard : ''} ${styles.card}`} >
      <Image priority fill className={styles.img} alt="" src={project.imageUrl} />
      <Link title={project.title}
        href={project.urlPath} target="_blank" 
        className={styles.infos} 
        rel="noopener noreferrer" // Essential for security and SEO on external links 
      >
        <strong>{date ? new Date(date).toDateString() : ""}</strong>
        <h2 className={styles.h1}>{project.title}</h2>
        <h3 className={styles.techList} >
          {project.technologies.map((tech, index) => {
            return (
              <span className={styles.li} key={index} >{index > 0 && ' • '}{tech}</span>
            );
          })}
        </h3>
        <div className={styles.action}>
          <CardButton />
          <Image 
            className={styles.img} 
            width="40" height="12" src={arrow} 
            alt={`${project.description} - project by a fullstack developer - abidjan`} 
            />
        </div>
      </Link>
      {
        remove && <DeleteButton projectId={project.id} />
      }
      {
        edit && <Link className={styles.edit} href={`/portfolio/edit/${project.id}`} >✒️</Link>
      }
      <div className={styles.progress}></div> 
    </article>
  );
}