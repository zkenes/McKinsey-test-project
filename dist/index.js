"use strict";

var _Graph = require("./src/Graph");

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var filename = "input.txt";
var contents = _fs2.default.readFileSync(filename, 'utf8');

var edges = contents.split(", ");

var graph = new _Graph.Graph();
edges.forEach(function (edge) {
    var srcNode = edge.substr(0, 1);
    var dstNode = edge.substr(1, 1);
    var weight = parseInt(edge.substr(2, 1));
    graph.addEdge(srcNode, dstNode, weight);
});
// graph.print();

var noSuchRoad = 'NO SUCH ROUTE';
// 1. The distance of the route A-B-C.
var distance = graph.distance(['A', 'B', 'C']);
console.log("1. ", distance > 0 ? distance : noSuchRoad);

// 2. The distance of the route A-D.
distance = graph.distance(['A', 'D']);
console.log("2. ", distance > 0 ? distance : noSuchRoad);

// 3. The distance of the route A-D-C.
distance = graph.distance(['A', 'D', 'C']);
console.log("3. ", distance > 0 ? distance : noSuchRoad);

// 4. The distance of the route A-E-B-C-D.
distance = graph.distance(['A', 'E', 'B', 'C', 'D']);
console.log("4. ", distance > 0 ? distance : noSuchRoad);

// 5. The distance of the route A-E-D.
distance = graph.distance(['A', 'E', 'D']);
console.log("5. ", distance > 0 ? distance : noSuchRoad);

// 6. The number of trips starting at C and ending at C with a maximum of 3 stops.  In the sample data below, there are two such trips: C-D-C (2 stops). and C-E-B-C (3 stops).
var paths = graph.tripsByStopLimit('C', 'C', 4, function (trip) {
    return trip.length - 1 <= 3;
});
console.log("6. ", paths.length);
// // 7. The number of trips starting at A and ending at C with exactly 4 stops.  In the sample data below, there are three such trips: A to C (via B,C,D); A to C (via D,C,D); and A to C (via D,E,B).
paths = graph.tripsByStopLimit('A', 'C', 5, function (trip) {
    return trip.length == 5;
});
console.log("7. ", paths.length);

// 8. The length of the shortest route (in terms of distance to travel) from A to C.
distance = graph.shortestPath('A', 'C');
console.log("8. ", distance);

// 9. The length of the shortest route (in terms of distance to travel) from B to B.
distance = graph.shortestPath('A', 'C');
console.log("9. ", distance);

// 10.The number of different routes from C to C with a distance of less than 30.  In the sample data, the trips are: CDC, CEBC, CEBCDC, CDCEBC, CDEBC, CEBCEBC, CEBCEBCEBC.
paths = graph.tripsByDistanceLimit('C', 'C', 30, function (trip) {
    return graph.distance(trip) < 30;
});

console.log("10. ", paths.length);