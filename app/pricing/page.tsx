"use client"
import happy from "@/public/happy.jpg"

import { useEffect, useContext } from "react";
import { LangContext } from "../components/navContext";
import { dictionary } from "../utils/data";
import GradientSection from "../components/gradientSection";
import Attract from "../components/attract";
import Warning from "../components/warning";
import PricingBtn from "../components/pricingBtn";

import styles from "../lib/styles/pricing.module.css";

export default function Pricing() {

    const {lang} = useContext(LangContext);
    const frontendContent = dictionary.pricing.frontend;

    return (
        <>
            <GradientSection 
                title={dictionary.pricing.gradient.h1[lang]} 
                paragraph={dictionary.pricing.gradient.p[lang]} 
                imagePath={happy} 
                invite={false} 
            />
            <section className={styles.pricing}>
                <Warning data={dictionary.pricing.warningAssets[lang]} />
                <Warning data={dictionary.pricing.warningUI[lang]} />

                <div className={styles.btnList}>
                    {
                        Object.keys(dictionary.pricing.frontend).map((key , i) => {
                            const typedKey = key as keyof typeof frontendContent; // Narrow key to 'landing_page' | 'multipage' | etc.
                            const content = frontendContent[typedKey];
                            
                            return <PricingBtn key={i}  text={content[lang].name} />;
                        })
                    }
                </div>
                
            </section>
            <Attract h1={dictionary.attract.h1[lang]} />
        </> 
    );
}