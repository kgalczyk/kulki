import Cell from "./Cell.js";
export default class Board {
    constructor(boardWidth, boardHeight) {
        this.boardElement = document.getElementById("board");
        this.cells = [];
        this.createCells = () => {
            for (let width = 0; width < this.width; width++) {
                for (let height = 0; height < this.height; height++) {
                    this.cells.push(new Cell({ x: width, y: height }));
                }
            }
            console.log(this.cells);
        };
        this.renderCells = () => {
            for (let cellIndex = 0; cellIndex < this.cells.length; cellIndex++) {
                const cell = this.cells[cellIndex];
                this.boardElement.appendChild(cell.toHTMLElement());
            }
        };
        this.width = boardWidth;
        this.height = boardHeight;
    }
}
const board = new Board(10, 10);
board.createCells();
board.renderCells();
