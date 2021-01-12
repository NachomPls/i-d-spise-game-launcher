import { GameOverview } from "@/models/game-overview";
import { Section } from "@/models/section";
import { fstat } from "fs";
import fs from "fs";
import { Queue } from 'queue-typescript';


export class ExeSearcher {

    private queue: Queue<string>;

    public ExeSearcher() {
        this.queue = new Queue<string>();
    }

    creatGameOverviews(section: Section, path: string):GameOverview[] {
        const gameOverviews: GameOverview[] = [];
    
        //Get paths of game folders
        fs.readdir(path, { withFileTypes: true }, (err, files) => {
            console.log({err, files});
            files.forEach(file => {
    
                //queue.dequeue()
                //queue.enqueue()
                //Search folder for exe, on sucess next folder
                //Recursion!
    
                //Look at all files, find exe, find folders
    
    
    
                gameOverviews.push(gameOverview);
            })
        })
        return gameOverviews;
    }

    exeSearch():boolean|string
}