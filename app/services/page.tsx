"use client"


import responsive from "@/public/responsive.svg";
import embed from "@/public/embed.svg";
import customDomain from "@/public/custom-domain.svg";
import training from "@/public/training.png";
import craftmanship from "@/public/craftmanship.jpg";
import application from "@/public/application.png";
import leadership from "@/public/leadership.png";

import { useEffect, useContext } from "react";
import { LangContext } from "../components/navContext";
import { dictionary } from "../utils/data";
import GradientSection from "../components/gradientSection";
import styles from "@/app/lib/styles/services.module.css";
import Image from "next/image";
import Attract from "../components/attract";


export default function Features() {
    const {lang} = useContext(LangContext);

    return (
        <div className={styles.services}>
            <GradientSection 
            title={dictionary.services.gradient.h1[lang]} 
            paragraph={dictionary.services.gradient.p[lang]} 
            imagePath={craftmanship} 
            invite={false} />

            <section className={styles.pros}>
                <div className={styles.box}>
                    <Image className={styles.img} src={leadership} alt="" />
                    <h2>{dictionary.services.box1.h2[lang]}</h2>
                    <p>{dictionary.services.box1.p[lang]}</p>
                </div>
                <div className={styles.box}>
                    <Image className={styles.img} src={application} alt="" />
                    <h2>{dictionary.services.box2.h2[lang]}</h2>
                    <p>{dictionary.services.box2.p[lang]}</p>
                </div>
                <div className={styles.box}>
                    <Image className={styles.img} src={embed} alt="" />
                    <h2>{dictionary.services.box3.h2[lang]}</h2>
                    <p>{dictionary.services.box3.p[lang]}</p>
                </div>
                <div className={styles.box}>
                    <Image className={styles.img} src={training} alt="" />
                    <h2>{dictionary.services.box4.h2[lang]}</h2>
                    <p>{dictionary.services.box4.p[lang]}</p>
                </div>
                <div className={styles.box}>
                    <Image className={styles.img} src={responsive} alt="" />
                    <h2>{dictionary.services.box5.h2[lang]}</h2>
                    <p>{dictionary.services.box5.p[lang]}</p>
                </div>
                <div className={styles.box}>
                    <Image className={styles.img} src={customDomain} alt="" />
                    <h2>{dictionary.services.box6.h2[lang]}</h2>
                    <p>{dictionary.services.box6.p[lang]}</p>
                </div>
            </section>
            <Attract h1={dictionary.attract.h1[lang]} />
        </div>
    );
}