export default class Pathfinder {
    graph: number[][];
    source: number;

    constructor(graph: number[][]) {
        this.graph = graph;
        console.log(this.graph.length);
    }

    getShortestPath = () => {
        const count = this.graph.length;
        const visitedVertex: boolean[] = []; // o dlugosci count
        const distance: number[] = []; // o dlugosci count

        for (let i = 0; i < count; i++) {
            visitedVertex[i] = false;
            distance[i] = Number.POSITIVE_INFINITY;
        }

        distance[this.source] = 0;

        for (let i = 0; i < count; i++) {
            const minimalDistance = this.getMinimalDistance(distance, visitedVertex);
            visitedVertex[minimalDistance] = true;

            for (let j = 0; j < count; j++) {
                if (!visitedVertex[j] && this.graph[i][j] != 0 && (distance[i] + this.graph[i][j] < distance[j])) {
                    distance[j] = distance[i] + this.graph[i][j];
                }
            }
        }

        for (let i = 0; i < distance.length; i++) {
            console.log(distance[i]);
        }
    }

    getMinimalDistance = (distance: number[], visitedVertex: boolean[]): number => {
        let minimalDistance = Number.MAX_VALUE;
        let minimalDistanceVertex = -1;
        for (let i = 0; i < distance.length; i++) {
            if (!visitedVertex[i] && distance[i] < minimalDistance) {
                minimalDistance = distance[i];
                minimalDistanceVertex = i;
            }
        }

        return minimalDistanceVertex;
    }
}

/*export default class Pathfinder {
    static COLLISION_VALUE = -1;
    private table: number[][];
    private helperArray: Point[] = [];
    constructor(table: number[][]) {
        this.table = table;
    }

    findPath = (startPoint: Indexes, weight: number, endPoint: Indexes) => {
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
        return point.x === point2.x && point.y === point2.y;
    }

    getPointValue = (point: Point) => {
        return this.table[point.x][point.y];
    }

    setPointValue = (point: Point, value: number) => {
        this.table[point.x][point.y] = value + 1;
    }
}*/