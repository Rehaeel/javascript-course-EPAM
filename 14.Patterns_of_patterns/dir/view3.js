import { ModelA } from "./controller.js";
import { database } from "./model.js";
const container = document.getElementById("container");
export class View {
    constructor(model) {
        this.isViewA = (view) => view === "a";
        this.isModelA = () => this.model === "modelA";
        this.model = model;
    }
    setView(view) {
        this.render(view);
    }
    render(view) {
        container.innerHTML = database.reduce((acc, curr) => {
            if (this.isModelA()) {
                ModelA.instance().setValue(100);
                curr.convertedCurrAmount = +(curr.exchangeRate * ModelA.instance().value).toFixed(2);
            }
            else {
                curr.convertedCurrAmount = +(curr.exchangeRate * curr.baseCurrAmount).toFixed(2);
            }
            const exchangeOutput = this.isViewA(view)
                ? `<input type="number" step="0.05" value="${curr.exchangeRate}"/>`
                : curr.exchangeRate;
            const euroOutput = () => {
                const outputValue = this.isModelA()
                    ? ModelA.instance().value
                    : curr.baseCurrAmount;
                return `<label> EURO <span id="euro-output-${curr.title}">${this.isViewA(view) ? "" : outputValue}</span>
                        <input class="euro-amount"  ${this.isViewA(view)
                    ? `type="number"`
                    : `type="range" min="0" max="10000"`} value="${outputValue}"/>
                  </label>`;
            };
            const currencyOutput = () => {
                return `<label> ${curr.title} ${this.isViewA(view)
                    ? ""
                    : curr.convertedCurrAmount.toFixed(2)}
                        <input ${this.isViewA(view)
                    ? `type="number"`
                    : `type="range" min="0" max="10000" `}class="converted-amount" value="${curr.convertedCurrAmount.toFixed(2)}"/>
                    </label>`;
            };
            const htmlString = `<div class="currency" id="${curr.title}">
        <h3>${curr.title}</h3>
        <label class="exchange-rate">1 EUR is ${exchangeOutput} ${curr.title}</label>

        <div class="currency-calculations">
            <div class="euro-output-amount">
                  ${euroOutput()}
            </div>

            <div class="converted-output-amount">
                    ${currencyOutput()}
            </div>
        </div>

        </div>`;
            return acc + htmlString + "\n";
        }, "");
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
