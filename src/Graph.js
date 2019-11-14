export class Graph {
    constructor() {
        this.adjacencyMap = new Map();
    }
    addEdge(sourceNode, destNode, weight) {
        if (!this.adjacencyMap.has(sourceNode)) {
            this.adjacencyMap.set(sourceNode, []);
        }
        const edge = new Edge(destNode, weight);
        this.adjacencyMap
            .get(sourceNode)
            .push(edge);
    }

    getWeight(src, dest) {
        if (!this.adjacencyMap.has(src) ||
            !this.adjacencyMap.get(src).find(edge => edge.destNode === dest)
        ) {
            return -1;
        }
        const edge = this.adjacencyMap
            .get(src)
            .find(edge => edge.destNode === dest);
        return edge.weight;
    }

    distance(stops) {
        let distance = 0;
        for (var i = 0; i < stops.length - 1; i++) {
            const weight = this.getWeight(stops[i], stops[i + 1]);
            if (weight === -1) { return weight }
            distance += weight;
        }
        return distance;
    }

    tripsByStopLimit(src, dst, limit, condition) {
        const paths = [];
        const childNodes = this.adjacencyMap
            .get(src)
            .map(edges => edges.destNode);
        childNodes.forEach(node => this.allTripsByStopsLimit(node, dst, limit, paths, [src]));
        return paths.filter(path => condition(path));
    }

    allTripsByStopsLimit(src, dst, limit, paths, path) {
        const pathCopy = [];
        Object.assign(pathCopy, path);
        if (src == dst) {
            path.push(src);
            paths.push(path);
        }
        if (path.length >= limit) {
            return;
        } else {
            pathCopy.push(src);
            this.adjacencyMap
                .get(src)
                .map(edge => edge.destNode)
                .forEach(node => {
                    const copy = [];
                    Object.assign(copy, pathCopy);
                    this.allTripsByStopsLimit(node, dst, limit, paths, copy);
                });
        }
    }

    //--------------------
    tripsByDistanceLimit(src, dst, limit, condition) {
        const paths = [];
        const childNodes = this.adjacencyMap
            .get(src)
            .map(edges => edges.destNode);
        childNodes.forEach(node => this.allTripsByDistanceLimit(node, dst, limit, paths, [src]));
        return paths.filter(path => condition(path));
    }

    allTripsByDistanceLimit(src, dst, limit, paths, path) {
        const pathCopy = [];
        Object.assign(pathCopy, path);
        if (src == dst) {
            path.push(src);
            paths.push(path);
        }
        if (this.distance(path) >= limit) {
            return;
        } else {
            pathCopy.push(src);
            this.adjacencyMap
                .get(src)
                .map(edge => edge.destNode)
                .forEach(node => {
                    const copy = [];
                    Object.assign(copy, pathCopy);
                    this.allTripsByDistanceLimit(node, dst, limit, paths, copy);
                });
        }
    }

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
export class Edge {
    constructor(destNode, weight) {
        this.destNode = destNode;
        this.weight = weight;
    }
    toString() {
        return `${this.destNode} - ${this.weight}`
    }
}