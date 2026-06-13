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
const whatsapp = "/whatsapp.png";

export default function Footer() {
  const {current} = useContext(RouteContext);
  const {lang} = useContext(LangContext);
  
  return (
    <footer className={styles.footer}>
      <div className={styles.left}>
        <Link className={styles.logo} href="/">MAISON DOUDJO</Link>
        <div>
          <Link href="https://wa.me/message/KMBVHC4ZZUPSE1?text=Hello%2C%20I%20found%20your%20portfolio%20and%20I%27m%20interested%20in%20discussing%20a%20potential%20opportunity." target="_blank" >
            <Image src={whatsapp} width="22" height="20" alt="" />
          </Link> 
          <Link href="https://www.linkedin.com/in/yoanan-christ-fousseni-3125711bb"><Image src={linkedIn} width="20" height="20"  alt="" /></Link>
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
          <h6>{dictionary.copyrighting[lang]}</h6>
        </div>
      </div>
    </footer>
  );
}