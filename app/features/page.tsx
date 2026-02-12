"use client"

import responsive from "@/public/responsive.svg";
import noLimit from "@/public/no-limit.svg";
import embed from "@/public/embed.svg";
import customDomain from "@/public/custom-domain.svg";
import exposure from "@/public/boost-exposure.svg";
import drag from "@/public/drag-drop.svg";
import discover from "@/public/discover.jpg";

import { useEffect, useContext } from "react";

import GradientSection from "../components/gradientSection";
import styles from "@/app/lib/styles/features.module.css";
import Image from "next/image";
import { RouteContext, keepRoutePath } from "../components/navContext";
import Attract from "../components/attract";

const sectionTitle = "FEATURES";
const sectionParagraph = `We make sure all of our features are designed to be loved by every 
aspiring and even professional photograpers who wanted to share their stories.`;

export default function Features() {

    const {current, setCurrent} = useContext(RouteContext);

    useEffect(() => {
        // if(current != "features") {
        //     setCurrent("features");
        //     keepRoutePath("features");
        // }   
    });

    return (
        <div className={styles.features}>
            <GradientSection title={sectionTitle} paragraph={sectionParagraph} imagePath={discover} invite={false} />
            <section className={styles.pros}>
                <div className={styles.box}>
                <Image className={styles.img} src={responsive} alt="" />
                <h2>100% Responsive</h2>
                <p>{`No matter which the device you're on, our site is fully responsive and stories look 
                    beautiful on any screen.`}</p>
                </div>
                <div className={styles.box}>
                <Image className={styles.img} src={noLimit} alt="" />
                <h2>No Photo Upload Limit</h2>
                <p>Our tool has no limits on uploads or bandwidth. Freely upload in bulk and share all 
                    of your stories in one go.
                </p>
                </div>
                <div className={styles.box}>
                <Image className={styles.img} src={embed} alt="" />
                <h2>Available to Embed</h2>
                <p>Embed Tweets, Facebook posts, Instagram media, Vimeo or Youtube videos, Googles Maps, 
                    and more.
                </p>
                </div>
                <div className={styles.box}>
                <Image className={styles.img} src={customDomain} alt="" />
                <h2>Custom Domain</h2>
                <p>
                    With Photosnap subscriptions you can host your stories on your domain. You can 
                    also remove our branding!
                </p>
                </div>
                <div className={styles.box}>
                <Image className={styles.img} src={exposure} alt="" />
                <h2>Boost Your Exposure</h2>
                <p>
                    Users that viewed your story or gallery can easily get notified of new and 
                    features stories with our built in mailing list.
                </p>
                </div>
                <div className={styles.box}>
                <Image className={styles.img} src={drag} alt="" />
                <h2>Drag & Drop Image</h2>
                <p>
                    Easily drag and drop your images and get beautiful shots everytime. No over the 
                    top tooling to add friction to creating stories.
                </p>
                </div>
            </section>
            <Attract />
        </div>
    );
}