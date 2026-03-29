"use client"

import african_future from "../public/african_future.jpg";
import leaf from "@/public/leaf.jpg";
import olive from "@/public/olive.jpg";
import arrow from "../public/arrow.svg";
import baie from "@/public/water_flow.jpg";

import styles from "@/app/lib/styles/home.module.css";
import Image from "next/image";
import Link from "next/link";
import GradientSection from "./components/gradientSection";
import Card from "./components/card";

import { useEffect, useContext } from "react";
import { RouteContext, LangContext } from "./components/navContext";
import { dictionary } from "./utils/data";


export default function Home() {

  const {lang} = useContext(LangContext);

  return (
    <>
      <GradientSection 
      title={dictionary.home.gradientSection.h1[lang]} 
      paragraph={dictionary.home.gradientSection.p[lang]} 
      imagePath={african_future} invite={true} />

      <section className={styles.two}>
        <div className={styles.left}>
          <Image className={styles.img} src={baie} alt="" />
        </div>
        <div className={styles.right}>
          <h2>{dictionary.home.two.h2[lang]}</h2>
          <p>{dictionary.home.two.p[lang]}</p>
          <Link href="/work" className={styles.invite} >
            <span>{lang == "fr" ? "VOIR MES PROJETS" : "VIEW MY WORK"}</span>
            <Image alt="" src={arrow} />
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
            <Image alt="" src={arrow} />
          </Link>
        </div>
        <div className={styles.right}>
          <Image alt="" src={olive} />
        </div>
      </section>
      {/* <section className={styles.discover}>
        <Card imagePathPortrait={photograph} title="Photograph of the world" author="Chris" clickPath="/work" />
        <Card imagePathPortrait={capturesmall} title="Photograph of the world" author="Chris" clickPath="/work" />
        <Card imagePathPortrait={watersmall} title="Photograph of the world" author="Chris" clickPath="/work" />
        <Card imagePathPortrait={catchIdeaSmall} title="Photograph of the world" author="Chris" clickPath="/work" />
      </section> */}
      {/* <section className={styles.pros}>
        <div className={styles.box}>
          <Image src={responsive} alt="" />
          <h2>100% Responsive</h2>
          <p>{`No matter which the device you're on, our site is fully responsive and work look 
            beautiful on any screen.`}
          </p>
        </div>
        <div className={styles.box}>
          <Image src={noLimit} alt="" />
          <h2>No Photo Upload Limit</h2>
          <p>Our tool has no limits on uploads or bandwidth. Freely upload in bulk and share all 
            of your work in one go.
          </p>
        </div>
        <div className={styles.box}>
          <Image src={embed} alt="" />
          <h2>Available href Embed</h2>
          <p>Embed Tweets, Facebook posts, Instagram media, Vimeo or Youtube videos, Googles Maps, 
            and more.
          </p>
        </div>
      </section> */}
    </>
  );
}
