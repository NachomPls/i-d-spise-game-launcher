import { GameOverview } from "@/models/game-overview";
import { Section } from "@/models/section";
import { Game } from "@/models/game";
import { Dirent, fstat } from "fs";
import fs from "fs";
import { Queue } from 'queue-typescript';
import path from "path";


export class ExeSearcher {

    private queue: Queue<string> = new Queue<string>();

    public creatGameOverviews(section: Section, path: string): GameOverview[] {
        const gameOverviews: GameOverview[] = [];

        fs.readdir(path, { withFileTypes: true }, (err, files) => {
            files.forEach(file => this.queue.enqueue(path + "\\" + file.name));
            while (this.queue.length > 0) {
                const game = this.exeSearch(this.queue.dequeue());
                if (game !== null) {
                    const games: Game[] = [];
                    games.push(game);
                    gameOverviews.push({
                        path: path,
                        games: games,
                        parentSection: section
                    } as GameOverview);
                }
            }
        })
        console.log(gameOverviews);
        return gameOverviews;
    }

    exeSearch(gameDirectoryPath: string): Game {
        const files = fs.readdirSync(gameDirectoryPath, { withFileTypes: true });
        const exePathArray: string[] = files.filter((file) => path.extname(file.name).toLowerCase() === ".exe").map(x => x.name);
        if (exePathArray.length > 0) {
            return {
                name: gameDirectoryPath.replace(/^.*[\\]/, ''),
                imgPath: "Thumbnail",
                exePath: gameDirectoryPath + "\\" + exePathArray[0]
            } as Game
        }
        files.forEach(file => {
            if (file.isDirectory()) { this.queue.enqueue(gameDirectoryPath + "\\" + file.name) }
        });
        return null as any; //Cursed
    }
}