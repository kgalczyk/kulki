import Ball from "./Ball";
type voidFunction = (balls: string[]) => void;

export default class BoardCleaner {
    private readonly width: number;
    private readonly height: number;
    private balls: Ball[];
    private deletedBalls: Ball[];
    constructor(balls: Ball[], width: number, height: number) {
        this.balls = balls;

        this.width = width;
        this.height = height;
    }

    checkPatterns = (): string[] => {
        if (this.balls.length < 5) return;

        /*
            (1) sprawdzenie wierszy
        */
        const rowBalls: string[] = [];
        for (let col = 0; col < this.height; col++) {
            for (let row = 0; row < this.width / 2; row++) {
                let x = row;
                let y = col;
                let ids: string[] = [];
                const ball = this.balls.find(ball => ball.getId() == y + "_" + x);
                if (!ball) continue;
                let color = ball.getColor();
                while (this.balls.find(ball => ball.getId() == y + "_" + x && ball.getColor() == color)) {
                    ids.push(y + "_" + x);
                    x++;
                }
                if (ids.length >= 5) rowBalls.push(...ids);
            }
        }
        // console.log("tablica usunietych kulek po wierszach:", rowBalls);

        /*
            (2) sprawdzenie kolumn
        */
        const colBalls: string[] = [];
        for (let col = 0; col < this.height / 2; col++) {
            for (let row = 0; row < this.width; row++) {
                let x = row;
                let y = col;
                let ids: string[] = [];
                const ball = this.balls.find(ball => ball.getId() == y + "_" + x);
                if (!ball) continue;

                let color = ball.getColor();
                while (this.balls.find(ball => ball.getId() == y + "_" + x && ball.getColor() == color)) {
                    ids.push(y + "_" + x);
                    y++;
                }

                if (ids.length >= 5) colBalls.push(...ids);
            }
        }
        // console.log("tablica usunietych kulek po kolumnach:", colBalls);

        /*
            (3) sprawdzenie diagonali
        */
        const diagBalls: string[] = [];
        for (let col = this.height - 1; col > this.height / 2 - 1; col--) {
            for (let row = 0; row < this.width / 2; row++) {
                let x = row;
                let y = col;
                let ids: string[] = [];
                const ball = this.balls.find(ball => ball.getId() == y + "_" + x);
                if (!ball) continue;

                let color = ball.getColor();
                while (this.balls.find(ball => ball.getId() == y + "_" + x && ball.getColor() == color)) {
                    ids.push(y + "_" + x);
                    y--;
                    x++;
                }

                if (ids.length >= 5) diagBalls.push(...ids);
            }
        }
        // console.log("tablica usunietych kulek po diagonali:", diagBalls);

        /*
            (4) sprawdzenie antydiagonali
        */
        const antidiagBalls: string[] = [];
        for (let col = this.height - 1; col > this.height / 2 - 1; col--) {
            for (let row = this.width - 1; row > this.width / 2 - 1; row--) {
                let x = row;
                let y = col;
                let ids: string[] = [];
                const ball = this.balls.find(ball => ball.getId() == y + "_" + x);
                if (!ball) continue;

                let color = ball.getColor();
                while (this.balls.find(ball => ball.getId() == y + "_" + x && ball.getColor() == color)) {
                    ids.push(y + "_" + x);
                    y--;
                    x--;
                }

                if (ids.length >= 5) antidiagBalls.push(...ids);
            }
        }
        // console.log("tablica usunietych kulek po antydiagonali:", antidiagBalls);

        let finalDeletedBalls: string[] = [];

        if (rowBalls.length > 0) finalDeletedBalls.push(...rowBalls);
        if (colBalls.length > 0) finalDeletedBalls.push(...colBalls);
        if (diagBalls.length > 0) finalDeletedBalls.push(...diagBalls);
        if (antidiagBalls.length > 0) finalDeletedBalls.push(...antidiagBalls);

        if (finalDeletedBalls.length == 0) return;
        console.log("tablica usunietych kulek:", finalDeletedBalls);

        return finalDeletedBalls.filter((ball, index) => finalDeletedBalls.indexOf(ball) === index);
        // let's see!
    }

    setBalls = (balls: Ball[]) => {
        this.balls = balls;
    }
}