"use client"
import Image from "next/image"
import styles from "../lib/styles/loading.module.css";

const error = "/error.gif"

export default function ProjectError() {
    return (
        <div className={styles.loading}>
            <Image src={error} width="300" height="300" alt="wrong request" />
            <strong>{"error fetching data"}</strong>
        </div>
    )
}