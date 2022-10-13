import { Indexes, Point } from "./Indexes.js";

export default class Pathfinder {
    static COLLISION_VALUE = -1;
    private table: number[][];
    private helperArray: Point[] = [];
    private sum = 0;
    private sums: number[] = [];
    constructor(table: number[][]) {
        this.table = table;
    }

    findPath = (startPoint: Indexes, weight: number, endPoint: Indexes): Point => {
        const shortestWay = this.getShortestWay(startPoint, endPoint);
        while (shortestWay != this.sum) {
            // mamy punkt
            const point = new Point(startPoint);
            // sprawdzamy, czy obok jest wolne pole
            const newPoint = this.getRandomNeighborPoint(point);

            this.helperArray.push(newPoint);
            if (this.getPointValue(newPoint) <= 1 + this.getPointValue(point)) {
                this.sum += weight;
            }

            this.setPointValue(newPoint, this.getPointValue(point));

            // jeśli jest wolny, wybieramy go jako następny punkt
            // jeśli nie, wybieramy kolejny
            // sprawdzamy, czy punkt był sprawdzany
            // sprawdzamy czy jest w obrębie tablicy
            if (this.compare(newPoint, new Point(endPoint))) {
                this.sums.push(this.sum);
                this.sum = 0;
                console.log(this.sums);
                console.log(this.helperArray);

                return newPoint;
            } else {
                return this.findPath(newPoint, 1, endPoint);
            }
        }
    }

    getRandomNeighborPoint = (point: Point) => {
        const newPoint = new Point(point);
        const randomAxis = Math.random();
        const randomDirection = Math.random();

        if (randomAxis < 0.5)
            if (randomDirection < 0.5)
                newPoint.x++;
            else
                newPoint.x--;
        else
            if (randomDirection < 0.5)
                newPoint.y++;
            else
                newPoint.y--;

        // sprawdzenie, czy jest w granicach tablicy
        if (!this.checkBoundaries(newPoint) ||
            // sprawdzenie, czy juz przez niego przechodziliśmy
            this.wasChecked(newPoint) ||
            // sprawdzenie, czy nie ma tam przypadkiem kulki (-1 w tablicy)
            this.getPointValue(newPoint) === Pathfinder.COLLISION_VALUE)
            return this.getRandomNeighborPoint(point);

        return newPoint;
    }

    checkBoundaries = (point: Point) => {
        return (point.x < this.table.length && point.x >= 0 && point.y < this.table[0].length && point.y >= 0)
    }

    wasChecked = (checkedPoint: Point) => {
        if (this.helperArray.find((point: Point) => { point.x === checkedPoint.x && point.y === checkedPoint.y }))
            return true;
        return false;
    }

    compare = (point: Point, point2: Point) => {
        console.log(point.x === point2.x && point.y === point2.y);

        return point.x === point2.x && point.y === point2.y;
    }

    getShortestWay = (pointA: Point, pointB: Point): number => {
        const point: Indexes = {
            x: Math.abs(pointA.x - pointB.x),
            y: Math.abs(pointA.y - pointB.y)
        }

        return point.x + point.y;
    }

    getPointValue = (point: Point) => {
        return this.table[point.x][point.y];
    }

    setPointValue = (point: Point, value: number) => {
        this.table[point.x][point.y] = value + 1;
    }
}