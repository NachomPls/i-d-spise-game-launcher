import { Game } from "./game"
import { Section } from "./section";

export interface GameOverview {
    path: string,
    games: Game[],
    parentSection: Section
}