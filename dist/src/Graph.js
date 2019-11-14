"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Graph = exports.Graph = function () {
    function Graph() {
        _classCallCheck(this, Graph);

        this.adjacencyMap = new Map();
    }

    _createClass(Graph, [{
        key: "addEdge",
        value: function addEdge(sourceNode, destNode, weight) {
            if (!this.adjacencyMap.has(sourceNode)) {
                this.adjacencyMap.set(sourceNode, []);
            }
            var edge = new Edge(destNode, weight);
            this.adjacencyMap.get(sourceNode).push(edge);
        }
    }, {
        key: "getWeight",
        value: function getWeight(src, dest) {
            if (!this.adjacencyMap.has(src) || !this.adjacencyMap.get(src).find(function (edge) {
                return edge.destNode === dest;
            })) {
                return -1;
            }
            var edge = this.adjacencyMap.get(src).find(function (edge) {
                return edge.destNode === dest;
            });
            return edge.weight;
        }
    }, {
        key: "distance",
        value: function distance(stops) {
            var distance = 0;
            for (var i = 0; i < stops.length - 1; i++) {
                var weight = this.getWeight(stops[i], stops[i + 1]);
                if (weight === -1) {
                    return weight;
                }
                distance += weight;
            }
            return distance;
        }
    }, {
        key: "trips",
        value: function trips(src, dst, limit, condition) {
            var _this = this;

            var paths = [];
            var childNodes = this.adjacencyMap.get(src).map(function (edges) {
                return edges.destNode;
            });
            childNodes.forEach(function (node) {
                return _this.allTrips(node, dst, limit, paths, [src]);
            });
            console.log("Path", paths);
            return paths.filter(function (path) {
                return condition(path);
            });
        }
    }, {
        key: "allTrips",
        value: function allTrips(src, dst, limit, paths, path) {
            var _this2 = this;

            var pathCopy = [];
            Object.assign(pathCopy, path);

            if (src == dst) {
                path.push(src);
                paths.push(path);
            }
            if (path.length >= limit) {
                return;
            } else {
                pathCopy.push(src);
                this.adjacencyMap.get(src).map(function (edge) {
                    return edge.destNode;
                }).forEach(function (node) {
                    var copy = [];
                    Object.assign(copy, pathCopy);
                    _this2.allTrips(node, dst, limit, paths, copy);
                });
            }
        }
    }, {
        key: "shortestPath",
        value: function shortestPath(src, dst) {
            var _this3 = this;

            var map = {};
            var visited = {};
            this.adjacencyMap.forEach(function (_, key) {
                map[key] = Number.MAX_SAFE_INTEGER;
                visited[key] = false;
            });

            var queue = [];
            queue.push(src);
            map[src] = 0;

            var _loop = function _loop() {
                var node = queue.pop();
                var start = map[node];
                visited[node] = true;
                var edges = _this3.adjacencyMap.get(node);
                edges.forEach(function (edge) {
                    if (visited[edge.destNode] == false) {
                        queue.push(edge.destNode);
                    }
                    var weight = edge.weight;
                    var dest = map[edge.destNode];
                    if (dest > weight + start) {
                        map[edge.destNode] = weight + start;
                    }
                });
            };

            while (queue.length > 0) {
                _loop();
            }
            return map[dst];
        }
    }, {
        key: "print",
        value: function print() {
            this.adjacencyMap.forEach(function (list, key) {
                console.log(key + ":");
                list.forEach(function (edge) {
                    console.log("--> " + edge.destNode + " (" + edge.weight + ")");
                });
            });
        }
    }]);

    return Graph;
}();
// export class Node {
//     constructor(id) {
//         this.id = id;
//     }
//     toString() {
//         return this.id;
//     }
// }


var Edge = exports.Edge = function () {
    function Edge(destNode, weight) {
        _classCallCheck(this, Edge);

        this.destNode = destNode;
        this.weight = weight;
    }

    _createClass(Edge, [{
        key: "toString",
        value: function toString() {
            return this.destNode + " - " + this.weight;
        }
    }]);

    return Edge;
}();