export default class Cell {
    constructor(indexes) {
        this.toHTMLElement = () => {
            const div = document.createElement("div");
            div.id = this.id;
            div.style.width = Cell.PROPERTIES.WIDTH + "px";
            div.style.height = Cell.PROPERTIES.HEIGHT + "px";
            div.classList.add(Cell.PROPERTIES.CLASSNAME);
            return div;
        };
        this.toJson = () => {
            return {
                x: this.getX(),
                y: this.getY(),
            };
        };
        this.x = indexes.x;
        this.y = indexes.y;
        this.id = this.x + "_" + this.y;
    }
    getId() {
        return this.id;
    }
    getX() {
        return this.x;
    }
    setX(x) {
        this.x = x;
    }
    getY() {
        return this.y;
    }
    setY(y) {
        this.y = y;
    }
}
Cell.PROPERTIES = {
    WIDTH: 50,
    HEIGHT: 50,
    CLASSNAME: "cell"
};
