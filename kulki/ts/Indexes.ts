export type Indexes = {
    x: number,
    y: number
}

export class Point {
    x: number;
    y: number;
    constructor(indexes: Indexes) {
        this.x = indexes.x;
        this.y = indexes.y;
    }
}