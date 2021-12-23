export class Graph {
    constructor(size = 1) {
        this.size = size;
        this.vertexList = [];
        for (let i = 0; i < size; i++) {
            this.vertexList.push(i);
        }
        this.matrix = [];
        for (let i = 0; i < size; i++) {
            this.matrix.push([]);
            for (let j = 0; j < size; j++) {
                this.matrix[i][j] = Infinity;
            }
        }
        this.output = document.getElementById("output");
    }
    throwError(errorText) {
        this.output.innerHTML = errorText;
        this.output.style.backgroundColor = "red";
        this.output.style.color = "#fff";
        setTimeout(() => {
            this.output.style.backgroundColor = "transparent";
            this.output.style.color = "#000";
            this.output.innerHTML = "";
        }, 5000);
    }
    addVertex(vertexName) {
        const isInitState = this.output.innerHTML === "Add new Vertex";
        const isMoreVertexThanTen = this.size >= 10;
        if (isInitState)
            this.output.innerHTML = "";
        if (isMoreVertexThanTen) {
            this.throwError("Limit of Vertex's reached!");
            return;
        }
        const isLessThanZero = vertexName < 0;
        const isNotANumber = typeof vertexName !== "number";
        if (isLessThanZero && isNotANumber)
            this.throwError("Vertex name must be positive numeber.");
        this.size++;
        this.vertexList.push(vertexName);
        this.matrix.push([]);
        for (let i = 0; i < this.size; i++) {
            this.matrix[this.size - 1][i] = Infinity;
            this.matrix[i][this.size - 1] = Infinity;
        }
        this.printMatrix();
    }
    addEdge(vertex1, vertex2, weight = 1) {
        if (!this.vertexList.includes(vertex1)) {
            this.throwError("No such vertex: Vertex1.");
        }
        else if (!this.vertexList.includes(vertex2)) {
            this.throwError("No such vertex: Vertex2.");
        }
        else if (vertex1 === vertex2) {
            this.throwError("no edge from the same vertex");
        }
        else {
            this.matrix[vertex1][vertex2] = weight;
            this.matrix[vertex2][vertex1] = weight;
        }
        this.printMatrix();
    }
    printMatrix() {
        const table = document.getElementById("table");
        table.style.gridTemplateRows = `repeat(${this.size + 1}, 1fr)`;
        table.innerHTML = "";
        function changeIfInfinity(number) {
            if (number === Infinity)
                return "-";
            else
                return number;
        }
        for (let i = 0; i < this.size + 1; i++) {
            const currentRow = document.createElement("tr");
            currentRow.classList.add("row");
            currentRow.style.gridTemplateColumns = `repeat(${this.size + 1}, 1fr)`;
            for (let j = 0; j < this.size + 1; j++) {
                const isFirstColumn = j === 0;
                const isFirstRow = i === 0;
                const currentCell = document.createElement("td");
                currentCell.classList.add("cell");
                if (isFirstRow && isFirstColumn) {
                    currentCell.classList.add("blank");
                }
                else if (isFirstRow) {
                    currentCell.classList.add("header");
                    currentCell.innerHTML = `${this.vertexList[j - 1]}`;
                }
                else if (isFirstColumn) {
                    currentCell.classList.add("header");
                    currentCell.innerHTML = `${this.vertexList[i - 1]}`;
                }
                else {
                    const vertexNumber = changeIfInfinity(this.matrix[i - 1][j - 1]);
                    currentCell.innerHTML = `${vertexNumber}`;
                }
                currentRow.appendChild(currentCell);
            }
            table.appendChild(currentRow);
        }
    }
    minVertex(value, processed) {
        let minimum = Infinity;
        let vertex;
        for (let i = 0; i < this.size; i++) {
            if (processed[i] === false && value[i] < minimum) {
                vertex = i;
                minimum = value[i];
            }
        }
        return vertex;
    }
    calculatePath(startingVertex) {
        if (startingVertex === undefined)
            this.throwError("Enter the Vertex.");
        if (startingVertex + 1 > this.size)
            this.throwError("No such Vertex");
        const indexOfVertex = this.vertexList.indexOf(startingVertex);
        let parent = new Array(this.size).fill(-1);
        let value = new Array(this.size).fill(Infinity);
        value[indexOfVertex] = 0;
        let processed = new Array(this.size).fill(false);
        for (let i = 0; i < this.size - 1; i++) {
            const currentVertex = this.minVertex(value, processed);
            processed[currentVertex] = true;
            for (let j = 0; j < this.size; j++) {
                const isEdgePresent = this.matrix[currentVertex][j] !== Infinity;
                const isNotProcessed = processed[j] === false;
                const isValueNotInfinite = value[currentVertex] !== Infinity;
                const isLowerWeight = value[currentVertex] + this.matrix[currentVertex][j] <
                    value[j];
                if (!isEdgePresent)
                    this.throwError(`No such edge in Vertex ${currentVertex} present`);
                else if (isEdgePresent &&
                    isNotProcessed &&
                    isValueNotInfinite &&
                    isLowerWeight) {
                    value[j] =
                        value[currentVertex] + this.matrix[currentVertex][j];
                    parent[j] = currentVertex;
                }
            }
        }
        return `From Vertex: ${startingVertex}\n${value.reduce((acc, weight, index) => {
            if (index === indexOfVertex)
                return acc;
            else
                return (acc += `Vertex(${this.vertexList[index]}) - weight(${weight})\n`);
        }, "")}`;
    }
}
