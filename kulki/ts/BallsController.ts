import Ball from "./Ball";
import BoardCleaner from "./BoardCleaner";
import Cell from "./Cell";
import generateRandomNumber from "./generateRandomNumber";
import { Indexes } from "./Indexes";
import Preview from "./Preview";

type nullFunction = () => null;

export default class BallsController {
    private startTime: number;
    private endTime: number;
    private points: number;
    private width: number;
    private height: number;
    public balls: Ball[] = [];
    private cells: Cell[] = [];
    private numericCellsArray: number[][] = [];
    public hoveredIndexes: Indexes;
    public isReloading: boolean = false;
    private preview = new Preview();
    private boardCleaner: BoardCleaner;
    private /* readonly*/ AMOUNT_OF_PREVIEWED_BALLS = 3;
    private previewedBalls: Ball[] = [];

    constructor(cells: Cell[], width: number, height: number) {
        this.points = 0;
        this.width = width;
        this.height = height;
        this.cells = cells;
        this.balls = this.getPreviewedBalls(false);
        this.boardCleaner = new BoardCleaner(this.balls, width, height);
        this.createNumericCellsArray();
        // this.pathFinder = new Pathfinder(this.numericCellsArray);
        this.startTime = new Date().getTime();
        this.renderBalls();
        this.changePreview();
    }

