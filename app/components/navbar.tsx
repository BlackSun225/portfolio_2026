'use client'

import { useEffect, useContext, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../lib/styles/navbar.module.css";
import { RouteContext} from "./navContext";
import { usePathname, useRouter } from "next/navigation";

// eslint-disable-next-line react/prop-types
export default function Navbar() {

  const path = usePathname();
  const {current, setCurrent} = useContext(RouteContext);

  useEffect(() => {
    console.log("path is : ", path);
    setCurrent(path.slice(1));
  }, [path]);

  return (
    <nav className={styles.nav}>
      <Link className={styles.imgContainer} href="/">
        <Image fill loading="eager" alt="" src="/logo.svg" /> 
      </Link>
      <ul className={styles.desk} >
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
      <Link className={`${styles.desk} ${styles.btn}`} href="mailto:yohananchris@outlook.com">COLLABORONS</Link>

      <span className={styles.refSpan} ></span>

      <label className={`${styles.mob} ${styles.hamburger}`}>
        <input className={styles.fakeInput} type="checkbox" />
        <div></div>
        <div></div>
        <div></div>
      </label>

      <section className={styles.mobMenu}>
        <div>
        </div>
        <ul >
          <li className={current == "stories" ? styles.active : ''} >
            <Link href="/stories">STORIES</Link>
          </li>
          <li className={current == "features" ? styles.active : ''} >
            <Link href="/features">FEATURES</Link>
          </li>
          <li className={current == "pricing" ? styles.active : ''} >
            <Link href="/pricing">PRICING</Link>
          </li>
        </ul>
      </section>
    </nav>
  );
}