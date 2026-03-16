"use client"

import arrow from "@/public/arrow.svg";
import Image from "next/image";
import Link from "next/link";
import styles from "../lib/styles/card.module.css";
import { useContext } from "react";
import { LangContext } from "./navContext";
import { dictionary } from "../utils/data";
import type { Project } from "@/lib/db";


export default function Card({
    project, keyId, date, parentRef
}: {
    project: Project,
    keyId?: string,
    date?: string,
    parentRef?: string,
}) {

  const {lang} = useContext(LangContext);

  return (
    <Link href={project.urlPath} target="_blank" className={`${parentRef && parentRef == keyId ? styles.activeCard : ''} ${styles.card}`} >
      <Image priority fill className={styles.img} alt="" src={project.imageUrl} />
      <div className={styles.infos}>
        <strong>{date ? new Date(date).toDateString() : ""}</strong>
        <h1>{project.title}</h1>
        <h2>BlackSun225</h2>
        <div className={styles.line}></div>
        <div className={styles.action}>
          <span>{dictionary.cardActionText[lang]}</span> <Image className={styles.img} src={arrow} alt="" />
        </div>
      </div>
      <div className={styles.progress}></div> 
    </Link>
  );
}