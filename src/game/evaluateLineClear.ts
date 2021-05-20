import { createEmptyTile } from "./createEmptyTile";
import { Matrix, MatrixDimensions } from "./types";

export default function evaluateLineClear (dimensions: MatrixDimensions) {
    const rows = dimensions.height;
    const columns = dimensions.width;

    return (matrix: Matrix): Matrix => {


        for (let y = rows - 1; y >= 0; y--) {
            const isFull = matrix[y].every(tile => {
                return tile.occupied;
            });

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

        /* for (const [x, y] of toClear) {
            const tile = matrix[y][x];

            if (tile.occupied)
        } */

        return matrix;
    }
}
