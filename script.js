const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");
const clearBtn = document.getElementById("clear");
const deleteBtn = document.getElementById("delete");
const equalBtn = document.getElementById("equal");

let expression = "";

function updateDisplay(value) {
    const displayValue = (value || "0")
        .replace(/\*/g, "×")
        .replace(/\//g, "÷");
    display.textContent = displayValue;

    display.classList.remove("text-6xl", "text-4xl", "text-3xl", "text-2xl");
    if (displayValue.length > 20) {
        display.classList.add("text-2xl");
    } else if (displayValue.length > 10) {
        display.classList.add("text-3xl");
    } else {
        display.classList.add("text-6xl");
    }
    display.scrollLeft = display.scrollWidth;
}

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.dataset.value;
        const operators = ["+", "-", "*", "/"];

        if (value === ".") {
            const lastOperator = Math.max(
                expression.lastIndexOf("+"),
                expression.lastIndexOf("-"),
                expression.lastIndexOf("*"),
                expression.lastIndexOf("/")
            );

            const currentNumber = expression.slice(lastOperator + 1);

            if (currentNumber.includes(".")) {
                return;
            }
        }
        if (value === "%") {
            expression = (Number(expression) / 100).toString();
            updateDisplay(expression);
            return;
        }

        if (operators.includes(value)) {
            const lastChar = expression.slice(-1);

            if (operators.includes(lastChar)) {
                expression = expression.slice(0, -1) + value;
                updateDisplay(expression);
                return;
            }
        }
        if (display.textContent === "0" && value !== ".") {
            expression = value;
        } else {
            expression += value;
        }
        updateDisplay(expression);
    });
});

clearBtn.addEventListener("click", () => {
    expression = "";
    updateDisplay("0");
});

deleteBtn.addEventListener("click", () => {
    expression = expression.slice(0, -1);
    updateDisplay(expression);
});

equalBtn.addEventListener("click", () => {
    if (expression === "") {
        updateDisplay("0");
        return;
    }

    try {
        expression = eval(expression).toString();
        updateDisplay(expression);
    } catch {
        expression = "";
        updateDisplay("Error");
    }

});