import Ball from "./Ball";
import Cell from "./Cell";
import generateRandomNumber from "./generateRandomNumber";
import { Indexes } from "./Indexes";
import Pathfinder from "./Pathfinder";
import Preview from "./Preview";

export default class BallsController {
    private width: number;
    private height: number;
    private balls: Ball[] = [];
    private cells: Cell[] = [];
    private numericCellsArray: number[][] = [];

    private pathFinder: Pathfinder;
    private preview = new Preview();
    private AMOUNT_OF_PREVIEWED_BALLS = 3;

    constructor(cells: Cell[], width: number, height: number) {
        this.width = width;
        this.height = height;
        this.cells = cells;
        this.balls = this.getPreviewedBalls(false);
        this.createNumericCellsArray();
        this.pathFinder = new Pathfinder(this.numericCellsArray);
        this.renderBalls();
        this.changePreview();
    }

    private createNumericCellsArray = () => {
        for (let width = 0; width < this.width; width++) {
            this.numericCellsArray.push([]);
            for (let height = 0; height < this.height; height++) {
                this.numericCellsArray[width][height] = this.cells[width * height + width].getNumericValue(); //
            }
        }
    }

    private renderBalls = (): void => {
        // console.log("render kulek", this.balls);
        this.balls.forEach((ball: Ball) => {
            const cell = this.cells.find((cell: Cell) => {
                if (cell.getX() === ball.getX() &&
                    cell.getY() === ball.getY()) {
                    cell.hasBall = true;
                    ball.isPreviewed = false;
                    return cell;
                }
            });
            if (!cell) return;
            const cellId = document.getElementById(cell.getId());
            cellId.innerHTML = '';
            cellId.appendChild(ball.toHTMLElement());
            this.updateNumericArray(Number.POSITIVE_INFINITY, { x: cell.getX(), y: cell.getY() });
        })
    }

    private generateRandomBall = (toPreview: boolean): Ball => {
        const ball = new Ball({ x: generateRandomNumber(this.width, 0), y: generateRandomNumber(this.height, 0) }, this.balls, toPreview);
        ball.getBalls = () => { return this.getBalls(); }
        return ball;
    }

    private changePreview = () => {
        const previewedBalls = this.getPreviewedBalls(true);
        this.preview.changePreview(previewedBalls);
        this.balls.push(...previewedBalls);
    }

    public getPreviewedBalls = (toPreview: boolean): Ball[] => {
        const balls: Ball[] = [];
        for (let i = 0; i < this.AMOUNT_OF_PREVIEWED_BALLS; i++) {
            let ball = this.generateRandomBall(toPreview);
            while (!this.cells.find(cell => cell.hasBall == false && cell.getId() == ball.getId()))
                ball = this.generateRandomBall(toPreview);
            balls.push(ball);
        }
        return balls;
    }

    public updateBalls = (div: HTMLDivElement, cell: Cell) => {
        this.pathFinder.getShortestPath();
        const selectedBall = this.balls.find(ball => ball.getState() == true); // znajdujemy wybraną kulkę
        const selectedCell = this.cells.find(cell => cell.getId() == selectedBall.getId());
        selectedBall.getParentDiv().innerHTML = '';
        selectedCell.hasBall = false;
        if (!selectedBall) return;
        // teraz musimy usunąć wybraną kulkę, usunąć elementhtml wybranej kulki z diva w którym się znajdowała
        const newBall = new Ball({ x: cell.getX(), y: cell.getY() }, this.balls, false);
        newBall.setColor(selectedBall.getColor());
        newBall.setParentDiv(div);
        this.balls = this.balls.filter(ball => ball.getId() != selectedBall.getId());
        this.balls.push(newBall);
        this.renderBalls();
        this.changePreview();
    }

    private updateNumericArray = (value: number, indexes: Indexes): void => {
        this.numericCellsArray[indexes.x][indexes.y] = value;
    }

    public getNumericArray = (): number[][] => {
        return this.numericCellsArray;
    }

    public getBalls = (): Ball[] => {
        return this.balls;
    }

    public setBalls = (balls: Ball[]) => {
        this.balls = balls;
    }

    private lose = () => {
        if (this.balls.length == this.width * this.height) alert("przegrana");
    }
}