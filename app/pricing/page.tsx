"use client"
import { useState } from "react";
import { RouteContext } from "../components/navContext";

import photo from "@/public/photo.jpg";
import check from "@/public/check.svg";


import GradientSection from "../components/gradientSection";
import Attract from "../components/attract";

import styles from "../lib/styles/pricing.module.css";

export default function Pricing() {

    const sectionParagraph = `Create your stories, Photosnap is a platform 
    for photographers and visual storytellers. It's the simple way to create 
    and share your photos.`;

    return (
        <>
            <GradientSection title="PRICING" paragraph={sectionParagraph} imagePath={photo} invite={false} />
            <section className={styles.pricing}></section>
            <Attract />
        </> 
    );
}