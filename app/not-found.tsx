"use client"

import Link from 'next/link';
import Image from 'next/image';


import styles from "@/app/lib/styles/notFound.module.css";

const lost = "/404.png";

import { dictionary } from './utils/data';
import { useContext } from 'react';
import { LangContext } from './components/navContext';
 
export default function NotFound() {
    const {lang} = useContext(LangContext);

    return (
        <div className={styles.notFound}>
        <Image src={lost} width="300" height="300"  alt="wrong request" />
        <Link href="/">{dictionary.notFound[lang]}</Link>
        </div>
    );
}