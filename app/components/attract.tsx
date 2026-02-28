import arrow from "@/public/arrow.svg";

import styles from "../lib/styles/attract.module.css";
import Image from "next/image";
import Link from "next/link";

import Cta from "./cta";

export default function Attract({h1}: {h1?: string}) {
  
  return (
    <section className={styles.attract}>
      <div className={styles.cover}>
        <h1>{h1 ? h1 : "CONTACT ME FOR YOUR PROJECT"}</h1>
        <Cta />
      </div>
    </section>
  );
}