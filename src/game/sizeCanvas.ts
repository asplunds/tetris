import { MatrixDimensions } from "./types";

export const sizeCanvas = (canvas: HTMLCanvasElement, matrix: MatrixDimensions) => (): void => {

    const viewportProportion = .8;
    const { innerHeight } = window;
    const { height, width } = matrix;
    const aspectRatio = width / height;

    canvas.setAttribute("height", ~~(innerHeight * viewportProportion) + "px");
    canvas.setAttribute("width", ~~(innerHeight * viewportProportion * aspectRatio) + "px");
}