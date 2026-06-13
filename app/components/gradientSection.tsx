"use client"

import Cta from "./cta";
import styles from "../lib/styles/gradientSection.module.css";
import Image from "next/image";
import { ViewTransition } from "react";
import { vt } from "../lib/viewTransition";
import { usePathname } from "next/navigation";

export default function GradientSection({
  title, paragraph, imagePath, invite
} : {
  title: string, paragraph: string, imagePath: string, invite: boolean
}) {
    const path = usePathname();

    function getViewTransitionName(path: string) {
        if(path == "/services") {
            return vt.service;
        }

        return '';
    }

    return (
        <section className={styles.one}>
            <div className={styles.left}>
                <div className={`${styles.horizontalGradient} ${styles.mob}`}></div>

                <div className={styles.text}> 
                    <div className={`${styles.verticalGradient} ${styles.desk}`}></div> 
                    <h1>{title.toUpperCase()}</h1>
                    <p>{paragraph}</p>
                    {invite ? <Cta /> : null}
                </div>
            </div>
            <div className={styles.right}>
                <ViewTransition name={getViewTransitionName(path)} share="morph" >
                    <Image fill alt="" src={imagePath} />
                </ViewTransition>
            </div>
        </section>
    );
}