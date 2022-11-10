export type Indexes = {
    x: number,
    y: number
}

/** @deprecated xd I don't know why it takes space on my disk and on Github. I don't also know why i comment this class*/
export class Point {
    x: number;
    y: number;
    constructor(indexes: Indexes) {
        this.x = indexes.x;
        this.y = indexes.y;
    }
}