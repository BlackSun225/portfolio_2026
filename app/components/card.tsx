// "use client"
// import { useState } from "react";

import arrow from "@/public/arrow.svg";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import styles from "../lib/styles/card.module.css";
import { useContext } from "react";
import { LangContext } from "./navContext";
import { dictionary } from "../utils/data";


export default function Card({
    clickPath, keyId, imagePathPortrait, date, parentRef, title /*, author*/
}: {
    clickPath: string,
    keyId?: string,
    imagePathPortrait: StaticImageData | string,
    date?: string,
    parentRef?: string,
    title: string,
    // author: string,
}) {

  const {lang} = useContext(LangContext);

  return (
    <Link href={clickPath} target="_blank" className={`${parentRef && parentRef == keyId ? styles.activeCard : ''} ${styles.card}`} >
      <Image priority fill className={styles.img} alt="" src={imagePathPortrait} />
      <div className={styles.infos}>
        <strong>{date ? new Date(date).toDateString() : ""}</strong>
        <h1>{title.toString()}</h1>
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