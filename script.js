const display = document.getElementById("display");
const history = document.getElementById("history");

let currentValue = "";
let firstValue = null;
let currentOperator = null;
let waitingForSecondValue = false;

function updateDisplay() {
    display.textContent = currentValue || "0";
}

function appendNumber(number) {

    if (waitingForSecondValue) {
        currentValue = "";
        waitingForSecondValue = false;
    }

    if (number === "." && currentValue.includes(".")) {
        return;
    }

    if (number === "." && currentValue === "") {
        currentValue = "0";
    }

    if (currentValue === "0" && number !== ".") {
        currentValue = number;
    } else {
        currentValue += number;
    }

    updateDisplay();
}

function chooseOperator(operator) {

    if (currentValue === "") {
        return;
    }

    const value = parseFloat(currentValue);

    if (firstValue === null) {
        firstValue = value;
    } else if (currentOperator) {
        firstValue = performCalculation(
            firstValue,
            value,
            currentOperator
        );

        currentValue = String(firstValue);
        updateDisplay();
    }

    currentOperator = operator;
    waitingForSecondValue = true;

    history.textContent = `${formatNumber(firstValue)} ${operator}`;
}

function performCalculation(a, b, operator) {

    switch (operator) {

        case "+":
            return a + b;

        case "-":
            return a - b;

        case "×":
            return a * b;

        case "÷":
            if (b === 0) {
                return NaN;
            }
            return a / b;

        case "%":
            return a % b;

        default:
            return b;
    }
}

function calculate() {

    if (
        firstValue === null ||
        currentOperator === null ||
        currentValue === ""
    ) {
        return;
    }

    const secondValue = parseFloat(currentValue);

    const result = performCalculation(
        firstValue,
        secondValue,
        currentOperator
    );

    history.textContent =
        `${formatNumber(firstValue)} ${currentOperator} ${formatNumber(secondValue)} =`;

    if (!Number.isFinite(result)) {
        currentValue = "Error";
    } else {
        currentValue = formatNumber(result);
    }

    firstValue = null;
    currentOperator = null;
    waitingForSecondValue = true;

    updateDisplay();
}

function clearAll() {

    currentValue = "";
    firstValue = null;
    currentOperator = null;
    waitingForSecondValue = false;

    history.textContent = "";

    updateDisplay();
}

function deleteLast() {

    if (waitingForSecondValue) {
        return;
    }

    currentValue = currentValue.slice(0, -1);

    updateDisplay();
}

function formatNumber(number) {

    if (!Number.isFinite(number)) {
        return "Error";
    }

    const rounded = Math.round(number * 100000000) / 100000000;

    return String(rounded);
}

document.addEventListener("keydown", function(event) {

    const key = event.key;

    if (key >= "0" && key <= "9") {
        appendNumber(key);
    }

    else if (key === ".") {
        appendNumber(".");
    }

    else if (key === "+") {
        chooseOperator("+");
    }

    else if (key === "-") {
        chooseOperator("-");
    }

    else if (key === "*") {
        chooseOperator("×");
    }

    else if (key === "/") {
        event.preventDefault();
        chooseOperator("÷");
    }

    else if (key === "%") {
        chooseOperator("%");
    }

    else if (key === "Enter" || key === "=") {
        calculate();
    }

    else if (key === "Backspace") {
        deleteLast();
    }

    else if (key === "Escape" || key.toLowerCase() === "c") {
        clearAll();
    }
});

updateDisplay();