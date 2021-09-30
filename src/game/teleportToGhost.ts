import { Block } from "./blocks";
import { createEmptyTile } from "./createEmptyTile";
import evaluateGhost from "./evaluateGhost";
import { Matrix, MatrixDimensions, Tile } from "./types";

export const teleportToGhost = (dimensions: MatrixDimensions) => {
    const rows = dimensions.height;
    const renderGhost = evaluateGhost(dimensions);

    return (matrix: Matrix): Matrix => {
        matrix = renderGhost(matrix);
        let instance: Block = null;

        const tileCoordinates: [number, number, Tile][] = [];
        const ghostCoordinates: [number, number, Tile][] = [];

        // calculate where ghost should land
        y: for (let y = 0; y < rows; y++) {
            for (const [x, tile] of matrix[y].entries()) {
                if (tile.instance) {
                    if (!instance) {
                        instance = tile.instance
                    }
                    tileCoordinates.push([x, y, tile]);
                }
                if (tile.ghost) {
                    ghostCoordinates.push([x, y, tile]);
                }
            }
        }

        // perform the teleportation
        for (const [i, [x, y]] of tileCoordinates.entries()) {
            const [ghostX, ghostY] = ghostCoordinates[i];
            matrix[ghostY][ghostX] = {
                ...matrix[y][x],
                instance: void 0,
                color: instance.color,
                occupied: true
            };
        }
        // clear ghost?
        for (const [x, y, instanceTile] of tileCoordinates)
            if (!matrix[y][x].occupied)
                matrix[y][x] = createEmptyTile(instanceTile.index, x, y);

        return matrix;
    }
}