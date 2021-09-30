import "../sass/layout.scss";
import { Block, IBlock, OBlock, JBlock, LBlock, SBlock, TBlock, ZBlock } from "./blocks";
import shiftActive from "./shiftActiveBlock";
import { teleportToGhost } from "./teleportToGhost";
import { Matrix, MatrixDimensions, Tile } from "./types";
import { shuffle } from "./utils";
import { drawGame } from "./draw";
import { rotateActive } from "./rotateActiveBlock";
import { sizeCanvas } from "./sizeCanvas";
import { createEmptyMatrix } from "./createEmptyMatrix";
import appendTileToMatrix from "./appendTileToMatrix";
import evaluateLineClear from "./evaluateLineClear";

const canvas = document.getElementById("game") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

export const debug = false;

const matrixDimensions: MatrixDimensions = {
    height: 50,
    width: 6
}

!(function game(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, matrixDimensions: MatrixDimensions) {
    const allBlocks: (typeof Block)[] = [IBlock, OBlock, JBlock, LBlock, SBlock, TBlock, ZBlock];

    /**
     * The bag is the Tetris term for the randomized current array of blocks, when it's empty
     * a new one is generated
     */
    let bag = shuffle(allBlocks.slice(0));

    /**
     * Get one block (guaranteed)
     * @returns block
     */
    const getBlock = (): typeof Block => {
        if (!bag.length)
            bag = shuffle(allBlocks.slice(0));

        return bag.pop();
    }

    const rotate = rotateActive(matrixDimensions);
    const shift = shiftActive(matrixDimensions, getBlock);
    const append = appendTileToMatrix(matrixDimensions);
    const resize = sizeCanvas(canvas, matrixDimensions);
    const activeToGhost = teleportToGhost(matrixDimensions);
    const checkLineClear = evaluateLineClear(matrixDimensions);
    resize();

    const xMovementSpeed = 2;
    let render = drawGame(canvas, ctx, matrixDimensions);
    let matrix: Matrix = createEmptyMatrix(matrixDimensions);

    let heldKeyCodeAll = null;
    let heldKeyCode = null;
    let keyCode = null;

    matrix = append(matrix, new (getBlock()));

    let keyDownTimeout = null;
    window.addEventListener("keydown", e => {
        const key = e.which || e.keyCode;
        if (e.isComposing || e.keyCode === 229 || key === heldKeyCodeAll) {
            return;
        }
        heldKeyCodeAll = key;

        // place?
        if (key === 32) {
            matrix = activeToGhost(matrix);
            matrix = append(matrix, new (getBlock()));
            matrix = checkLineClear(matrix);
            heldKeyCodeAll = null;
        }
        // rotate?
        else if (key === 38) {
            matrix = rotate(matrix);
            // down, left or right?
        } else {
            matrix = handleMovementControls(matrix, key);
            heldKeyCode = key;
            if (keyDownTimeout)
                clearTimeout(keyDownTimeout);
            keyDownTimeout = window.setTimeout(() => {
                if (heldKeyCode === key) {
                    xMovementCounter = xMovementSpeed;
                    keyCode = key;
                }
            }, 150);
        }

    });
    window.addEventListener("keyup", e => {
        const key = e.which || e.keyCode;
        if (key === 32) {

        } else if (heldKeyCodeAll === key) {
            heldKeyCodeAll = null;
        }
        if ((key === keyCode || key === heldKeyCode) && key !== 38) {
            heldKeyCodeAll = null;
            window.requestAnimationFrame(() => {
                keyCode = null;
                heldKeyCode = null;
            });
            keyCode = null;
            heldKeyCode = null;
        }
    });

    let speed = 35; // more is slower
    let speedCounter = 0;
    let xMovementCounter = 0;
    const clock = () => {
        render(matrix);

        if (xMovementCounter === xMovementSpeed) {
            matrix = handleMovementControls(matrix, keyCode);
            xMovementCounter = 0;
        } else {
            xMovementCounter++;
        }

        if (speedCounter === speed) {
            matrix = shift(matrix, 0, 1);
            speedCounter = 0;
        } else {
            speedCounter++;
        }


        setTimeout(() => {
            window.requestAnimationFrame(clock);
        }, 1000 / 60);
    }

    clock();

    const handleMovementControls = (matrix: Tile[][], code: number): Matrix => {
        switch (code) {
            case 39: {
                matrix = shift(matrix, 1, 0);
                break;
            }
            case 37: {
                matrix = shift(matrix, -1, 0);
                break;
            }
            case 40: {
                matrix = shift(matrix, 0, 1);
                break;
            }
        }
        return matrix;
    }

    window.addEventListener("resize", () => {
        resize();
        render = drawGame(canvas, ctx, matrixDimensions);
    });

    return true;
})(canvas, ctx, matrixDimensions);