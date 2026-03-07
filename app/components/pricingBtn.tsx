import styles from "@/app/lib/styles/pricingBtn.module.css";


export default function PricingBtn({text}: {text: string}) {

    return (
        <div className={styles.pricingBtn}>
            <span className={styles.pricingBtnText} >{text}</span>
        </div>
    );
}