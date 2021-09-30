import { MatrixDimensions, Matrix } from "./types";
import { noUnitsPlease } from "./utils";

export const drawGame = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, dimensions: MatrixDimensions) => {
    // perhaps refactor to somewhere better?
    const borderSize = 1;
    const tileColor = "#444";
    const size = {
        width: canvas.getAttribute("width"),
        height: canvas.getAttribute("height")
    };

    
    const rows = dimensions.height;
    const canvasWidth = parseFloat(noUnitsPlease(size.width));
    const canvasHeight = parseFloat(noUnitsPlease(size.height));
    const columns = dimensions.width;
    const totalWidth = (canvasWidth - borderSize * (columns - 1));
    const totalHeight = (canvasHeight - borderSize * (rows - 1));
    const tileSideLength = ~~(totalWidth / columns);
    const gutterWidth = ~~((totalWidth - tileSideLength * columns) / 2);
    const gutterHeight = ~~((totalHeight - tileSideLength * rows) / 2);

    return (matrix: Matrix) => {


        ctx.fillStyle = "transparent";
        /* reset */
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        /* render grid */
        for (let y = 0; y < rows; y++) {
            for (const [x, { instance, color, ghost }] of matrix[y].entries()) {
                if (instance) {
                    if (instance.flashing) {
                        instance.flashSequence++;
                        instance.stillFrameCount++;
                        if (instance.flashSequence > 50) {
                            instance.flashSequence = -100;
                        }
                        if (instance.flashSequence < 0) {
                            ctx.fillStyle = "#fff";
                        }
                        else {
                            ctx.fillStyle = instance.color;
                        }
                    } else {
                        instance.flashSequence = 0;
                        ctx.fillStyle = instance.color;
                    }

                } else if (color) {
                    ctx.fillStyle = color;
                } else if (ghost) {
                    const size = 2;

                    ctx.fillStyle = "#fff";
                    ctx.fillRect(
                        gutterWidth + tileSideLength * x + borderSize * x,
                        gutterHeight + tileSideLength * y + borderSize * y,
                        tileSideLength,
                        tileSideLength
                    );
                    ctx.fillStyle = tileColor;
                    ctx.fillRect(
                        gutterWidth + tileSideLength * x + borderSize * x + size,
                        gutterHeight + tileSideLength * y + borderSize * y + size,
                        tileSideLength - size * 2,
                        tileSideLength - size * 2
                    );
                    continue;
                } else {
                    ctx.fillStyle = tileColor;
                }

                ctx.fillRect(
                    gutterWidth + tileSideLength * x + borderSize * x,
                    gutterHeight + tileSideLength * y + borderSize * y,
                    tileSideLength,
                    tileSideLength
                );
            }
        }
    }
}
