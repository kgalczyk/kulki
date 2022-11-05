import { Indexes } from "./Indexes";

export default class Cell {
    static PROPERTIES = {
        WIDTH: 50,
        HEIGHT: 50,
        CLASSNAME: "cell"
    }
    private x: number;
    private y: number;
    private id: string;

    private numericValue: number;

    constructor(indexes: Indexes, numericValue?: number) {
        this.x = indexes.x;
        this.y = indexes.y;
        this.id = this.x + "_" + this.y;

        this.numericValue = numericValue;
    }

    toHTMLElement = (): HTMLDivElement => {
        const div = document.createElement("div");
        div.id = this.id;

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

    getId() {
        return this.id;
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

    getNumericValue = () => {
        return this.numericValue;
    }

    setNumericValue = (value: number) => {
        this.numericValue = value;
    }
}
