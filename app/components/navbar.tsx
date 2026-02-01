'use client'

import { useEffect, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../lib/styles/navbar.module.css";
import { RouteContext } from "./navContext";

// eslint-disable-next-line react/prop-types
export default function Navbar() {

  const {current, setCurrent} = useContext(RouteContext);

  useEffect(() => {
    console.log(" current value is : ", current);
  }, [current])

  return (
    <nav className={styles.nav}>
      <Link href="/">
        <Image id="logo" loading="eager" alt="" src="/logo.svg" width={150} height={15} onClick={() => setCurrent("")} /> 
      </Link>
      <ul className={styles.desk} >
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
      <button className={styles.desk} ><Link href="mailto:yohananchris@outlook.com">GET AN INVITE</Link></button>

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
          <li className={current == "stories" ? styles.active : ''} onClick={() => setCurrent("stories")}>
            <Link href="/stories">STORIES</Link>
          </li>
          <li className={current == "features" ? styles.active : ''} onClick={() => setCurrent("features")}>
            <Link href="/features">FEATURES</Link>
          </li>
          <li className={current == "pricing" ? styles.active : ''} onClick={() => setCurrent("pricing")}>
            <Link href="/pricing">PRICING</Link>
          </li>
        </ul>
      </section>
    </nav>
  );
}