import Link from "next/link";

import styles from "@/app/lib/styles/borderButton.module.css"

export default function BorderButton({text, to} : {text: string, to: string}) {

    return (
        <Link className={styles.btn} href={to}>{text}</Link>
    );

}