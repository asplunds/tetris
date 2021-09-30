
/**
 * Removes units because why not
 * @param style 
 * @returns 
 */
export const noUnitsPlease = (style: string) => {
    return style.replace(/px|em|rem|ch|%/, "");
}

/**
 * Get a specific area of a matrix
 * @param matrix The matrix
 * @param sx start x
 * @param sy start y
 * @param ex end x
 * @param ey end y
 * @returns The area of the matrix specified by the coordinates
 */
export const getMatrixArea = <T>(matrix: T[][], sx: number, sy: number, ex: number, ey: number): T[][] => {

    const rows = matrix.slice(sy, ey);
    const newMatrix = rows.map(row => row.slice(sx, ex));

    return newMatrix;

}

/**
 * Generates a zig-zag of an array with a bias towards the right,
 * this prioritizes which distance is closest.
 * The chainsaw algorithm will create longer absolute zigs and zags as start goes towards n
 * @param n distance
 * @param start starting point
 * @returns zig zagging graph of an array
 */
export const chainSaw = (n: number, start = 0) => {
    return Array(n).fill(0).map((_, i) => {
        return [start - i, start + i];
    }).flat();
}

/**
 * Shuffles an array
 * @param a Array to shuffle
 */
export const shuffle = <T>(a: T[]) => {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}