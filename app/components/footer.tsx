"use client"


import Link from "next/link";
import Image from "next/image";
import styles from "../lib/styles/footer.module.css";
import { RouteContext, LangContext} from "./navContext";
import { useContext} from "react";
import { dictionary } from "../utils/data";

import Cta from "./cta";

const twitter = "/twitter.svg";
const linkedIn = "/linkedin.png";
const tiktok = "/tiktok.png";

export default function Footer() {
  const {current} = useContext(RouteContext);
  const {lang} = useContext(LangContext);
  
  return (
    <footer className={styles.footer}>
      <div className={styles.left}>
        <Link className={styles.imgContainer} href="/">
            <Image className={styles.logo} fill loading="eager" alt="" src="/logo.svg"  /> 
        </Link>
        <div>
          <Link href="https://www.tiktok.com"><Image src={tiktok} width="22" height="20" alt="" /></Link> 
          <Link href="https://www.linkedin.com"><Image src={linkedIn} width="20" height="20"  alt="" /></Link>
          <Link href="https://www.x.com"><Image src={twitter} width="20" height="20" alt="" /></Link>      
        </div>
      </div>
      <div className={styles.right}>
        <ul>
            <li className={current == "work" ? styles.active : ''} >
              <Link href="/work">{dictionary.navbar.work[lang]}</Link>
            </li>
            <li className={current == "services"  ? styles.active : ''} >
              <Link href="/services">{dictionary.navbar.services[lang]}</Link>
            </li>
            <li className={current == "pricing"  ? styles.active : ''} >
              <Link href="/pricing">{dictionary.navbar.pricing[lang]}</Link>
            </li>
        </ul>
        <div className={styles.lastDivRight}>
          <Cta />
          <p>{dictionary.copyrighting[lang]}</p>
        </div>
      </div>
    </footer>
  );
}