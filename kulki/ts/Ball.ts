import Cell from "./Cell.js";
import { Indexes } from "./Indexes.js";

export default class Ball extends Cell {
    static PROPERTIES = {
        WIDTH: 25,
        HEIGHT: 25,
        CLASSNAME: "ball"
    }

    constructor(indexes: Indexes) {
        super(indexes);
    }

    toHTMLElement = (): HTMLDivElement => {
        const div = document.createElement("div");
        div.style.width = Ball.PROPERTIES.WIDTH + "px";
        div.style.height = Ball.PROPERTIES.HEIGHT + "px";
        div.classList.add(Ball.PROPERTIES.CLASSNAME);
        return div;
    }
}