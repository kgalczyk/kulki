import Cell from "./Cell";
import { Indexes } from "./Indexes";

export default class Ball extends Cell {
    static PROPERTIES = {
        WIDTH: 25,
        HEIGHT: 25,
        EMBIGGEN_SIZE: 40,
        CLASSNAME: "ball",
        COLOR: ['blue', 'purple', 'red', 'yellow', 'green', 'white', 'orange'],
    }

    private color: string;
    private STATE: boolean = false;
    private balls: Ball[];
    private div: HTMLDivElement;
    private parentDiv: HTMLDivElement;
    public isPreviewed: boolean = false;

    constructor(indexes: Indexes, balls: Ball[], toPreview: boolean) {
        super(indexes);
        this.isPreviewed = toPreview;
        this.balls = balls;
        this.color = Ball.PROPERTIES.COLOR[Math.floor(Math.random() * Ball.PROPERTIES.COLOR.length)];
    }

    private changeSize = (div: HTMLDivElement): void => {
        div.style.width = (this.STATE ? Ball.PROPERTIES.EMBIGGEN_SIZE : Ball.PROPERTIES.WIDTH) + "px";
        div.style.height = (this.STATE ? Ball.PROPERTIES.EMBIGGEN_SIZE : Ball.PROPERTIES.HEIGHT) + "px";
    }


    public toHTMLElement = (): HTMLDivElement => {
        this.parentDiv = document.getElementById(this.getId()) as HTMLDivElement;
        const div = document.createElement("div");
        div.style.width = Ball.PROPERTIES.WIDTH + "px";
        div.style.height = Ball.PROPERTIES.HEIGHT + "px";
        div.style.backgroundColor = this.color;
        div.style.border = "1px solid black";
        div.classList.add(Ball.PROPERTIES.CLASSNAME);
        this.div = div;
        div.onclick = () => {
            if (this.isPreviewed) return;
            const selectedBall = this.getBalls().find(ball => ball.getState() == true);
            if (selectedBall && selectedBall.getId() != this.getId()) {
                selectedBall.setState(false);
                selectedBall.changeSize(selectedBall.getDiv());
            }
            this.STATE = !this.STATE;
            this.changeSize(div);
        }
        return div;
    }

    public getState = (): boolean => {
        return this.STATE;
    }

    public setState = (bool: boolean) => {
        this.STATE = bool;
    }

    public getDiv = () => {
        return this.div;
    }

    public getParentDiv() {
        return this.parentDiv;
    }

    public setParentDiv(div: HTMLDivElement) {
        this.parentDiv = div;
    }

    public getColor() {
        return this.color;
    }

    public setColor(color: string) {
        this.color = color;
    }

    public setBalls = (balls: Ball[]) => {
        this.balls = balls;
    }

    public getBalls = (): Ball[] => { return this.balls; };
}