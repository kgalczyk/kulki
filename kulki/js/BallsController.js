import Ball from "./Ball.js";
import generateRandomNumber from "./generateRandomNumber.js";
export default class BallsController {
    constructor(cells) {
        this.balls = [];
        this.cells = [];
        this.renderBalls = () => {
            console.log("render kulek", this.balls);
            this.balls.forEach((ball) => {
                const cell = this.cells.find((cell) => {
                    if (cell.getX() === ball.getX() &&
                        cell.getY() === ball.getY())
                        return cell;
                });
                console.log("złapana komórka:", cell);
                if (cell != undefined)
                    document.getElementById(cell.getId()).appendChild(ball.toHTMLElement());
            });
        };
        this.generateRandomBall = () => {
            this.balls.push(new Ball({
                x: generateRandomNumber(10, 0),
                y: generateRandomNumber(10, 0)
            }));
        };
        this.cells = cells;
    }
}
