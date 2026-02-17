"use client"

// import arrow from "@/public/arrow.svg";
import twitter from "@/public/twitter.svg";
import instagram from "@/public/instagram.svg";
import linkedIn from "@/public/linkedin.png";
import tiktok from "@/public/tiktok.png";
// import pinterest from "@/public/pinterest.svg";
import Link from "next/link";
import Image from "next/image";
import styles from "../lib/styles/footer.module.css";
import { RouteContext} from "./navContext";
import { useContext} from "react";

import Cta from "./cta";
import { link } from "fs";

export default function Footer() {
  const {current} = useContext(RouteContext);
  
  return (
    <footer className={styles.footer}>
      <div className={styles.left}>
        <Link className={styles.imgContainer} href="/">
            <Image className={styles.logo} fill loading="eager" alt="" src="/logo.svg"  /> 
        </Link>
        <div>
          {/* <Link href="https://www.pinterest.com"><Image src={pinterest} alt="" /></Link> */}
          <Link href="https://www.tiktok.com"><Image src={tiktok} width="22" alt="" /></Link> 
          <Link href="https://www.linkedin.com"><Image src={linkedIn} width="20" alt="" /></Link>
          <Link href="https://www.x.com"><Image src={twitter} alt="" /></Link>      
        </div>
      </div>
      <div className={styles.right}>
        <ul>
            <li className={current == "stories" ? styles.active : ''} >
              <Link href="/stories">STORIES</Link>
            </li>
            <li className={current == "features"  ? styles.active : ''} >
              <Link href="/features">FEATURES</Link>
            </li>
            <li className={current == "pricing"  ? styles.active : ''} >
              <Link href="/pricing">PRICING</Link>
            </li>
        </ul>
        <div className={styles.lastDivRight}>
          <Cta />
          <p>Copyright {new Date().getFullYear()}. All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
}