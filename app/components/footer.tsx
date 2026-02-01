"use client"

import arrow from "@/public/arrow.svg";
import twitter from "@/public/twitter.svg";
import instagram from "@/public/instagram.svg";
import youtube from "@/public/youtube.svg";
import pinterest from "@/public/pinterest.svg";
import Link from "next/link";
import Image from "next/image";
import styles from "../lib/styles/footer.module.css";
import { RouteContext } from "./navContext";
import { useContext } from "react";

export default function Footer() {
  const {current, setCurrent} = useContext(RouteContext);
  
  return (
    <footer className={styles.footer}>
      <div className={styles.left}>
        <Link href="/">
            <Image className={styles.logo} loading="eager" alt="" src="/logo.svg" width={150} height={15} /> 
        </Link>
        <div>
          <Link href="https://www.pinterest.com"><Image src={pinterest} alt="" /></Link>
          <Link href="https://www.x.com"><Image src={twitter} alt="" /></Link>
          <Link href="https://www.youtube.com"><Image src={youtube} alt="" /></Link>
          <Link href="https://www.instagram.com"><Image src={instagram} alt="" /></Link>        
        </div>
      </div>
      <div className={styles.right}>
        <ul>
            <li className={current == "" ? styles.active : ''} onClick={() => setCurrent("")}>
                <Link href="/">HOME</Link>
            </li>
            <li className={current == "stories" ? styles.active : ''} onClick={() => setCurrent("stories")}>
                <Link href="/stories">STORIES</Link>
            </li>
            <li className={current == "features"  ? styles.active : ''} onClick={() => setCurrent("features")}>
                <Link href="/features">FEATURES</Link>
            </li>
            <li className={current == "pricing"  ? styles.active : ''} onClick={() => setCurrent("pricing")}>
                <Link href="/pricing">PRICING</Link>
            </li>
        </ul>
        <div>
          <div className={styles.invite}>
            <Link href="mailto:yohananchris@outlook.com">
                <span>GET AN INVITE</span>
                <Image alt="" src={arrow} />
            </Link>
          </div>
          <p>Copyright {new Date().getFullYear()}. All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
}