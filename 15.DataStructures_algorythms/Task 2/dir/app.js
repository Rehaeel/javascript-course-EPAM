import { Graph } from "./graph.js";
const graph = new Graph();
graph.printMatrix();
const addVertexForm = document
    .getElementById("navigation")
    .querySelectorAll("form")[0];
const addEdgeForm = document
    .getElementById("navigation")
    .querySelectorAll("form")[1];
const calculatePathForm = document
    .getElementById("navigation")
    .querySelectorAll("form")[2];
addVertexForm.addEventListener("submit", (e) => {
    e.preventDefault();
    graph.addVertex(graph.size);
    addEdgeForm.querySelectorAll("input")[0].focus();
});
addEdgeForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const vert1 = addEdgeForm.querySelectorAll("input")[0];
    const vert2 = addEdgeForm.querySelectorAll("input")[1];
    const weight = addEdgeForm.querySelectorAll("input")[2];
    graph.addEdge(+vert1.value, +vert2.value, +weight.value);
    addEdgeForm.reset();
    vert1.focus();
});
calculatePathForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const vert = calculatePathForm.querySelector("input");
    const output = document.getElementById("output");
    output.innerHTML = graph.calculatePath(+vert.value);
});
