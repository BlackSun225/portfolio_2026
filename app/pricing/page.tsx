"use client"
import { useState } from "react";
import { RouteContext } from "../components/navContext";

import craftmanship from "@/public/craftmanship.jpg";
import happy from "@/public/happy.jpg"

import GradientSection from "../components/gradientSection";
import Attract from "../components/attract";

import styles from "../lib/styles/pricing.module.css";

export default function Pricing() {

    const sectionParagraph = `Create your stories, Photosnap is a platform 
    for photographers and visual storytellers. It's the simple way to create 
    and share your photos.`;

    return (
        <>
            <GradientSection title="PRICING" paragraph={sectionParagraph} imagePath={happy} invite={false} />
            <section className={styles.pricing}></section>
            <Attract />
        </> 
    );
}