import Ball from "./Ball.js";
import Cell from "./Cell.js";
import generateRandomNumber from "./generateRandomNumber.js";

export default class BallsController {
    private balls: Ball[] = [];
    private cells: Cell[] = [];

    constructor(cells: Cell[]) {
        this.cells = cells;
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

    generateRandomBall = () => {
        this.balls.push(new Ball(
            {
                x: generateRandomNumber(10, 0),
                y: generateRandomNumber(10, 0)
            }
        ));
    }
}