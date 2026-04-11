import Cta from "./cta";

import styles from "../lib/styles/gradientSection.module.css";

import Image from "next/image";

// const arrow = "/arrow.svg";

export default function GradientSection({
    title, paragraph, imagePath, invite
} : {
    title: string, paragraph: string, imagePath: string, invite: boolean
}) {
  return (
    <section className={styles.one}>
        <div className={styles.left}>
          <div className={`${styles.horizontalGradient} ${styles.mob}`}></div>

          <div className={styles.text}> 
            <div className={`${styles.verticalGradient} ${styles.desk}`}></div> 
            <h1>{title}</h1>
            <p>{paragraph}</p>

            {invite ? <Cta /> : null}
          </div>

        </div>
        <div className={styles.right}>
          <Image fill alt="" src={imagePath} />
        </div>
    </section>
  );
}