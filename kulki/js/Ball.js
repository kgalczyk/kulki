import Cell from "./Cell.js";
export default class Ball extends Cell {
    constructor(indexes) {
        super(indexes);
        this.toHTMLElement = () => {
            const div = document.createElement("div");
            div.style.width = Ball.PROPERTIES.WIDTH + "px";
            div.style.height = Ball.PROPERTIES.HEIGHT + "px";
            div.style.backgroundColor = this.color;
            div.style.border = "1px solid black";
            div.classList.add(Ball.PROPERTIES.CLASSNAME);
            return div;
        };
        this.color = Ball.PROPERTIES.COLOR[Math.floor(Math.random() * Ball.PROPERTIES.COLOR.length)];
    }
}
Ball.PROPERTIES = {
    WIDTH: 25,
    HEIGHT: 25,
    CLASSNAME: "ball",
    COLOR: ['black', 'purple', 'red', 'yellow', 'green', 'white'],
};
