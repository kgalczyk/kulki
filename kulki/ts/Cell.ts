import { Indexes } from "./Indexes";

export default class Cell {
    static PROPERTIES = {
        WIDTH: 50,
        HEIGHT: 50,
        CLASSNAME: "cell"
    }
    private readonly x: number;
    private readonly y: number;
    private id: string;
    public hasBall: boolean = false;

    private numericValue: number;

    constructor(indexes: Indexes, numericValue?: number) {
        this.x = indexes.x;
        this.y = indexes.y;
        this.id = this.x + "_" + this.y;

        this.numericValue = numericValue;
    }

    toHTMLElement() {
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

    setId(id: string) {
        this.id = id;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }
    getNumericValue = () => {
        return this.numericValue;
    }

    setNumericValue = (value: number) => {
        this.numericValue = value;
    }

    getDiv = (): HTMLDivElement => {
        return document.getElementById(this.getId()) as HTMLDivElement;
    }
}
