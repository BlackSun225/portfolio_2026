import Link from "next/link";
import Image from "next/image";

import arrow from "@/public/arrow.svg";

import styles from "../lib/styles/cta.module.css";
import { LangContext } from "./navContext";
import { dictionary } from "../utils/data";
import { useContext } from "react";

export default function Cta() {
    const {lang} = useContext(LangContext);

    return (
        <Link className={styles.invite} href="mailto:yohananchris@outlook.com">
            <span>{dictionary.actionButton[lang]}</span>
            <Image alt="" src={arrow} />
        </Link>
    );
}