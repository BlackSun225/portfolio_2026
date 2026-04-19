"use client"


import Image from "next/image";
import Link from "next/link";
import styles from "../lib/styles/card.module.css";
import { useContext } from "react";
import { LangContext } from "./navContext";
import { dictionary } from "../utils/data";
import type { Project } from "@/lib/types";

const arrow = "/arrow.svg";

export default function Card({
    project, date, parentRef, edit = false
}: {
    project: Project,
    date?: string,
    parentRef?: string,
    edit?: boolean
}) {

  const {lang} = useContext(LangContext);

  return (
    <div className={`${parentRef && parentRef == project.id.toString() ? styles.activeCard : ''} ${styles.card}`} >
      <Image priority fill className={styles.img} alt="" src={project.imageUrl} />
      <Link href={project.urlPath} target="_blank" className={styles.infos}>
        <strong>{date ? new Date(date).toDateString() : ""}</strong>
        <h1>{project.title}</h1>
        <h2>{project.technologies.join(" - ")}</h2>
        <div className={styles.action}>
          <span>{dictionary.cardActionText[lang]}</span> 
          <Image className={styles.img} width="40" height="12" src={arrow} alt="" />
        </div>
      </Link>
      {
        edit && <Link className={styles.editDelete} href={`/portfolio/edit/${project.id}`} >✒️</Link>
      }
      <div className={styles.progress}></div> 
    </div>
  );
}