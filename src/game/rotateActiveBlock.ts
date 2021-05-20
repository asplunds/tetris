import { Block } from "./blocks";
import { createEmptyTile } from "./createEmptyTile";
import evaluateGhost from "./evaluateGhost";
import { debug } from "./tetris";
import { MatrixDimensions, Matrix, Tile } from "./types";
import { chainSaw } from "./utils";

export const rotateActive = (dimensions: MatrixDimensions) => {
    const rows = dimensions.height;
    const columns = dimensions.width;
    const renderGhost = evaluateGhost(dimensions);

    return (matrix: Matrix): Matrix => {
        const tileCoordinates: [number, number, Tile][] = [];
        let instance: Block;

        /* render grid */
        y: for (let y = 0; y < rows; y++) {
            for (const [x, tile] of matrix[y].entries()) {
                if (tile.instance) {
                    if (!instance)
                        instance = tile.instance;
                    tileCoordinates.push([x, y, tile]);
                    if (tileCoordinates.length === tile.instance.tileMap.flat().filter(v => v).length) {
                        break y;
                    }
                } else {
                    if (tile.color !== "pink" && debug)
                        tile.color = void 0;
                }
            }
        }

        for (const [x, y, tile] of tileCoordinates) {
            matrix[y][x] = createEmptyTile(tile.index, x, y, true);
        }

        const [firstX, firstY] = tileCoordinates[0];
        const { rotationPoint: [offsetX, offsetY] } = instance;
        const [baseX, baseY] = [firstY + offsetX, firstY + offsetY];
        // perform rotation
        instance.rotate(1);


        const { tileMap } = instance;
        const tileMapLength = tileMap.reduce((t, v) => t + v.filter(v => v).length, 0);
        const available: Tile[][] = [];

        const chain = chainSaw(tileMapLength - 1);
        y: for (const shiftY of chain) {
            for (const shiftX of chain) {
                const possible = [];
                for (let y = 0; y < tileMap.length; y++) {
                    for (const [x, tileMapBit] of tileMap[y].entries()) {
                        const [baseX, baseY] = [firstX + x - offsetX + shiftX, firstY + y - offsetY + shiftY];
                        if (tileMapBit && matrix[baseY] && matrix[baseY][baseX] && !matrix[baseY][baseX].occupied) {
                            possible.push(matrix[baseY][baseX]);
                        }
                    }
                }

                if (possible.length === tileMapLength) {
                    available.push(possible);
                    if (!debug) {
                        break y;
                    }
                }
            }
        }

        if (available.length) {
            for (const { x, y } of available[0]) {
                matrix[y][x] = tileCoordinates.pop()[2];
            }
        } else {
            // counter rotate if rotation was unsuccessful
            instance.rotate(-1);
            for (const [x, y, tile] of tileCoordinates) {
                matrix[y][x] = tile;
            }
        }

        if (debug) {
            available.forEach((v, y) => {
                const color = ["lightblue", "cyan", "pink", "brown", "tomato"][4]
                v.forEach((v) => {
                    matrix[v.y][v.x].color = color;
                });

            });
        }

        matrix = renderGhost(matrix);

        return matrix;
    }
}
