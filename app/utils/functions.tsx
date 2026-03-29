import { Story, StoryInterface } from "./models";


export async function getStories(handleStories: (val: StoryInterface[]) => void) {
  fetch("http://localhost:2727/story/getAll")
  .then(res => res.json())
  .then(result => {
    console.log("work list: ", result);
    if(result.data.length > 0) {
      const finalResult = result.data.map((elem: never) => Story.createStory(elem));

      console.log("imagesList: ", finalResult);
      handleStories(finalResult);
      return finalResult;
    }else{
      handleStories([]);
      return [];
    }
  })
}