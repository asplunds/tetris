import appendTileToMatrix from "./appendTileToMatrix";
import { Block } from "./blocks";
import { createEmptyTile } from "./createEmptyTile";
import evaluateGhost from "./evaluateGhost";
import { Matrix, MatrixDimensions, Tile } from "./types";

export default function shiftActive (dimensions: MatrixDimensions, getBlock: () => typeof Block) {
    const rows = dimensions.height;
    const columns = dimensions.width;
    const renderGhost = evaluateGhost(dimensions);
    const append = appendTileToMatrix(dimensions);

    return (matrix: Matrix, offsetX: number, offsetY: number): Matrix => {
        const tileCoordinates: [number, number, Tile][] = [];
        const search = matrix.flat().find(v => v.instance);
        const instance = search && search.instance;

        /* check for still block */
        if (instance && (instance.flashing && instance.rotations > 4 * 3 || instance.stillFrameCount > 250)) {

            for (let y = 0; y < rows; y++) {
                for (const [x, tile] of matrix[y].entries()) {
                    if (tile.instance) {
                        matrix[y][x] = {
                            ...tile,
                            instance: void 0,
                            color: instance.color,
                            occupied: true
                        }
                    }
                }
            }

            return append(matrix, new (getBlock()));
        }

        /* traverse grid */
        y: for (let reverseY = rows - 1; reverseY >= 0; reverseY--) {
            const y = rows - 1 - reverseY;
            for (const [x, tile] of matrix[y].entries()) {

                if (tile.instance && matrix[y + offsetY] && matrix[y + offsetY][x + offsetX]) {
                    const below = matrix[y + offsetY][x + offsetX];
                    if (below && !below.occupied) {
                        tileCoordinates.push([x, y, tile]);

                        // we can break to improve performance
                        if (tileCoordinates.length === tile.instance.tileMap.flat().filter(v => v).length) {
                            break y;
                        }
                    } else {
                        if (offsetY === 1) {
                            instance.flashing = true;
                        }
                        return matrix;
                    }
                } else if (tile.instance && !(matrix[y + offsetY] && matrix[y + offsetY][x + offsetX])) {
                    if (offsetY === 1) {
                        instance.flashing = true;
                    }
                    return matrix;
                }
            }
        }

        instance.flashing = false;
        instance.stillFrameCount = 0;

        for (const [x, y, tile] of tileCoordinates) {
            matrix[y][x] = createEmptyTile(tile.index, x, y, true);
        }
        for (const [x, y, tile] of tileCoordinates) {
            matrix[y + offsetY][x + offsetX] = {
                ...tile,
                index: matrix[y + offsetY][x + offsetX].index
            };
        }

        return renderGhost(matrix);
    }
}