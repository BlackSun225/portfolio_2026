import styles from "@/app/lib/styles/warning.module.css";


export default function Warning({data}: {data: string}) {


    return (
        <div className={styles.warning}>
            <p>{data}</p>
        </div>
    );
}