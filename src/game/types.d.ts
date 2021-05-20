import { Block } from "./blocks";


export interface MatrixDimensions {
    height: number; width: number;
}

export interface Tile {
    occupied: boolean;
    index: number;
    instance?: Block;
    color?: string;
    ghost?: boolean;
    x: number;
    y: number;
}

export type Matrix = Tile[][];