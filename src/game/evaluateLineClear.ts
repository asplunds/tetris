import { createEmptyTile } from "./createEmptyTile";
import { Matrix, MatrixDimensions } from "./types";

/**
 * Very expensive line clear algorithm, feel free to optimize :)
 * @param dimensions 
 * @returns 
 */
export default function evaluateLineClear (dimensions: MatrixDimensions) {
    const rows = dimensions.height;

    return (matrix: Matrix): Matrix => {

        // checks for line clears, bottom to top
        for (let y = rows - 1; y >= 0; y--) {
            // Checks whether every tile on row y is occupied
            const isFull = matrix[y].every(tile => {
                return tile.occupied;
            });

            // if it's full we have to shift down every tile above it
            if (isFull) {
                const toClear = [];

                for (const [x, { index }] of matrix[y].entries()) {
                    matrix[y][x] = createEmptyTile(index, x, y, true);
                }
                for (let shiftY = y; shiftY >= 0; shiftY--) {

                    for (const [x, tile] of matrix[shiftY].entries()) {
                        if (tile.occupied) {
                            toClear.push([x, shiftY, tile]);
                        }
                    }
                }
                for (const [x, y, { index }] of toClear) {
                    matrix[y][x] = createEmptyTile(index, x, y, true);
                }
                for (const [x, y, tile] of toClear) {
                    matrix[y + 1][x] = {
                        ...tile,
                        y: y + 1,
                        index: matrix[y + 1][x].index
                    }
                }
                y++;
            }
        }

        return matrix;
    }
}
