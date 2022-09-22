import Cell from "./Cell.js";
export default class Ball extends Cell {
    constructor(indexes) {
        super(indexes);
        this.toHTMLElement = () => {
            const div = document.createElement("div");
            div.style.width = Ball.PROPERTIES.WIDTH + "px";
            div.style.height = Ball.PROPERTIES.HEIGHT + "px";
            div.classList.add(Ball.PROPERTIES.CLASSNAME);
            return div;
        };
    }
}
Ball.PROPERTIES = {
    WIDTH: 25,
    HEIGHT: 25,
    CLASSNAME: "ball"
};
