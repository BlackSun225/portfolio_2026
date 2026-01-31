'use client'

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./navbar.module.css";

// eslint-disable-next-line react/prop-types
export default function Navbar() {

  const [current, setCurrent] = useState<string | undefined>(undefined);

  return (
    <nav className={styles.nav}>
      <Link href="/">
        <Image className={styles.logo} alt="" src="/logo.svg" width={150} height={15} /> 
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
      <button className={styles.desk} ><a href="mailto:yohananchris@outlook.com">GET AN INVITE</a></button>
      {/*<span ></span>
      <label id="hamburger" className={styles.mob} htmlFor="fakeInput">
        <input id="fakeInput" type="checkbox" />
        <div></div>
        <div></div>
        <div></div>
      </label>
       <section>
        <label htmlFor="fakeBack">
          <input id="fakeBack" type="checkbox" />
        </label>
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
      </section> */}
    </nav>
  );
}