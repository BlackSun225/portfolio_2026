import Image from "next/image";

const loading = "/progress.gif"

import styles from "../lib/styles/loading.module.css";

export default function StoriesLoading() {

    return(
        <div className={styles.loading}>
            <Image src={loading} width="300" height="300" alt="loading data" />
        </div>
    );
}