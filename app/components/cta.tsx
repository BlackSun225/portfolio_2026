import Link from "next/link";
import Image from "next/image";

import arrow from "@/public/arrow.svg";

import styles from "../lib/styles/cta.module.css";

export default function Cta() {

    return (
        <Link className={styles.invite} href="mailto:yohananchris@outlook.com">
            <span>COLLABORONS</span>
            <Image alt="" src={arrow} />
        </Link>
    );
}