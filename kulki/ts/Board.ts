import BallsController from "./BallsController";
import BoardProperties from "./BoardProperties";
import Cell from "./Cell";
import Pathfinder, { Path } from "./Pathfinder";

export default class Board implements BoardProperties {
    /**@public IS_RELOADING keep boolean information about the state of application reload after move*/
    public static IS_RELOADING: boolean = false;
    /**@public Latency of app reload after moving a ball */
    public static LATENCY: number = 100;
    /**@private boardElement keeps DivElement of game board*/
    private boardElement = document.getElementById("board") as HTMLDivElement;
    /**@private width keeps value of board width*/
    private width: number;
    /**@private height keeps value of board height*/
    private height: number;
    /**@private cells keep Cells of game board*/
    private cells: Cell[] = [];
    /**@private ballsController keeps instance of {@link BallsController}.*/
    private ballsController: BallsController;
    /**@private pathFinder keeps instance of {@link Pathfinder}.*/
    private pathFinder: Pathfinder;
    /**
     * @private path keeps instance of Path. Type Path is an equivalent of Indexes[]
     * @example const path: Path = [];
     * const index:Indexes = {
     *      x:1,
     *      y:1,
     * }
     * 
     * path.push(1) // error
     * path.push(index) // ok
    */
    private path: Path;

    /**@param boardWidth keeps numeric value about board's width */
    /**@param boardHeight keeps numeric value about board's height */
    /**@todo set up class to work */
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

    /** @todo sets onclick on each DIV element on grid and set onmousemove on board which initiates pathfinding*/
    private setListeners = () => {
        this.cells.forEach((cell) => {
            const div = this.getCellDivElement(cell);
            div.onclick = () => {
                //    console.log(cell.hasBall);
                if (cell.hasBall) return; // zwracamy, żeby nie wykonywało nic poza klikiem w kulkę
                if (this.path.length == 0) {
                    // console.log("brak ścieżki");
                    return;
                };


                // update koloru -> zostawienie śladu ścieżki
                this.recolorPath("grey"); // coś jeszcze nie działa
                // dodanie nowych kulek
                this.ballsController.updateBalls(div, cell);
                // wprowadzenie stanu przeładowania gry po ruchu
                Board.IS_RELOADING = true;
                setTimeout(() => {
                    // po sekundzie zmieniam stan przeładowania na false -> można zrobić kolejny ruch
                    Board.IS_RELOADING = false;
                    this.path = [];
                    this.pathFinder.colorDivs([]);
                    this.ballsController.checkPatterns();
                }, Board.LATENCY);
            }
        })

        this.boardElement.onmousemove = (event) => {
            if (Board.IS_RELOADING) return;
            const target = event.target as HTMLDivElement;
            const cell = this.cells.find(cell => { if (cell.getId() == target.id) return cell; });
            if (cell) this.ballsController.hoveredIndexes = cell.toJson();

            const selectedBall = this.ballsController.getBalls().find(ball => ball.getState() == true); // znajdujemy wybraną kulkę
            if (!selectedBall) {
                this.clearCellColors();
                return;
            };
            // this.path = [];
            this.path = this.pathFinder.findShortestPath({ x: selectedBall.getX(), y: selectedBall.getY() }, this.ballsController.hoveredIndexes);
            this.pathFinder.clearNodes();

            // console.log(this.path);

            this.cells.forEach(cell => this.ballsController.updateNumericArray(cell.hasBall ? -1 : 1, { x: cell.getX(), y: cell.getY() }));
        }
    }

    /**@param color keeps string value of color */
    /**@todo Specific DIVs will have their color changed based on their appearence in path. */
    private recolorPath = (color: string) => {
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                const div = document.getElementById(x + "_" + y);
                div.style.backgroundColor = "white";
                let index = this.path.find((elem) => { return elem.x == x && elem.y == y });
                if (index) div.style.backgroundColor = color;
            }
        }
    }

    /**@todo creates 2d matrix of Cells */
    private createCells = (): void => {
        for (let width = 0; width < this.width; width++) {
            for (let height = 0; height < this.height; height++) {
                const cell = new Cell({ x: width, y: height }, 1);
                cell.hasBall = false;
                this.cells.push(cell);
            }
        }
        // console.log(this.cells);
    }

    /**@todo renders created cells' DIVElements */
    private renderCells = (): void => {
        for (let cellIndex = 0; cellIndex < this.cells.length; cellIndex++) {
            const cell: Cell = this.cells[cellIndex];
            this.boardElement.appendChild(cell.toHTMLElement());
        }
    }

    /**@todo sets all Cells' colors to white  */
    private clearCellColors = () => {
        this.cells.forEach(cell => { document.getElementById(cell.getId()).style.backgroundColor = "white" });
    }

    /**@param cell instance of Cell given to use its getId() method which returns id of DIVElement */
    /**@todo gets the HTMLDivElement based on given Cell id */
    public getCellDivElement = (cell: Cell): HTMLDivElement => {
        return document.getElementById(cell.getId()) as HTMLDivElement;
    }

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }

    setHeight(number: number) {
        this.height = number;
    }

    setWidth(number: number) {
        this.width = number;
    }
}

const board: Board = new Board(9, 9);
