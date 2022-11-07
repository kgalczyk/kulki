import { Indexes } from "./Indexes";

interface Neighbors {
    up: Indexes,
    down: Indexes,
    right: Indexes,
    left: Indexes
}

export type Path = Indexes[];

class Node {
    public parent: Node;
    public x: number;
    public y: number;
    public numericValue: number;
    public visited: boolean;;
    public path: Path; // Indexes[]
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.visited = false;
        this.path = [];
    }
}

export default class Pathfinder {
    private graph: number[][];
    private queue: Node[];
    private nodes: Node[][] = [];
    private visitedNodes: string[] = [];
    private readonly xDirections: number[] = [-1, 0, 1, 0];
    private readonly yDirections: number[] = [0, 1, 0, -1];
    constructor(graph: number[][]) {
        this.graph = graph;
        this.nodes = [];
        this.queue = [];
        for (let i = 0; i < this.graph.length; i++) {
            this.nodes[i] = [];
            for (let j = 0; j < this.graph.length; j++) {
                this.nodes[i][j] = new Node(i, j);
                // this.findNeighbors(this.nodes[i][j]);
                if (this.graph[i][j] == -1) this.nodes[i][j].numericValue = -1;
                else this.nodes[i][j].numericValue = 0;
            }
        }
    }

    clearNodes = () => {
        for (let i = 0; i < this.graph.length; i++) {
            for (let j = 0; j < this.graph.length; j++) {
                const node = this.nodes[i][j];
                node.visited = false;
                node.path = [];
                // this.findNeighbors(this.nodes[i][j]);
                if (this.graph[i][j] == -1) this.nodes[i][j].numericValue = -1;
                else this.nodes[i][j].numericValue = 0;
            }
        }
    }


    findShortestPath = (sourceIndexes: Indexes, endIndexes: Indexes): Path => {
        const { x, y } = sourceIndexes;
        let startNode: Node = this.nodes[x][y];
        startNode.parent = startNode;
        startNode.visited = true;

        if (x == endIndexes.x && y == endIndexes.y) return [];
        this.visitedNodes = [];
        this.queue = [];
        this.queue.push(startNode);
        while (this.queue.length > 0) {
            let currentNode = this.queue[0];

            this.visitNode(currentNode);
            this.queue.shift();
            if (currentNode.x == endIndexes.x && currentNode.y == endIndexes.y) {
                currentNode.path.push({ x: currentNode.x, y: currentNode.y });
                this.colorDivs(currentNode.path);
                return currentNode.path;
            };
            for (let i = 0; i < this.xDirections.length; i++) {
                let adjacentX = currentNode.x + this.xDirections[i];
                let adjacentY = currentNode.y + this.yDirections[i];
                if (this.isValid(adjacentX, adjacentY)) {
                    this.queue.push(this.nodes[adjacentX][adjacentY]);
                    this.nodes[adjacentX][adjacentY].parent = currentNode;
                }
            }
        }
        this.colorDivs(this.nodes[endIndexes.x][endIndexes.y].path);
        this.clearNodes();
        return [];
    }

    visitNode = (node: Node): void => {
        let x = node.x;
        let y = node.y;
        let parent = node.parent;
        if (node.visited) return;
        node.visited = true;
        this.visitedNodes.push(x + "_" + y);
        let path = parent.path;
        if (parent.x == x && parent.y == y) return;
        // do ścieżki poprzednika dorzucamy jego indeksy indeksy 
        path.push({ x: parent.x, y: parent.y });
        node.path.push(...path);
    }

    colorDivs = (path: Path) => {
        for (let x = 0; x < this.graph.length; x++) {
            for (let y = 0; y < this.graph.length; y++) {
                const div = document.getElementById(x + "_" + y);
                div.style.backgroundColor = "white";
                let index = path.find((elem) => { return elem.x == x && elem.y == y });
                if (index) div.style.backgroundColor = "red";
            }
        }

        // for (let x = 0; x < this.graph.length; x++) {
        //     for (let y = 0; y < this.graph.length; y++) {
        //         const div = document.getElementById(x + "_" + y);
        //         let visited = this.visitedNodes.find(node => node == x + "_" + y);
        //         if (visited) div.style.backgroundColor = "green";
        //         let index = path.find((elem) => { return elem.x == x && elem.y == y });
        //         if (index) div.style.backgroundColor = "red";
        //     }
        // }
    }

    isValid = (x: number, y: number): boolean => {
        if (x < 0 || y < 0 || x >= this.graph.length || y >= this.graph[0].length) return false;
        if (this.nodes[x][y].visited) return false;
        if (this.nodes[x][y].numericValue == -1) return false;
        return true;
    }
} 