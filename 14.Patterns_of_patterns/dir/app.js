import { ViewA, ViewB } from "./view.js";
export class ModelA {
    constructor() { }
    static instance() {
        if (!ModelA.EuroQuantity) {
            ModelA.EuroQuantity = new ModelA();
        }
        return ModelA.EuroQuantity;
    }
    setValue(amount) {
        ModelA.EuroQuantity.value = amount;
    }
}
const container = document.getElementById("container");
const backdrop = document.getElementById("backdrop");
const promptContainer = document.getElementById("prompt");
const moduleA = document.getElementById("model-a");
const moduleB = document.getElementById("model-b");
const viewA = document.getElementById("layout-a");
const viewB = document.getElementById("layout-b");
const removeBackdrop = () => {
    const parent = backdrop.parentNode;
    parent.removeChild(backdrop);
    parent.removeChild(promptContainer);
};
const viewListeners = (model) => {
    viewA.classList.add("active-layout");
    viewA.addEventListener("click", () => {
        container.innerHTML = "";
        viewB.classList.remove("active-layout");
        viewA.classList.add("active-layout");
        const view = new ViewA(model);
        view.render();
        view.setEventListeners();
    });
    viewB.addEventListener("click", () => {
        viewA.classList.remove("active-layout");
        viewB.classList.add("active-layout");
        const view = new ViewB(model);
        view.render();
        view.setEventListeners();
    });
};
moduleA.addEventListener("click", function chooseModel() {
    removeBackdrop();
    moduleB.removeEventListener("click", chooseModel);
    const view = new ViewA("modelA");
    view.render();
    view.setEventListeners();
    viewListeners("modelA");
});
moduleB.addEventListener("click", function chooseModel() {
    removeBackdrop();
    moduleA.removeEventListener("click", chooseModel);
    const view = new ViewA("modelB");
    view.render();
    view.setEventListeners();
    viewListeners("modelB");
});
