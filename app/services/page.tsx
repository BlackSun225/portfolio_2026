"use client"

import { useContext } from "react";
import { LangContext } from "../components/navContext";
import { dictionary } from "../utils/data";
import GradientSection from "../components/gradientSection";
import styles from "@/app/lib/styles/services.module.css";
import Image from "next/image";
import Attract from "../components/attract";

const responsive = "/responsive.svg";
const embed = "/embed.svg";
const customDomain = "/custom-domain.svg";
const training = "/training.png";
const craftmanship = "/craftmanship.jpg";
const application = "/application.png";
const leadership = "/leadership.png";

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
                    <div className={styles.img} >
                        <Image fill src={leadership} alt="" />
                    </div>
                    <h2>{dictionary.services.box1.h2[lang]}</h2>
                    <p>{dictionary.services.box1.p[lang]}</p>
                </div>
                <div className={styles.box}>
                    <div className={styles.img} >
                        <Image fill src={application} alt="" />
                    </div>
                    <h2>{dictionary.services.box2.h2[lang]}</h2>
                    <p>{dictionary.services.box2.p[lang]}</p>
                </div>
                <div className={styles.box}>
                    <div className={styles.img} >
                        <Image fill src={embed} alt="" />
                    </div>
                    <h2>{dictionary.services.box3.h2[lang]}</h2>
                    <p>{dictionary.services.box3.p[lang]}</p>
                </div>
                <div className={styles.box}>
                    <div className={styles.img}>
                        <Image fill src={training} alt="" />
                    </div>
                    <h2>{dictionary.services.box4.h2[lang]}</h2>
                    <p>{dictionary.services.box4.p[lang]}</p>
                </div>
                <div className={styles.box}>
                    <div className={styles.img}>
                        <Image fill src={responsive} alt="" />
                    </div>
                    <h2>{dictionary.services.box5.h2[lang]}</h2>
                    <p>{dictionary.services.box5.p[lang]}</p>
                </div>
                <div className={styles.box}>
                    <div className={styles.img} >
                        <Image fill src={customDomain} alt="" />
                    </div>
                    <h2>{dictionary.services.box6.h2[lang]}</h2>
                    <p>{dictionary.services.box6.p[lang]}</p>
                </div>
            </section>
            <Attract h1={dictionary.attract.h1[lang]} />
        </div>
    );
}