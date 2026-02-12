'use client'

import { useEffect, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../lib/styles/navbar.module.css";
import { RouteContext, keepRoutePath } from "./navContext";
import { usePathname, useRouter } from "next/navigation";

// eslint-disable-next-line react/prop-types
export default function Navbar() {

  const path = usePathname();
  const {current, setCurrent} = useContext(RouteContext);


  useEffect(() => {
    console.log("routepath : ", path);
    console.log(" current value is : ", current);
    
  }, [current])

  return (
    <nav className={styles.nav}>
      <Link className={styles.imgContainer} href="/">
        <Image fill loading="eager" alt="" src="/logo.svg" onClick={() => {
          setCurrent("");
          keepRoutePath("");
          }} /> 
      </Link>
      <ul className={styles.desk} >
        <li className={current == "stories" ? styles.active : ''} onClick={() => {
          setCurrent("stories");
          keepRoutePath("stories");
          }}>
          <Link href="/stories">STORIES</Link>
        </li>
        <li className={current == "features"  ? styles.active : ''} onClick={() => {
          setCurrent("features");
          keepRoutePath("features");
          }}>
          <Link href="/features">FEATURES</Link>
        </li>
        <li className={current == "pricing"  ? styles.active : ''} onClick={() => {
          setCurrent("pricing");
          keepRoutePath("pricing");
          }
        }>
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
          <li className={current == "stories" ? styles.active : ''} onClick={() => {
            setCurrent("stories");
            keepRoutePath("stories");
            }
          }>
            <Link href="/stories">STORIES</Link>
          </li>
          <li className={current == "features" ? styles.active : ''} onClick={() => {
            setCurrent("features");
            keepRoutePath("features");
            }
          }>
            <Link href="/features">FEATURES</Link>
          </li>
          <li className={current == "pricing" ? styles.active : ''} onClick={() => {
            setCurrent("pricing");
            keepRoutePath("pricing");
            }
          }>
            <Link href="/pricing">PRICING</Link>
          </li>
        </ul>
      </section>
    </nav>
  );
}