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
        this.ballsController = new BallsController(this.cells, this.width, this.height);
        this.setListeners();
    }

    private setListeners = () => {
        this.cells.forEach((cell) => {
            const div = this.getCellDivElement(cell);
            div.onclick = () => {
                //    console.log(cell.hasBall);
                if (cell.hasBall) return; // zwracamy, żeby nie wykonywało nic poza klikiem w kulkę
                this.ballsController.updateBalls(div, cell);
            }
        })
    }

    private createCells = (): void => {
        for (let width = 0; width < this.width; width++) {
            for (let height = 0; height < this.height; height++) {
                this.cells.push(new Cell({ x: width, y: height }, 1));
            }
        }
        // console.log(this.cells);
    }

    private renderCells = (): void => {
        for (let cellIndex = 0; cellIndex < this.cells.length; cellIndex++) {
            const cell: Cell = this.cells[cellIndex];
            this.boardElement.appendChild(cell.toHTMLElement());
        }
    }

    public getCellDivElement = (cell: Cell): HTMLDivElement => {
        return document.getElementById(cell.getId()) as HTMLDivElement;
    }
}

const board: Board = new Board(9, 9);
