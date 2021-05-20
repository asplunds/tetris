import { Tile } from "./types";

/**
 * All blocks and their rotations are stolen from tetris fandom :)
 */


/**
 *  0 = empty
 *  1 = filled
 */
type Binary = 0 | 1;

interface RotationMap {
    map: Binary[][];
    rotate: [number, number];
}

export class Block {
    public readonly orientation = 0;
    public readonly allRotations!: {
        0: RotationMap;
        90: RotationMap;
        180: RotationMap;
        270: RotationMap;
    };
    protected readonly legalRotations: [0, 90, 180, 270] = [0, 90, 180, 270];
    public currentRotation: 0 | 90 | 180 | 270 = 0;
    public readonly color!: string;
    public flashing: boolean = false;
    public flashSequence: number = 0;
    public stillFrameCount: number = 0;
    private _rotations: number = 0;

    rotate(rotation: 1 | -1) {
        this.stillFrameCount = 20;
        this._rotations++;
        const proposed = this.legalRotations.indexOf(this.currentRotation) + rotation;

        this.currentRotation = !this.legalRotations[proposed] ? rotation === 1 ? 0 : 270 : this.legalRotations[proposed];
    }
    get rotations() {
        return this._rotations;
    }
    get tileMap() {
        return this.allRotations[this.currentRotation].map;
    }
    get rotationPoint() {
        return this.allRotations[this.currentRotation].rotate;
    }

}

export class OBlock extends Block {

    color = "#eefc32";
    allRotations = {
        0: {
            map: [
                [1, 1],
                [1, 1],
            ] as Binary[][],
            rotate: [0, 0] as [number, number]
        },
        90: {
            map: [
                [1, 1],
                [1, 1],
            ] as Binary[][],
            rotate: [0, 0] as [number, number],
        },
        180: {
            map: [
                [1, 1],
                [1, 1],
            ] as Binary[][],
            rotate: [0, 0] as [number, number]
        },
        270: {
            map: [
                [1, 1],
                [1, 1],
            ] as Binary[][],
            rotate: [0, 0] as [number, number],
        }
    }

    constructor() {
        super();
    }

}
export class IBlock extends Block {
    color = "#00c1cc";
    allRotations = {
        0: {
            map: [
                [1, 1, 1, 1],
                [0, 0, 0, 0],
            ] as Binary[][],
            rotate: [-1, 0] as [number, number]
        },
        90: {
            map: [
                [0, 1],
                [0, 1],
                [0, 1],
                [0, 1]
            ] as Binary[][],
            rotate: [2, 0] as [number, number],
        },
        180: {
            map: [
                [0, 0, 0, 0],
                [1, 1, 1, 1],
            ] as Binary[][],
            rotate: [-1, 0] as [number, number]
        },
        270: {
            map: [
                [1, 0],
                [1, 0],
                [1, 0],
                [1, 0]
            ] as Binary[][],
            rotate: [1, 0] as [number, number],
        }
    }
    constructor() {
        super();
    }

}



export class JBlock extends Block {
    color = "#0047c1";
    allRotations = {
        0: {
            map: [
                [1, 0, 0],
                [1, 1, 1],
                [0, 0, 0],
            ] as Binary[][],
            rotate: [0, 0] as [number, number]
        },
        90: {
            map: [
                [0, 1, 1],
                [0, 1, 0],
                [0, 1, 0],
            ] as Binary[][],
            rotate: [1, 0] as [number, number],
        },
        180: {
            map: [
                [0, 0, 0],
                [1, 1, 1],
                [0, 0, 1],
            ] as Binary[][],
            rotate: [0, 0] as [number, number]
        },
        270: {
            map: [
                [0, 1, 0],
                [0, 1, 0],
                [1, 1, 0],
            ] as Binary[][],
            rotate: [1, 0] as [number, number],
        }
    }


    constructor() {
        super();
    }

}
export class LBlock extends Block {

    color = "#fc9e32";
    allRotations = {
        0: {
            map: [
                [0, 0, 1],
                [1, 1, 1],
                [0, 0, 0],
            ] as Binary[][],
            rotate: [2, 0] as [number, number]
        },
        90: {
            map: [
                [0, 1, 0],
                [0, 1, 0],
                [0, 1, 1],
            ] as Binary[][],
            rotate: [1, 0] as [number, number],
        },
        180: {
            map: [
                [0, 0, 0],
                [1, 1, 1],
                [1, 0, 0],
            ] as Binary[][],
            rotate: [0, 0] as [number, number]
        },
        270: {
            map: [
                [1, 1, 0],
                [0, 1, 0],
                [0, 1, 0],
            ] as Binary[][],
            rotate: [0, 0] as [number, number],
        }
    }

    constructor() {
        super();
    }

}

export class SBlock extends Block {

    color = "#0cd313";
    allRotations = {
        0: {
            map: [
                [0, 1, 1],
                [1, 1, 0],
                [0, 0, 0],
            ] as Binary[][],
            rotate: [1, 0] as [number, number]
        },
        90: {
            map: [
                [0, 1, 0],
                [0, 1, 1],
                [0, 0, 1],
            ] as Binary[][],
            rotate: [1, 0] as [number, number],
        },
        180: {
            map: [
                [0, 0, 0],
                [0, 1, 1],
                [1, 1, 0],
            ] as Binary[][],
            rotate: [1, 1] as [number, number]
        },
        270: {
            map: [
                [1, 0, 0],
                [1, 1, 0],
                [0, 1, 0],
            ] as Binary[][],
            rotate: [0, -1] as [number, number],
        }
    }

    constructor() {
        super();
    }

}

export class TBlock extends Block {

    color = "#8d30ff";
    allRotations = {
        0: {
            map: [
                [0, 1, 0],
                [1, 1, 1],
                [0, 0, 0],
            ] as Binary[][],
            rotate: [1, 0] as [number, number]
        },
        90: {
            map: [
                [0, 1, 0],
                [0, 1, 1],
                [0, 1, 0],
            ] as Binary[][],
            rotate: [1, 0] as [number, number],
        },
        180: {
            map: [
                [0, 0, 0],
                [1, 1, 1],
                [0, 1, 0],
            ] as Binary[][],
            rotate: [0, 0] as [number, number]
        },
        270: {
            map: [
                [0, 1, 0],
                [1, 1, 0],
                [0, 1, 0],
            ] as Binary[][],
            rotate: [1, 0] as [number, number],
        }
    }

    constructor() {
        super();
    }

}

export class ZBlock extends Block {

    color = "#ff303e";
    allRotations = {
        0: {
            map: [
                [1, 1, 0],
                [0, 1, 1],
                [0, 0, 0],
            ] as Binary[][],
            rotate: [0, 0] as [number, number]
        },
        90: {
            map: [
                [0, 0, 1],
                [0, 1, 1],
                [0, 1, 0],
            ] as Binary[][],
            rotate: [2, 0] as [number, number],
        },
        180: {
            map: [
                [0, 0, 0],
                [1, 1, 0],
                [0, 1, 1],
            ] as Binary[][],
            rotate: [0, 1] as [number, number]
        },
        270: {
            map: [
                [0, 1, 0],
                [1, 1, 0],
                [1, 0, 0],
            ] as Binary[][],
            rotate: [1, -1] as [number, number],
        }
    }

    constructor() {
        super();
    }

}
