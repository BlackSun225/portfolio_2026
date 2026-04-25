"use client"

import { useContext } from "react";
import { LangContext } from "./navContext";
import { dictionary } from "../utils/data";
import styles from "../lib/styles/cardButtonText.module.css";

export default function CardButton() {
  const {lang} = useContext(LangContext);

  return (
    <span className={styles.span} >{dictionary.cardActionText[lang]}</span>
  );
}