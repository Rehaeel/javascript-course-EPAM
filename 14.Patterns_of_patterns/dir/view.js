import { ModelA } from "./app.js";
import { database } from "./model.js";
const container = document.getElementById("container");
export class View {
    constructor(model) {
        this.isModelA = () => this.model === "modelA";
        this.render = () => {
            container.innerHTML = database.reduce((acc, curr) => {
                if (this.isModelA()) {
                    ModelA.instance().setValue(100);
                    curr.convertedCurrAmount = +(curr.exchangeRate * ModelA.instance().value).toFixed(2);
                }
                else {
                    curr.convertedCurrAmount = +(curr.exchangeRate * curr.baseCurrAmount).toFixed(2);
                }
                const exchangeOutput = this.isViewA()
                    ? `<input type="number" step="0.05" value="${curr.exchangeRate}"/>`
                    : curr.exchangeRate;
                const htmlString = `
        <div class="currency" id="${curr.title}">
            <h3>${curr.title}</h3>
                <label class="exchange-rate">
                    1 EUR is <span id="exchange-rate-${curr.title}">${exchangeOutput}</span> ${curr.title}</label>

        <div class="currency-calculations">
            <div class="euro-output-amount">
                  ${this.euroOutput(curr)}
            </div>

            <div class="converted-output-amount">
                    ${this.currencyOutput(curr)}
            </div>
        </div>

        </div>`;
                return acc + htmlString + "\n";
            }, "");
        };
        this.model = model;
    }
}
export class ViewA extends View {
    constructor(model) {
        super(model);
        this.isViewA = () => true;
        this.currencyOutput = (curr) => {
            return `<label> ${curr.title} 
                        <input ${`type="number"`}class="converted-amount" value="${curr.convertedCurrAmount.toFixed(2)}"/>
                    </label>`;
        };
        this.euroOutput = (curr) => {
            const outputValue = this.isModelA()
                ? ModelA.instance().value
                : curr.baseCurrAmount;
            return `<label> EURO <span id="euro-output-${curr.title}">${outputValue}</span>
                        <input class="euro-amount" type="number" value="${outputValue}"/>
                  </label>`;
        };
    }
    setEventListeners() {
        database.forEach((curr) => {
            const currentCurrency = document.getElementById(curr.title);
            const euroInput = currentCurrency
                .querySelector(".euro-output-amount")
                .querySelector("input");
            const convertedInput = currentCurrency
                .querySelector(".converted-output-amount")
                .querySelector("input");
            const exchangeInput = currentCurrency
                .querySelector(".exchange-rate")
                .querySelector("input");
            euroInput.addEventListener("input", (e) => {
                const target = e.target;
                if (this.isModelA()) {
                    curr.baseCurrAmount = +target.value;
                    ModelA.instance().setValue(+target.value);
                    curr.convertedCurrAmount =
                        curr.exchangeRate * ModelA.instance().value;
                    document
                        .querySelectorAll(".euro-output-amount")
                        .forEach((el) => {
                        el.querySelector("input").value =
                            ModelA.instance().value.toFixed();
                    });
                    document
                        .querySelectorAll(".currency")
                        .forEach((currency) => {
                        const rate = +currency
                            .querySelector(".exchange-rate")
                            .querySelector("input").value;
                        currency
                            .querySelector(".converted-output-amount")
                            .querySelector("input").value = (rate * ModelA.instance().value).toFixed(2);
                    });
                }
                else {
                    curr.baseCurrAmount = +target.value;
                    curr.convertedCurrAmount =
                        curr.exchangeRate * curr.baseCurrAmount;
                    convertedInput.value = curr.convertedCurrAmount.toFixed(2);
                }
            });
            convertedInput.addEventListener("input", (e) => {
                const target = e.target;
                curr.convertedCurrAmount = +target.value;
                if (this.isModelA()) {
                    ModelA.instance().setValue(+(curr.convertedCurrAmount / curr.exchangeRate).toFixed(2));
                    document
                        .querySelectorAll(".euro-output-amount")
                        .forEach((el) => {
                        el.querySelector("input").value =
                            ModelA.instance().value.toFixed();
                    });
                }
                else {
                    curr.baseCurrAmount = +(curr.convertedCurrAmount / curr.exchangeRate).toFixed(2);
                    euroInput.value = curr.baseCurrAmount.toFixed(2);
                }
            });
            exchangeInput.addEventListener("input", (e) => {
                const target = e.target;
                curr.exchangeRate = +target.value;
                curr.convertedCurrAmount = +(curr.baseCurrAmount * curr.exchangeRate).toFixed(2);
                convertedInput.value = curr.convertedCurrAmount.toFixed(2);
            });
        });
    }
}
export class ViewB extends View {
    constructor(model) {
        super(model);
        this.isViewA = () => false;
        this.currencyOutput = (curr) => {
            return `<label>${curr.title} <span id="converted-output-${curr.title}">${curr.convertedCurrAmount.toFixed(2)}</span>
                        <input ${`type="range" min="0" max="10000" `}class="converted-amount" value="${curr.convertedCurrAmount.toFixed(2)}"/>
                    </label>`;
        };
        this.euroOutput = (curr) => {
            const outputValue = this.isModelA()
                ? ModelA.instance().value
                : curr.baseCurrAmount;
            return `<label> EURO <span id="euro-output-${curr.title}">${outputValue}</span>
                        <input class="euro-amount" type="range" min="0" max="10000" value="${outputValue}"/>
                  </label>`;
        };
    }
    setEventListeners() {
        database.forEach((curr) => {
            const euroOutput = document.getElementById(`euro-output-${curr.title}`);
            const euroInput = euroOutput.nextElementSibling;
            const convertedOutput = document.getElementById(`converted-output-${curr.title}`);
            const convertedInput = convertedOutput.nextElementSibling;
            if (this.isModelA()) {
                euroInput.setAttribute("oninput", `document.querySelectorAll(".currency")
                        .forEach((el) => {
                            el.querySelector(".euro-output-amount").querySelector("span").innerHTML = this.value;

                            el.querySelector(".converted-output-amount").querySelector("span").innerHTML = 
                            (this.value *
                                el.querySelector(".exchange-rate").querySelector("span").innerHTML).toFixed(2)
                    
                    });`);
                convertedInput.setAttribute("onInput", `document.getElementById("converted-output-${curr.title}").innerHTML = this.value;
                
                    document.querySelectorAll(".currency").forEach((el) => {
                    el
                        .querySelector(".euro-output-amount")
                        .querySelector("span").innerHTML = (
                        this.value /
                        document.getElementById("exchange-rate-${curr.title}").textContent).toFixed(2);

                        el
                        .querySelector(".converted-output-amount")
                        .querySelector("span").innerHTML = (
                        el
                            .querySelector(".euro-output-amount")
                            .querySelector("span").innerHTML *
                        el.querySelector(".exchange-rate").querySelector("span")
                            .innerHTML
                    ).toFixed(2);

                        })`);
            }
            else {
                euroInput.setAttribute("oninput", `document.getElementById("euro-output-${curr.title}").innerHTML =this.value;

                    document.getElementById("converted-output-${curr.title}").innerHTML = 
                    (document.getElementById("exchange-rate-${curr.title}").textContent * 
                    this.value).toFixed(2);`);
                convertedInput.setAttribute("onInput", `document.getElementById("converted-output-${curr.title}").innerHTML = this.value
                
                    document.getElementById("euro-output-${curr.title}").innerHTML = 
                    (this.value /
                    document.getElementById("exchange-rate-${curr.title}").textContent).toFixed(2);`);
            }
        });
    }
}
