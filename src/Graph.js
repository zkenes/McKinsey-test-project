export class Graph {
    constructor() {
        this.adjacencyMap = new Map();
    }

    /**
     * Add adjacency node to source node with weight
     *
     * @param {string} sourceNode - initial node
     * @param {string} destNode - destination node
     * @param {number} weight - weight of edge
     * @memberof Graph
     */
    addEdge(sourceNode, destNode, weight) {
        // Check if there is a source node
        if (!this.adjacencyMap.has(sourceNode)) {
            // If not, set initial value for this node
            this.adjacencyMap.set(sourceNode, []);
        }
        // Create a directed edge from source node to destination node
        const edge = new Edge(destNode, weight);
        // Push value to adjacencyMap
        this.adjacencyMap
            .get(sourceNode)
            .push(edge);
    }

    /**
     * Get weight between 2 nodes
     *
     * @param {string} src - source node
     * @param {string} dest - destination node
     * @returns a positive number if there is an edge between 2 nodes, -1 otherwise
     * @memberof Graph
     */
    getWeight(src, dest) {
        // Check if src node has an edge to dest node
        if (!this.adjacencyMap.has(src) ||
            !this.adjacencyMap.get(src).find(edge => edge.destNode === dest)
        ) {
            // No edge or route
            return -1;
        }
        // Get the edge between src and dest
        const edge = this.adjacencyMap
            .get(src)
            .find(edge => edge.destNode === dest);
        // return weight of edge
        return edge.weight;
    }

    /**
     * Get distance of trip (route)
     *
     * @param {[string]} stops - an array of nodes (strings)
     * @returns a positive number if there is an route between 2 nodes, -1 otherwise
     * @memberof Graph
     */
    distance(stops) {
        let distance = 0;
        for (var i = 0; i < stops.length - 1; i++) {
            const weight = this.getWeight(stops[i], stops[i + 1]);
            if (weight === -1) { return weight }
            distance += weight;
        }
        return distance;
    }

    /**
     * Get all possible paths between 2 nodes while condition is met
     * (note: each node can be visited one or more times)
     *
     * @param {string} src - source node
     * @param {string} dst - destination node
     * @param {function} condition - check each route for condition (route = array of strings (nodes))
     * @returns {[[string]]} - an array of routes filtered by condition
     * @memberof Graph
     */
    trips(src, dst, condition) {
        // Create an array of routes
        const paths = [];
        // Get all child nodes of src node
        const childNodes = this.adjacencyMap
            .get(src)
            .map(edges => edges.destNode);
        // Run allTrips for each child node
        childNodes.forEach(node => this.allTrips(node, dst, paths, [src], condition));
        // Return filtered results
        return paths.filter(p => condition(p));
    }

    /**
     * Get all possible routes between src => dst, stores routes in paths array
     *
     * @param {string} src
     * @param {string} dst
     * @param {[[string]]} paths
     * @param {[string]} path
     * @param {function} condition
     * @memberof Graph
     */
    allTrips(src, dst, paths, path, condition) {
        const pathCopy = [];
        Object.assign(pathCopy, path);

        if (!condition(path)) {
            return;
        }
        if (src == dst) {
            path.push(src);
            paths.push(path);
        }
        pathCopy.push(src);
        this.adjacencyMap
            .get(src)
            .map(edge => edge.destNode)
            .forEach(node => {
                const copy = [];
                Object.assign(copy, pathCopy);
                this.allTrips(node, dst, paths, copy, condition);
            });
    }

    /**
     * Finds shortest distance between 2 nodes
     *
     * @param {string} src - source node
     * @param {string} dst - destination node
     * @returns shortest distance between 2 nodes
     * @memberof Graph
     */
    shortestDistance(src, dst) {
        // Check src and dst equality
        // If they are equal `shortestPath` function will return 0
        if (src == dst) {
            // Create a dict where we will store weights
            const map = {};
            // Get child nodes and calculate `shortestPath` from childs to src node
            this.adjacencyMap
                .get(src)
                .forEach(edge => {
                    map[edge.destNode] = edge.weight + this.shortestPath(edge.destNode, dst);
                });
            // Get values from dict, then sort and return min value
            return Object.values(map)
                .sort()[0];
        } else {
            // If src and dst are not equal, then just call `shortestPath` function
            return this.shortestPath(src, dst);
        }
    }

    /**
     * Simple realization of Dijkstra algorithm
     *
     * @param {string} src
     * @param {string} dst
     * @returns shortest path distance
     * @memberof Graph
     */
    shortestPath(src, dst) {
        const map = {};
        const visited = {};
        this.adjacencyMap.forEach((_, key) => {
            map[key] = Number.MAX_SAFE_INTEGER;
            visited[key] = false;
        })

        const queue = [];
        queue.push(src);
        map[src] = 0;

        while (queue.length > 0) {
            const node = queue.pop();
            const start = map[node];
            visited[node] = true;
            const edges = this.adjacencyMap.get(node);
            edges.forEach(edge => {
                if (visited[edge.destNode] == false) {
                    queue.push(edge.destNode);
                }
                const weight = edge.weight;
                const dest = map[edge.destNode];
                if (dest > (weight + start)) {
                    map[edge.destNode] = (weight + start);
                }
            });
        }
        return map[dst];
    }

    // Just prints a graph, debug purpose only
    print() {
        this.adjacencyMap.forEach((list, key) => {
            console.log(`${key}:`)
            list.forEach(edge => {
                console.log(`--> ${edge.destNode} (${edge.weight})`)
            });
        })
    }
}
// export class Node {
//     constructor(id) {
//         this.id = id;
//     }
//     toString() {
//         return this.id;
//     }
// }


// Class to store destination and weight
export class Edge {
    constructor(destNode, weight) {
        this.destNode = destNode;
        this.weight = weight;
    }
    toString() {
        return `${this.destNode} - ${this.weight}`
    }
}