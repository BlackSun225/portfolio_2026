import arrow from "@/public/arrow.svg";

import styles from "../lib/styles/attract.module.css";
import Image from "next/image";
import Link from "next/link";

import Cta from "./cta";

export default function Attract() {
  
  return (
    <section className={styles.attract}>
      <div className={styles.cover}>
        <h1>CONTACT ME FOR YOUR PROJECT</h1>
        <Cta />
        {/* <div className={styles.invite} >
          <Link href="mailto:yohananchris@outlook.com">
            <span>GET AN INVITE</span>
            <Image alt="" src={arrow} />
          </Link>
        </div> */}
      </div>
    </section>
  );
}