"use client"
import { useEffect, useContext, useState } from "react";
import { RouteContext} from "../components/navContext";
import { type StoryInterface } from "../utils/models";

import { getStories } from "../utils/functions";

import Card from "../components/card";
import styles from "../lib/styles/stories.module.css";

export default function Stories() {
    const [storyList, setStoryList] = useState<StoryInterface[] | []>([]);

    function handleStoryList(val: StoryInterface[]) {
        setStoryList(val);
    }

    useEffect(() => {
        // if(current != "stories") {
        //     console.log("defining current ...");
        //     setCurrent("stories");
        //     keepRoutePath("stories");
        // }
        getStories(handleStoryList);   
    }, [])

    return (
        <main>
            <div className={styles.gallery}>
            {
              storyList.map(elem => {
                return <Card
                  clickPath=""
                  key={elem.ID}
                  keyId={elem.ID}
                //   parentRef={activeCardKey}
                //   handleClick={changeScreen}
                  title={elem.TITLE}
                  imagePathPortrait={elem.portrait}
                //   imagePathLandscape={elem.landscape}
                />;
              })
            }
          </div>
        </main>
    );
}