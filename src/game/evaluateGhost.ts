import { debug } from "./tetris";
import { Matrix, MatrixDimensions, Tile } from "./types";

export default function evaluateGhost (dimensions: MatrixDimensions) {
    const rows = dimensions.height;
    const columns = dimensions.width;

    return (matrix: Matrix): Matrix => {
        const tileCoordinates: [number, number, Tile][] = [];


        /* render grid */
        y: for (let y = 0; y < rows; y++) {
            for (const [x, tile] of matrix[y].entries()) {
                if (tile.instance) {
                    tileCoordinates.push([x, y, tile]);
                } else {
                    if (tile.color !== "pink" && debug)
                        tile.color = void 0;
                }
                tile.ghost = false;
            }
        }

        const available = [];
        ghostY: for (let ghostY = 0; ghostY < rows; ghostY++) {
            const possible = [];
            for (const [x, y, tile] of tileCoordinates) {
                if (matrix[y + ghostY] && matrix[y + ghostY][x] && !matrix[y + ghostY][x].occupied) {
                    possible.push([x, y + ghostY]);
                } else {
                    break ghostY;
                }
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