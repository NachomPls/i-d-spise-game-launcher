import { GameOverview } from "@/models/game-overview";
import { Section } from "@/models/section";
import { fstat } from "fs";
import fs from "fs";
import { Queue } from 'queue-typescript';
import  path  from "path";


export class ExeSearcher {

    private queue: Queue<string> = new Queue<string>();

    public creatGameOverviews(section: Section, path: string):GameOverview[] {
        const gameOverviews: GameOverview[] = [];
    
        //Get paths of game folders
        fs.readdir(path, { withFileTypes: true }, (err, files) => {
            console.log({err, files});
            files.forEach(file => this.queue.enqueue(path+"\\"+file.name));
            while(this.queue.length > 0) {
                const exePath:string = this.exeSearch(this.queue.dequeue());
                if(exePath !== "") {
                    //Exe found
                    console.log("Found exe! -> "+exePath);
                } 
            }
                //this.queue.dequeue()
                //this.queue.enqueue()
                //Search folder for exe, on fail next folder in queue
                //Recursion!
                //const game1 = {
                //     name: "Legend of Korra",
                //     imgPath: "something",
                //     exePath: p + "\\something",
                //   }
    
                //Look at all files, find exe, find folders
    
    
    
                gameOverviews.push();
            
        })
        return gameOverviews;
    }

    exeSearch(gameDirectoryPath: string):string {
        console.log("In exeSearch");
        fs.readdir(gameDirectoryPath, { withFileTypes: true }, (err, files) => {
            const exePathArray:string[] = files.filter((file) => path.extname(file.name).toLowerCase() === "exe").map(x=>x.name);
            if(exePathArray.length > 0) {
                return exePathArray[0];
            }
        });
        return "";
    }
}