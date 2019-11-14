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
    printGraph() {
        var keys = this.adjacencyMap.keys();

        // iterate over the vertices
        for (var key of keys) {
            // great the corresponding adjacency list
            // for the vertex
            var nodes = this.adjacencyMap.get(key).map(e => e.destNode.id);
            var conc = "";

            // iterate over the adjacency list
            // concatenate the values into a string
            for (var j of nodes)
                conc += j + " ";

            // print the vertex and its adjacency list
            console.log(i + " -> " + conc);
        }
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