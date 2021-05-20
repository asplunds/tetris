import { createEmptyTile } from "./createEmptyTile";
import { MatrixDimensions, Matrix } from "./types";

export const createEmptyMatrix = (dimensions: MatrixDimensions): Matrix => {

    const { height, width } = dimensions;
    let i = 0;

    return new Array(height).fill(0)
        .map((_, y) =>
            new Array(width).fill(0).map((_, x) =>
                createEmptyTile(++i, x, y)
            )
        );
}