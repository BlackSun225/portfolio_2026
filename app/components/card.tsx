// "use client"
// import { useState } from "react";

import arrow from "@/public/arrow.svg";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import styles from "../lib/styles/card.module.css"

export default function Card({
    clickPath, keyId, imagePathPortrait, date, parentRef, title, author
}: {
    clickPath: string,
    keyId?: string,
    imagePathPortrait: StaticImageData,
    date?: string,
    parentRef?: string,
    title: string,
    author: string,
}) {

  return (
    <Link href={clickPath} className={`${parentRef && parentRef == keyId ? styles.activeCard : ''} ${styles.card}`} >
      <Image className={styles.img} alt="" src={imagePathPortrait} />
      <div className={styles.infos}>
        <strong>{date ? new Date(date).toDateString() : ""}</strong>
        <h1>{title.toString()}</h1>
        <h2>{`By ${author}`}</h2>
        <div className={styles.line}></div>
        <div className={styles.action}>
          <span>READ STORY</span> <Image className={styles.img} src={arrow} alt="" />
        </div>
      </div>
      <div className={styles.progress}></div> 
    </Link>
  );
}