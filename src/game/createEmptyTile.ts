import { debug } from "./tetris"
import { Tile } from "./types"

export const createEmptyTile = (index: number, x: number, y: number, noNew = false): Tile => {

    if (Math.random() < .05 && !noNew && debug) {
        return {
            occupied: true,
            index,
            color: "pink",
            instance: undefined,
            x,
            y
        }
    }

    return {
        occupied: false,
        index,
        instance: undefined,
        x,
        y,
    }

}