import Cell from "./Cell.js";
import { Indexes } from "./Indexes.js";

export default class Ball extends Cell {
    static PROPERTIES = {
        WIDTH: 25,
        HEIGHT: 25,
        CLASSNAME: "ball",
        COLOR: ['black', 'purple', 'red', 'yellow', 'green', 'white'],
    }

    private color: string;

    constructor(indexes: Indexes) {
        super(indexes);
        this.color = Ball.PROPERTIES.COLOR[Math.floor(Math.random() * Ball.PROPERTIES.COLOR.length)];
    }

    toHTMLElement = (): HTMLDivElement => {
        const div = document.createElement("div");

        div.style.width = Ball.PROPERTIES.WIDTH + "px";
        div.style.height = Ball.PROPERTIES.HEIGHT + "px";
        div.style.backgroundColor = this.color;
        div.style.border = "1px solid black";

        div.classList.add(Ball.PROPERTIES.CLASSNAME);
        return div;
    }
}