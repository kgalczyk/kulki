import Ball from "./Ball";
import Cell from "./Cell";
import generateRandomNumber from "./generateRandomNumber";
import { Indexes } from "./Indexes";
import Preview from "./Preview";

export default class BallsController {
    private width: number;
    private height: number;
    public balls: Ball[] = [];
    private cells: Cell[] = [];
    private numericCellsArray: number[][] = [];
    public hoveredIndexes: Indexes;
    private preview = new Preview();
    private readonly AMOUNT_OF_PREVIEWED_BALLS = 3;

    constructor(cells: Cell[], width: number, height: number) {
        this.width = width;
        this.height = height;
        this.cells = cells;
        this.balls = this.getPreviewedBalls(false);
        this.createNumericCellsArray();
        // this.pathFinder = new Pathfinder(this.numericCellsArray);
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
        console.log(`render ${this.balls.length} kulek`);
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

            const cellElement = document.getElementById(cell.getId());
            cellElement.innerHTML = '';
            cellElement.appendChild(ball.toHTMLElement());
            this.updateNumericArray(-1, { x: cell.getX(), y: cell.getY() });
            ball.setBalls(this.balls);
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
        const selectedBall = this.balls.find(ball => ball.getState() == true); // znajdujemy wybraną kulkę
        if (!selectedBall) return;
        const selectedCell = this.cells.find(cell => cell.getId() == selectedBall.getId());
        selectedBall.getParentDiv().innerHTML = '';
        selectedCell.hasBall = false;

        const newBall = new Ball({ x: cell.getX(), y: cell.getY() }, this.balls, false);
        newBall.setColor(selectedBall.getColor());
        newBall.setParentDiv(div);

        this.balls = this.balls.filter(ball => ball.getId() != selectedBall.getId());
        this.balls.push(newBall);
        this.renderBalls();
        this.changePreview();
    }

    public updateNumericArray = (value: number, indexes: Indexes): void => {
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