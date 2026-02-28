"use client"
import { useState } from "react";
import { RouteContext } from "../components/navContext";

import craftmanship from "@/public/craftmanship.jpg";
import happy from "@/public/happy.jpg"

import { useEffect, useContext } from "react";
import { LangContext } from "../components/navContext";
import { dictionary } from "../utils/data";
import GradientSection from "../components/gradientSection";
import Attract from "../components/attract";

import styles from "../lib/styles/pricing.module.css";

export default function Pricing() {

    const {lang} = useContext(LangContext);

    return (
        <>
            <GradientSection 
                title={dictionary.pricing.gradient.h1[lang]} 
                paragraph={dictionary.pricing.gradient.p[lang]} 
                imagePath={happy} 
                invite={false} 
            />
            <section className={styles.pricing}></section>
            <Attract h1={dictionary.attract.h1[lang]} />
        </> 
    );
}