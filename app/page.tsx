"use client"



import styles from "@/app/lib/styles/home.module.css";
import Image from "next/image";
import Link from "next/link";
import GradientSection from "./components/gradientSection";
import { ViewTransition } from 'react';
import { usePathname } from "next/navigation";

import { useContext } from "react";
import { LangContext } from "./components/navContext";
import { dictionary } from "./utils/data";
import { vt } from "./lib/viewTransition";

const arrow = "/arrow.svg";
const baie = "/water_flow.jpg";
const african_future = "/african_future.jpg";
const craftmanship = "/craftmanship.jpg";



export default function Home() {

  const {lang} = useContext(LangContext);
  const pathname = usePathname();

  const isHome = pathname === "/";

  return (
    <>
      <GradientSection 
      title={dictionary.home.gradientSection.h1[lang]} 
      paragraph={dictionary.home.gradientSection.p[lang]} 
      imagePath={african_future} invite={true} />

      <section className={styles.two}>
        <div className={styles.left}>
          <div className={styles.img} >
              <Image fill src={baie} alt="" />
          </div>
        </div>
        <div className={styles.right}>
          <h2>{dictionary.home.two.h2[lang]}</h2>
          <p>{dictionary.home.two.p[lang]}</p>
          <Link href="/work" className={styles.invite} >
            <span>{lang == "fr" ? "VOIR MES PROJETS" : "VIEW MY WORK"}</span>
            <Image width="40" height="12" alt="" src={arrow} />
          </Link>
        </div>
      </section>
      <section className={styles.three}>
        <div className={styles.left}>
          <h2>{dictionary.home.three.h2[lang]}</h2>
          <p>{dictionary.home.three.p[lang]}
          </p>
          <Link href="/services" className={styles.invite}>
            <span>{`${lang == "fr" ? "VOIR MES" : "VIEW MY"} SERVICES`}</span>
            <Image width="40" height="12"  alt="" src={arrow} />
          </Link>
        </div>
        <div className={styles.right}>
          <div className={styles.img}>
            <ViewTransition name={vt.service} share="morph" >
              <Image fill alt="" src={craftmanship} />
            </ViewTransition>
          </div>
        </div>
      </section>
    </>
  );
}
