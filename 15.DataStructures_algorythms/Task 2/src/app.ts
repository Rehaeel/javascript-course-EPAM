import { Graph } from "./graph.js";

const graph = new Graph();
graph.printMatrix();

const addVertexForm: HTMLFormElement = document
    .getElementById("navigation")
    .querySelectorAll("form")[0];
const addEdgeForm: HTMLFormElement = document
    .getElementById("navigation")
    .querySelectorAll("form")[1];
const calculatePathForm: HTMLFormElement = document
    .getElementById("navigation")
    .querySelectorAll("form")[2];

addVertexForm.addEventListener("submit", (e) => {
    e.preventDefault();
    graph.addVertex(graph.size);
    addEdgeForm.querySelectorAll("input")[0].focus();
});

addEdgeForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const vert1: HTMLInputElement = addEdgeForm.querySelectorAll("input")[0];
    const vert2: HTMLInputElement = addEdgeForm.querySelectorAll("input")[1];
    const weight: HTMLInputElement = addEdgeForm.querySelectorAll("input")[2];

    graph.addEdge(+vert1.value, +vert2.value, +weight.value);

    addEdgeForm.reset();
    vert1.focus();
});

calculatePathForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const vert: HTMLInputElement = calculatePathForm.querySelector("input");
    const output: HTMLElement = document.getElementById("output");

    output.innerHTML = graph.calculatePath(+vert.value);
});
