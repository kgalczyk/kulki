import Ball from "./Ball";
import Cell from "./Cell";
import generateRandomNumber from "./generateRandomNumber";
import { Indexes } from "./Indexes";
import Pathfinder from "./Pathfinder";

export default class BallsController {
    private balls: Ball[] = [];
    private cells: Cell[] = [];
    private cellsNumericArray: number[] = [];
    private pathFinder: Pathfinder;

    constructor(cells: Cell[]) {
        this.cells = cells;

        this.cellsNumericArray = this.cells.map(cell => { return cell.getNumericValue() });
    }

    renderBalls = (): void => {
        console.log("render kulek", this.balls);

        this.balls.forEach((ball: Ball) => {
            const cell = this.cells.find((cell: Cell) => {
                if (cell.getX() === ball.getX() &&
                    cell.getY() === ball.getY())
                    return cell;
            });
            console.log("złapana komórka:", cell);

            if (cell != undefined) document.getElementById(cell.getId()).appendChild(ball.toHTMLElement());
        })
    }

    generateRandomBall = (): void => {
        this.balls.push(new Ball(
            {
                x: generateRandomNumber(10, 0),
                y: generateRandomNumber(10, 0)
            }
        ));
    }

    updateNumericArray = (value: number, indexes: Indexes): void => {
        this.cellsNumericArray[indexes.x * indexes.y - 1] = value;
    }

    getNumericArray = (): number[] => {
        return this.cellsNumericArray;
    }
}