import BallsController from "./BallsController";
import Cell from "./Cell";
import Pathfinder, { Path } from "./Pathfinder";

export default class Board {
    private boardElement = document.getElementById("board") as HTMLDivElement;
    private width: number;
    private height: number;
    private cells: Cell[] = [];
    private ballsController: BallsController;
    private pathFinder: Pathfinder;
    private path: Path;

    constructor(boardWidth: number, boardHeight: number) {
        this.width = boardWidth;
        this.height = boardHeight;
        this.createCells();
        this.renderCells();
        this.ballsController = new BallsController(this.cells, this.width, this.height);
        this.setListeners();
        this.pathFinder = new Pathfinder(this.ballsController.getNumericArray());
        this.path = [];
    }

    private setListeners = () => {
        this.cells.forEach((cell) => {
            const div = this.getCellDivElement(cell);
            div.onclick = () => {
                //    console.log(cell.hasBall);
                this.pathFinder.colorDivs([]);
                if (cell.hasBall) return; // zwracamy, żeby nie wykonywało nic poza klikiem w kulkę
                if (this.path.length == 0) {
                    console.log("brak ścieżki");
                };
                this.ballsController.updateBalls(div, cell);
            }
        })

        this.boardElement.onmousemove = (event) => {
            const target = event.target as HTMLDivElement;
            const cell = this.cells.find(cell => { if (cell.getId() == target.id) return cell; });
            if (cell) this.ballsController.hoveredIndexes = cell.toJson();
            const selectedBall = this.ballsController.getBalls().find(ball => ball.getState() == true); // znajdujemy wybraną kulkę
            this.path = [];

            if (!selectedBall) {
                this.clearCellColors();
                return;
            };
            this.path = this.pathFinder.findShortestPath({ x: selectedBall.getX(), y: selectedBall.getY() }, this.ballsController.hoveredIndexes);
            // console.log(this.path);

            this.cells.forEach(cell => this.ballsController.updateNumericArray(cell.hasBall ? -1 : 1, { x: cell.getX(), y: cell.getY() }));
        }
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

    private clearCellColors = () => {
        this.cells.forEach(cell => { document.getElementById(cell.getId()).style.backgroundColor = "white" });
    }

    public getCellDivElement = (cell: Cell): HTMLDivElement => {
        return document.getElementById(cell.getId()) as HTMLDivElement;
    }
}

const board: Board = new Board(9, 9);
