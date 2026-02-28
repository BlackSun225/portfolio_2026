export class Story {
    ID: string;
    TITLE: string;
    AUTHOR: string;
    STORY: string;
    portrait?: string;
    landscape?: string;

    constructor(ID: string, TITLE: string, AUTHOR: string, STORY: string, portrait: string, landscape: string) {
        this.ID = ID;
        this.TITLE = TITLE;
        this.AUTHOR = AUTHOR;
        this.STORY = STORY;
        this.portrait = portrait;
        this.landscape = landscape;
    }

    static createStory(data: {ID: string, TITLE: string, AUTHOR: string, STORY: string, Images: {PATH: string}[]}) {
        let portrait;
        let landscape;
        
        for (const img of data.Images) {
          if(/portrait/.test(img.PATH)) {
            portrait = img.PATH;
          }else{
            landscape = img.PATH;
          }
        }

        return new Story (
          data.ID,
          data.TITLE,
          data.AUTHOR,
          data.STORY,
          portrait!,
          landscape!
        );
    }
} 

export interface StoryInterface {
  ID: string, 
  TITLE: string, 
  AUTHOR: string, 
  STORY: string, 
  portrait: string, 
  landscape: string
}

export enum LangPrefix {
  fr = "fr",
  en = "en",
  // de = "de"
}