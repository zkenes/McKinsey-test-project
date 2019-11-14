export class Graph {
    constructor() {
        this.adjacencyMap = new Map();
    }
    addEdge(sourceNode, destNode, weight) {
        if (!this.adjacencyMap.get(sourceNode.id)) {
            this.adjacencyMap.set(sourceNode.id, []);
        }
        const edge = new Edge(destNode, weight);
        this.adjacencyMap.get(sourceNode.id).push(edge);
    }
}
export class Node {
    constructor(id) {
        this.id = id;
    }
}
export class Edge {
    constructor(destNode, weight) {
        this.destNode = destNode;
        this.weight = weight;
    }
}