import { debug } from "./tetris";
import { Matrix, MatrixDimensions, Tile } from "./types";

export default function evaluateGhost(dimensions: MatrixDimensions) {
    const rows = dimensions.height;

    return (matrix: Matrix): Matrix => {
        const tileCoordinates: [number, number][] = [];


        // Check where active block is,
        // this routine can be refactored into a util function
        for (let y = 0; y < rows; y++) {
            for (const [x, tile] of matrix[y].entries()) {
                if (tile.instance)
                    tileCoordinates.push([x, y]);
                else
                    if (debug)
                        if (tile.color !== "pink")
                            tile.color = void 0;
                tile.ghost = false;
            }
        }

        const available = [];
        // Evaluate where the ghost can lie, top to bottom
        ghostY: for (let ghostY = 0; ghostY < rows; ghostY++) {
            const possible = [];
            for (const [x, y] of tileCoordinates) {
                // Check if the entire map of blocks fits onto the ghost
                if (matrix[y + ghostY] && matrix[y + ghostY][x] && !matrix[y + ghostY][x].occupied)
                    possible.push([x, y + ghostY]);
                else
                    break ghostY;
            }
            if (possible.length === tileCoordinates.length) {
                available.push(possible);
            }
        }

        for (const [x, y] of available[available.length - 1]) {
            matrix[y][x].ghost = true;
        }

        return matrix;
    }
}