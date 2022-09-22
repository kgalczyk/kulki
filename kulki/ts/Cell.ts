import Ball from "./Ball.js";
import { Indexes } from "./Indexes.js";

export default class Cell {
    static PROPERTIES = {
        WIDTH: 50,
        HEIGHT: 50,
        CLASSNAME: "cell"
    }
    private x: number;
    private y: number;

    constructor(indexes: Indexes) {
        this.x = indexes.x;
        this.y = indexes.y;
    }

    toHTMLElement = (): HTMLDivElement => {
        const div = document.createElement("div");
        div.style.width = Cell.PROPERTIES.WIDTH + "px";
        div.style.height = Cell.PROPERTIES.HEIGHT + "px";
        div.classList.add(Cell.PROPERTIES.CLASSNAME);
        return div;
    }

    toJson = (): Indexes => {
        return {
            x: this.getX(),
            y: this.getY(),
        };
    }

    getX() {
        return this.x;
    }

    setX(x: number) {
        this.x = x;
    }

    getY() {
        return this.y;
    }

    setY(y: number) {
        this.y = y;
    }
}
