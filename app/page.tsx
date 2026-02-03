import journey from "../public/journey.jpg";
import arrow from "../public/arrow.svg";
import discover from "../public/discover.jpg";
import hardworker from "../public/hard_worker.jpg";
import photograph from "../public/photograph.jpg";
import capturesmall from "../public/capture.jpg";
import watersmall from "../public/water.jpg";
import catchIdeaSmall from "../public/catch_idea.jpg";

import responsive from "../public/responsive.svg";
import noLimit from "../public/no-limit.svg";
import embed from "../public/embed.svg";
import Image from "next/image";
import styles from "@/app/lib/styles/home.module.css";
import Link from "next/link";
import GradientSection from "./components/gradientSection";
import Card from "./components/card";


export default function Home() {
  const sectionOneTitle = "CREATE AND SHARE YOUR PHOTO STORIES";
  const sectionOneParagraph = `Photosnap is a platform for photographers and visual storytellers. 
  We make it easy to share photos, tell stories and connect with others.`

  return (
    <>
      <GradientSection title={sectionOneTitle} paragraph={sectionOneParagraph} imagePath={journey} invite={true} />
      <section className={styles.two}>
        <div className={styles.left}>
          <Image src={discover} alt="" />
        </div>
        <div className={styles.right}>
          <h1>BEAUTIFUL STORIES EVERY TIME</h1>
          <p>We provide design templates href ensure your stories look terrific. Easily add photos, 
            text, embed maps and media from other networks. Then share your story with everyone.
          </p>
          <Link href="/stories" className={styles.invite} >
            <span>VIEW THE STORIES</span>
            <Image alt="" src={arrow} />
          </Link>
        </div>
      </section>
      <section className={styles.three}>
        <div className={styles.left}>
          <h1>DESIGNED FOR EVERYONE</h1>
          <p>Photosnap can help you create stories that resonate with your audience. Our tool is 
            designed for photographers of all levels, brands, business you name it.
          </p>
          <Link href="/stories" className={styles.invite}>
            <span>VIEW THE STORIES</span>
            <Image alt="" src={arrow} />
          </Link>
        </div>
        <div className={styles.right}>
          <Image alt="" src={hardworker} />
        </div>
      </section>
      <section className={styles.discover}>
        <Card imagePathPortrait={photograph} title="Photograph of the world" author="Chris" clickPath="/stories" />
        <Card imagePathPortrait={capturesmall} title="Photograph of the world" author="Chris" clickPath="/stories" />
        <Card imagePathPortrait={watersmall} title="Photograph of the world" author="Chris" clickPath="/stories" />
        <Card imagePathPortrait={catchIdeaSmall} title="Photograph of the world" author="Chris" clickPath="/stories" />
      </section>
      <section className={styles.pros}>
        <div className={styles.box}>
          <Image src={responsive} alt="" />
          <h2>100% Responsive</h2>
          <p>{`No matter which the device you're on, our site is fully responsive and stories look 
            beautiful on any screen.`}
          </p>
        </div>
        <div className={styles.box}>
          <Image src={noLimit} alt="" />
          <h2>No Photo Upload Limit</h2>
          <p>Our tool has no limits on uploads or bandwidth. Freely upload in bulk and share all 
            of your stories in one go.
          </p>
        </div>
        <div className={styles.box}>
          <Image src={embed} alt="" />
          <h2>Available href Embed</h2>
          <p>Embed Tweets, Facebook posts, Instagram media, Vimeo or Youtube videos, Googles Maps, 
            and more.
          </p>
        </div>
      </section>
    </>
  );
}
