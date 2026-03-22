import loading from "@/public/progress.gif"
import Image from "next/image";

import styles from "../lib/styles/loading.module.css";

export default function StoriesLoading() {

    return(
        <div className={styles.loading}>
            <Image src={loading} width="300" alt="loading data" />
        </div>
    );
}