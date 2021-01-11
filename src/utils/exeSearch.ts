import { GameOverview } from "@/models/game-overview";
import { Section } from "@/models/section";
import { fstat } from "fs";
import fs from "fs";

export function exeSearch(section: Section, path: string):GameOverview[] {
    const gamesOverviews: GameOverview[] = [];

    //Get paths of game folders
    fs.readdir(path, { withFileTypes: true }, (err, files) => {
        console.log({err, files});
        //files.forEach(file
    })
    //Search folder for exe, on sucess next folder


    return gamesOverviews;
}