"use client"
import { useEffect, useContext, useState } from "react";
import { RouteContext} from "../components/navContext";
import { type StoryInterface } from "../utils/models";

import { getStories } from "../utils/functions";

import Card from "../components/card";
import styles from "../lib/styles/stories.module.css";

export default function Stories() {

    useEffect(() => {
  
    }, [])

    return (
        <main>
          <div className={styles.gallery}>
            
          </div>
        </main>
    );
}