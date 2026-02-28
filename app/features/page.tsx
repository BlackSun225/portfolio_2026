"use client"


import responsive from "@/public/responsive.svg";
import noLimit from "@/public/no-limit.svg";
import embed from "@/public/embed.svg";
import customDomain from "@/public/custom-domain.svg";
import exposure from "@/public/boost-exposure.svg";
import drag from "@/public/drag-drop.svg";
import craftmanship from "@/public/craftmanship.jpg";

import { useEffect, useContext } from "react";
import { LangContext } from "../components/navContext";
import { dictionary } from "../utils/data";
import GradientSection from "../components/gradientSection";
import styles from "@/app/lib/styles/features.module.css";
import Image from "next/image";
import Attract from "../components/attract";


export default function Features() {
    const {lang} = useContext(LangContext);

    return (
        <div className={styles.features}>
            <GradientSection 
            title={dictionary.features.gradient.h1[lang]} 
            paragraph={dictionary.features.gradient.p[lang]} 
            imagePath={craftmanship} 
            invite={false} />

            <section className={styles.pros}>
                <div className={styles.box}>
                    <Image className={styles.img} src={responsive} alt="" />
                    <h2>{dictionary.features.box1.h2[lang]}</h2>
                    <p>{dictionary.features.box1.p[lang]}</p>
                </div>
                <div className={styles.box}>
                    <Image className={styles.img} src={noLimit} alt="" />
                    <h2>{dictionary.features.box2.h2[lang]}</h2>
                    <p>{dictionary.features.box2.p[lang]}</p>
                </div>
                <div className={styles.box}>
                    <Image className={styles.img} src={embed} alt="" />
                    <h2>{dictionary.features.box3.h2[lang]}</h2>
                    <p>{dictionary.features.box3.p[lang]}</p>
                </div>
                <div className={styles.box}>
                    <Image className={styles.img} src={customDomain} alt="" />
                    <h2>{dictionary.features.box4.h2[lang]}</h2>
                    <p>{dictionary.features.box4.p[lang]}</p>
                </div>
                <div className={styles.box}>
                    <Image className={styles.img} src={exposure} alt="" />
                    <h2>{dictionary.features.box5.h2[lang]}</h2>
                    <p>{dictionary.features.box5.p[lang]}</p>
                </div>
                <div className={styles.box}>
                    <Image className={styles.img} src={drag} alt="" />
                    <h2>{dictionary.features.box6.h2[lang]}</h2>
                    <p>{dictionary.features.box6.p[lang]}</p>
                </div>
            </section>
            <Attract h1={dictionary.attract.h1[lang]} />
        </div>
    );
}