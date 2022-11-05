import Cell from "./Cell";
import { Indexes } from "./Indexes";

export default class Ball extends Cell {
    static PROPERTIES = {
        WIDTH: 25,
        HEIGHT: 25,
        EMBIGGEN_SIZE: 40,
        CLASSNAME: "ball",
        COLOR: ['black', 'purple', 'red', 'yellow', 'green', 'white', 'orange'],
    }

    private color: string;
    private STATE: boolean = false;

    constructor(indexes: Indexes) {
        super(indexes);
        this.color = Ball.PROPERTIES.COLOR[Math.floor(Math.random() * Ball.PROPERTIES.COLOR.length)];
    }

    changeSize = (div: HTMLDivElement): void => {
        div.style.width = (this.STATE ? Ball.PROPERTIES.EMBIGGEN_SIZE : Ball.PROPERTIES.WIDTH) + "px";
        div.style.height = (this.STATE ? Ball.PROPERTIES.EMBIGGEN_SIZE : Ball.PROPERTIES.HEIGHT) + "px";
    }


    toHTMLElement = (): HTMLDivElement => {
        const div = document.createElement("div");

        div.style.width = Ball.PROPERTIES.WIDTH + "px";
        div.style.height = Ball.PROPERTIES.HEIGHT + "px";
        div.style.backgroundColor = this.color;
        div.style.border = "1px solid black";

        div.classList.add(Ball.PROPERTIES.CLASSNAME);

        div.onclick = () => {
            this.STATE = !this.STATE;
            this.changeSize(div);
        }

        return div;
    }
}