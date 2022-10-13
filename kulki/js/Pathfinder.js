import { Point } from "../js/Indexes.js";
export default class Pathfinder {
    constructor(table) {
        this.helperArray = [];
        this.findPath = (startPoint, weight, endPoint) => {
            // mamy punkt
            const point = new Point(startPoint);
            // sprawdzamy, czy obok jest wolne pole
            const newPoint = this.getRandomNeighborPoint(point);
            this.helperArray.push(newPoint);
            if (this.getPointValue(newPoint) > 1 + this.getPointValue(point)) {
            }
            this.setPointValue(newPoint, this.getPointValue(point));
            console.log(this.table);
            // jeśli jest wolny, wybieramy go jako następny punkt
            // jeśli nie, wybieramy kolejny
            // sprawdzamy, czy punkt był sprawdzany
            // sprawdzamy czy jest w obrębie tablicy
            if (this.compare(newPoint, new Point(endPoint))) {
                return;
            }
        };
        this.getRandomNeighborPoint = (point) => {
            const newPoint = new Point(point);
            const randomAxis = Math.random();
            const randomDirection = Math.random();
            if (randomAxis < 0.5)
                if (randomDirection < 0.5)
                    newPoint.x++;
                else
                    newPoint.x--;
            else if (randomDirection < 0.5)
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
        };
        this.checkBoundaries = (point) => {
            return (point.x < this.table.length && point.x >= 0 && point.y < this.table[0].length && point.y >= 0);
        };
        this.wasChecked = (checkedPoint) => {
            if (this.helperArray.find((point) => { point.x === checkedPoint.x && point.y === checkedPoint.y; }))
                return true;
            return false;
        };
        this.compare = (point, point2) => {
            return point.x === point2.x && point.y === point2.y;
        };
        this.getPointValue = (point) => {
            return this.table[point.x][point.y];
        };
        this.setPointValue = (point, value) => {
            this.table[point.x][point.y] = value + 1;
        };
        this.table = table;
    }
}
Pathfinder.COLLISION_VALUE = -1;
