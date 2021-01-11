import { GameOverview } from "@/models/game-overview";
import { Section } from "@/models/section";
import { fstat } from "fs";
import fs from "fs";
import { Queue } from 'queue-typescript';

export function creatGameOverviews(section: Section, path: string):GameOverview[] {
    const gameOverviews: GameOverview[] = [];

    //Get paths of game folders
    fs.readdir(path, { withFileTypes: true }, (err, files) => {
        console.log({err, files});
        files.forEach(file => {
            const gameOverview: GameOverview;
            const queue = new Queue<string>();

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

function exeSearch():boolean|string