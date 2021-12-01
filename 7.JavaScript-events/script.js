"use strict";

const grid = document.getElementById("root");
let dragStartIndex;

for (let i = 0; i < 100; i++) {
    const newContainer = document.createElement("div");
    newContainer.classList.add("container");
    newContainer.setAttribute("data-drag-index", i + 1);

    const newDiv = document.createElement("div");
    newContainer.appendChild(newDiv);
    newDiv.classList.add("table-element");
    newDiv.classList.add("draggable");
    newDiv.setAttribute("draggable", true);
    grid.appendChild(newContainer);

    const newNumb = document.createElement("p");
    newNumb.textContent = i + 1;
    newDiv.appendChild(newNumb);

    // click comparison ...1
    newDiv.addEventListener(
        "mousedown",
        function (e) {
            const counterStart = e.timeStamp;
            e.target.addEventListener(
                "mouseup",
                function (f) {
                    const duration = Math.round(f.timeStamp - counterStart);
                    console.log(`Direct click: ${duration}ms`);
                },
                false
            );
        },
        false
    );
}

// click comparison ...2
grid.addEventListener("mousedown", function onDrag(e) {
    const targetEl = e.target;
    const counterStart = e.timeStamp;

    targetEl.addEventListener(
        "mouseup",
        function mouseOut(f) {
            const duration = Math.round(f.timeStamp - counterStart);
            console.log(`Delegation: ${duration}ms`);
            console.log("-----------------------");

            targetEl.removeEventListener("mouseup", mouseOut, false);
        },
        false
    );
});

// Drag&Drop

const listItems = document.querySelectorAll(".container");

listItems.forEach((draggable) => {
    function dragStart() {
        dragStartIndex = draggable
            .closest("div")
            .getAttribute("data-drag-index");
    }

    function dragOver(e) {
        e.preventDefault();
    }

    function dragDrop() {
        const dragEndIndex = this.getAttribute("data-drag-index");
        swapItems(dragStartIndex, dragEndIndex);

        this.classList.remove("over");
    }

    function swapItems(startIndex, endIndex) {
        const itemOne = listItems[startIndex - 1].querySelector(".draggable");
        const itemTwo = listItems[endIndex - 1].querySelector(".draggable");

        // console.log(itemOne, itemTwo);
        listItems[startIndex - 1].appendChild(itemTwo);
        listItems[endIndex - 1].appendChild(itemOne);

        if (itemOne.classList.contains("changed-from")) {
            itemOne.classList.remove("changed-from");
            itemOne.classList.add("changed-to");
        } else {
            itemOne.classList.add("changed-to");
        }
        if (itemTwo.classList.contains("changed-to")) {
            itemTwo.classList.remove("changed-to");
            itemTwo.classList.add("changed-from");
        } else {
            itemTwo.classList.add("changed-from");
        }
    }

    function dragEnter() {
        this.classList.add("over");
    }

    function dragLeave() {
        this.classList.remove("over");
    }

    draggable.addEventListener("dragstart", dragStart, false);
    draggable.addEventListener("dragover", dragOver, false);
    draggable.addEventListener("drop", dragDrop, false);
    draggable.addEventListener("dragenter", dragEnter, false);
    draggable.addEventListener("dragleave", dragLeave, false);
});
