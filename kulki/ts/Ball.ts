import Cell from "./Cell";
import { Indexes } from "./Indexes";
import generateRandomNumber from "./generateRandomNumber";
import Board from "./Board";

const changeShadows = (target: any, name: string, descriptor: any): void => {
    console.log(target)
    console.log(name)
    console.log(descriptor)
}

export default class Ball extends Cell {
    static PROPERTIES = {
        WIDTH: 25,
        HEIGHT: 25,
        EMBIGGEN_SIZE: 40,
        CLASSNAME: "ball",
        COLOR: ['blue', 'purple', 'red', 'yellow', 'green', 'pink', 'orange'],
    }
    private readonly xDirections: number[] = [-1, 0, 1, 0];
    private readonly yDirections: number[] = [0, 1, 0, -1];
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
        this.color = Ball.PROPERTIES.COLOR[generateRandomNumber(Ball.PROPERTIES.COLOR.length, 0)];
    }

    private changeSize = (div: HTMLDivElement): void => {
        div.style.width = (this.STATE ? Ball.PROPERTIES.EMBIGGEN_SIZE : Ball.PROPERTIES.WIDTH) + "px";
        div.style.height = (this.STATE ? Ball.PROPERTIES.EMBIGGEN_SIZE : Ball.PROPERTIES.HEIGHT) + "px";
    }

    public canBeMoved = (): boolean => {
        const ids: string[] = [];
        // for (let i = 0; i < this.xDirections.length; i++) {
        //     const ball = this.balls.find(ball => ball.getX() == this.getX() + this.xDirections[i] && ball.getY() == this.getY() + this.yDirections[i]);
        //     console.log(ball);

        //     if (!ball) bools.push(true);
        // }

        //   x 
        // x 0 x
        //   x
        for (let i = 0; i < this.xDirections.length; i++) {
            let adjacentX = this.getX() + this.xDirections[i];
            let adjacentY = this.getY() + this.yDirections[i];
            if (adjacentX < 0 || adjacentY < 0 || adjacentX >= 9 || adjacentY >= 9) continue;
            ids.push(adjacentX + "_" + adjacentY);
        }

        let bools: boolean[] = [];
        for (let i = 0; i < ids.length; i++) {
            if (this.balls.find(ball => ball.getId() == ids[i] && !ball.isPreviewed)) bools.push(true);
        }

        return ids.length != bools.length;
    }

    @changeShadows
    public toHTMLElement() {
        this.parentDiv = document.getElementById(this.getId()) as HTMLDivElement;
        const div = document.createElement("div");
        div.style.width = Ball.PROPERTIES.WIDTH + "px";
        div.style.height = Ball.PROPERTIES.HEIGHT + "px";
        div.style.backgroundColor = this.color;
        div.classList.add(Ball.PROPERTIES.CLASSNAME);
        this.div = div;
        div.onclick = () => {
            console.group(this.getId());
            console.log(this.color);
            // console.log(this.balls.length);

            // console.log(this);
            // console.log("czy można ruszyć:", this.canBeMoved());
            // console.log("czy jest w preview", this.isPreviewed);
            console.groupEnd();

            if (Board.IS_RELOADING) return;
            if (this.isPreviewed) return;
            if (!this.canBeMoved()) return;
            this.clearBallStates();
            this.STATE = !this.STATE;
            this.changeSize(div);
        }
        return div;
    }

    private clearBallStates = () => {
        this.balls.forEach(ball => {
            if (ball.getId() != this.getId()) {
                ball.setState(false);
                ball.changeSize(ball.getDiv());
            }
        })
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