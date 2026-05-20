'use client'

import { useEffect, useContext} from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../lib/styles/navbar.module.css";
import { RouteContext, LangContext} from "./navContext";
import { usePathname} from "next/navigation";
import { dictionary } from "../utils/data";

import { LangPrefix } from "../utils/models";

// const germany = "/germany.png";
const france = "/france.png";
const usa = "/usa.png";

export default function Navbar() {

  const path = usePathname();

    
  const {current, setCurrent} = useContext(RouteContext);
  const {lang, setLang} = useContext(LangContext);

  function changeLang(a: string) {
    setLang(a as LangPrefix);
    localStorage.setItem("lang", a);
  }

  useEffect(() => {
    const storedLang = localStorage.getItem("lang");
    if(storedLang) {
      setLang(storedLang as LangPrefix);
    }
    console.log("path is : ", path);
    setCurrent(path.slice(1));
  }, [path]);

  return (
    <nav className={styles.nav}>
      <Link className={styles.logo} href="/">
        MAISON DOUDJO
      </Link>
      <ul className={styles.desk} >
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

      <label className={styles.langDropdown} >
        <input className={styles.dropTrigger} type="checkbox" />
        <div className={styles.head}>
          <span className={styles.headText} > {lang.toUpperCase()} </span>
          <Image className={styles.headImg} width="20" height="19" src={lang == "fr" ? france : usa } alt="language flag" />
          <span className={styles.arrow}></span>
        </div>

        <ul className={styles.body} >
          <li className={`${styles.row} ${lang == 'fr' && styles.active}`} onClick={() => changeLang("fr")} >
            <span>FR</span>
            <Image width="20" height="19" src={france} alt="france" />
          </li>
          <li className={`${styles.row} ${lang == 'en' && styles.active}`} onClick={() => changeLang("en")} >
            <span>EN</span>
            <Image width="20" height="19" src={usa} alt="usa" />
          </li>
        </ul>
      </label>

      <Link className={`${styles.desk} ${styles.btn}`} href="/mail">{dictionary.actionButton[lang]}</Link>

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
          <li className={current == "work" ? styles.active : ''} >
            <Link href="/work">{dictionary.navbar.work[lang]}</Link>
          </li>
          <li className={current == "services" ? styles.active : ''} >
            <Link href="/services">{dictionary.navbar.services[lang]}</Link>
          </li>
          <li className={current == "pricing" ? styles.active : ''} >
            <Link href="/pricing">{dictionary.navbar.pricing[lang]}</Link>
          </li>
        </ul>
      </section>
    </nav>
  );
}