    private removeListeners = () => {
        this.cells.forEach(cell => cell.getDiv().onclick = (): nullFunction => { return });
        this.balls.forEach(ball => ball.getDiv().onclick = (): nullFunction => { return });
        document.getElementById("board").onmousemove = (): nullFunction => { return };
        this.preview.removeListeners();
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
        this.cells.forEach(cell => {
            cell.getDiv().innerHTML = '';
            cell.hasBall = false;
        })

        // console.log(`render ${this.balls.length} kulek`);
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
            cellElement.appendChild(ball.toHTMLElement());
            this.updateNumericArray(-1, { x: cell.getX(), y: cell.getY() });
            ball.setBalls(this.balls);
        })

        this.updatePoints();
    }

    private generateRandomBall = (toPreview: boolean): Ball => {
        if (this.balls.length >= this.width * this.height - 3) {
            let cells = this.cells.filter(cell => !cell.hasBall);
            console.log("wchodzi", cells);
            const random = generateRandomNumber(cells.length, 0);
            return new Ball({ x: cells[random].getY(), y: cells[random].getY() }, this.balls, toPreview);
            // console.log(this.cells.filter(cell => !cell.hasBall));
        }

        const MAX_ITERS = 100;
        let iters = 0;
        // const randomIndex = generateRandomNumber(cellsWithoutBall.length, 0);
        // const randomCell = this.cells.find((cell, index) => index == randomIndex);
        // let ball = new Ball({ x: randomCell.getX(), y: randomCell.getY() }, this.balls, toPreview);
        let ball = new Ball({ x: generateRandomNumber(this.width, 0), y: generateRandomNumber(this.height, 0) }, this.balls, toPreview);
        while (this.balls.length > 0 && this.balls.find(b => b.getId() == ball.getId()) && iters <= MAX_ITERS) {
            ball = new Ball({ x: generateRandomNumber(this.width, 0), y: generateRandomNumber(this.height, 0) }, this.balls, toPreview);
            iters++;
        }

        if (iters > MAX_ITERS) {
            console.error("nie udało się utworzyć nowej kulki");
            return;
        };

        ball.getBalls = () => { return this.getBalls(); }
        return ball;
    }

    private changePreview = () => {
        this.previewedBalls = this.getPreviewedBalls(true);
        this.preview.changePreview(this.previewedBalls);
        // this.balls.push(...this.previewedBalls);
        // if (this.balls.length == 81) this.lose();
    }

    public getPreviewedBalls = (toPreview: boolean): Ball[] => {
        const balls: Ball[] = [];


        console.log(this.balls.length);

        // jeśli się zbliżamy do końca np. zostały dwie kulki do wygenerowania
        // to trzeba zmniejszyć liczbę generowanych kulek
        const cellsWithoutBall = this.cells.filter(cell => !cell.hasBall);

        if (cellsWithoutBall.length <= 3) {
            console.log(cellsWithoutBall);
            for (let i = 0; i < cellsWithoutBall.length; i++) {
                let cell = cellsWithoutBall[i];
                balls.push(new Ball({ x: cell.getX(), y: cell.getY() }, this.balls, toPreview));
            }
            console.log("wygenerowano:", balls.length, "kulki");
            console.log(balls.map(ball => ball.getId()));
            return balls;
        }
        for (let i = 0; i < this.AMOUNT_OF_PREVIEWED_BALLS; i++) {
            let ball = this.generateRandomBall(toPreview);
            while (balls.length > 0 && balls.find(b => b.getId() == ball.getId()))
                ball = this.generateRandomBall(toPreview);
            balls.push(ball);
        }
        console.log("wygenerowano:", balls.length, "kulki");
        console.log(balls.map(ball => ball.getId()));

        return balls;
    }

    public updateBalls = (div: HTMLDivElement, cell: Cell) => {
        const selectedBall = this.balls.find(ball => ball.getState() == true); // znajdujemy wybraną kulkę
        if (!selectedBall) return;
        selectedBall.getParentDiv().innerHTML = '';
        let c = this.cells.find(c => c.getId() == selectedBall.getId());
        c.hasBall = false;
        // const selectedCell = this.cells.find(cell => cell.getId() == selectedBall.getId());

        const newBall = new Ball({ x: cell.getX(), y: cell.getY() }, this.balls, false);
        newBall.setColor(selectedBall.getColor());
        newBall.setParentDiv(div);
        newBall.getParentDiv().appendChild(newBall.toHTMLElement());
        c = this.cells.find(c => c.getId() == newBall.getId());
        c.hasBall = true;
        // trzeba teraz sprawdzić, czy któraś kulka w preview nie ma takiego samego id jak ta
        const sameBall = this.previewedBalls.find(ball => ball.getId() == newBall.getId());
        if (sameBall) {
            c = this.cells.find(c => c.getId() == sameBall.getId());
            c.hasBall = false;
            const color = sameBall.getColor();
            let ballToReplace = this.generateRandomBall(true);
            while (this.previewedBalls.find(b => b.getId() == ballToReplace.getId()))
                ballToReplace = this.generateRandomBall(true);
            ballToReplace.setColor(color);
            c = this.cells.find(c => c.getId() == ballToReplace.getId());
            c.hasBall = true;
            this.previewedBalls = this.previewedBalls.filter(ball => ball.getId() != sameBall.getId());
            this.previewedBalls.push(ballToReplace);
            this.preview.changePreview(this.previewedBalls);
            console.log("zmieniono kulkę", sameBall.getId(), "na", ballToReplace.getId());
        }

        this.balls = this.balls.filter(ball => ball.getId() != selectedBall.getId());
        this.balls.push(newBall);
        // this.renderBalls();

        this.balls.push(...this.previewedBalls);
        // if (this.balls.length == 81) this.lose();

        this.boardCleaner.setBalls(this.balls);
    }

    public checkPatterns = () => {
        const bool = this.deleteBalls(this.boardCleaner.checkPatterns());
        // this.renderBalls();
        this.renderBalls();
        if (bool) return;
        if (this.balls.length + this.previewedBalls.length > this.width * this.height) {
            this.lose();
            console.log(this.previewedBalls);
            return;
        };
        this.changePreview();
        // this.boardCleaner.setBalls(this.balls);
    }

    private updatePoints = () => {
        const pointsElement = document.getElementById("points") as HTMLDivElement;
        pointsElement.innerHTML = `punkty: ${this.points}`;
    }

    deleteBalls = (balls: string[]): boolean => {
        if (!balls) return false;
        const lengthBefore = this.balls.length;
        this.balls = this.balls.filter(ball => !balls.find(id => id === ball.getId()) && !ball.isPreviewed);
        const lengthAfter = this.balls.length;

        this.points += lengthBefore - lengthAfter - 3/*what? */;
        return true;
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

    public getPoints = () => {
        return this.points;
    }

    private lose = () => {
        this.endTime = new Date().getTime();
        this.removeListeners();
        alert("przegrana, czas rozgrywki: " + ((this.endTime - this.startTime) / 1000).toFixed(2) + " punkty: " + this.points);
    }
}