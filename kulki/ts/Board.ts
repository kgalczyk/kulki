import BallsController from "./BallsController";
import Cell from "./Cell";

export default class Board {
    private boardElement = document.getElementById("board") as HTMLDivElement;
    private width: number;
    private height: number;
    private cells: Cell[] = [];
    private ballsController: BallsController;

    constructor(boardWidth: number, boardHeight: number) {
        this.width = boardWidth;
        this.height = boardHeight;

        this.createCells();
        this.renderCells();
        this.ballsController = new BallsController(this.cells);
        this.ballsController.generateRandomBall();
        this.ballsController.renderBalls();

    }

    createCells = (): void => {
        for (let width = 0; width < this.width; width++) {
            for (let height = 0; height < this.height; height++) {
                this.cells.push(new Cell({ x: width, y: height }, 0));
            }
        }
        // console.log(this.cells);
    }

    renderCells = (): void => {
        for (let cellIndex = 0; cellIndex < this.cells.length; cellIndex++) {
            const cell: Cell = this.cells[cellIndex];
            this.boardElement.appendChild(cell.toHTMLElement());
        }
    }
}

const board: Board = new Board(9, 9);
