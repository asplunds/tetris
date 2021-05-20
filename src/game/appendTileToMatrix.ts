import { Block } from "./blocks";
import evaluateGhost from "./evaluateGhost";
import { Matrix, MatrixDimensions } from "./types";

export default function appendTileToMatrix (dimensions: MatrixDimensions) {
    const rows = dimensions.height;
    const columns = dimensions.width;
    const renderGhost = evaluateGhost(dimensions);

    return (matrix: Matrix, block: Block): Matrix => {
        const map = block.tileMap;
        const mapLength = map.length;
        const tileWidth = map[0].length;
        const offsetX = Math.ceil(columns / 2) - Math.floor(tileWidth / 2);

        for (let y = 0; y < mapLength; y++) {
            for (const [x, tile] of map[y].entries()) {
                if (tile) {
                    matrix[y][x + offsetX].instance = block;
                }
            }
        }

        return renderGhost(matrix);
    }
}