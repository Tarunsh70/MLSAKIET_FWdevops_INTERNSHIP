let displayValue = "";
let memory = 0;
let history = [];

function appendNumber(number) {
    displayValue += number;
    updateDisplay();
}

function appendOperator(operator) {
    if (displayValue === "") return;
    if (isNaN(displayValue[displayValue.length - 1])) return;
    displayValue += operator;
    updateDisplay();
}

function appendFunction(func) {
    displayValue = `${func}(${displayValue})`;
    calculate();
}

function clearDisplay() {
    displayValue = "";
    updateDisplay();
}

function deleteLast() {
    displayValue = displayValue.slice(0, -1);
    updateDisplay();
}

function memoryStore() {
    memory = parseFloat(displayValue) || 0;
    updateDisplay();
}

function memoryRecall() {
    displayValue += memory.toString();
    updateDisplay();
}

function updateDisplay() {
    document.getElementById("display").value = displayValue;
}

function calculate() {
    try {
        const result = eval(displayValue);
        history.push(`${displayValue} = ${result}`);
        displayValue = result.toString();
        updateDisplay();
        updateHistory();
    } catch (error) {
        displayValue = "Error";
        updateDisplay();
        setTimeout(clearDisplay, 1500);
    }
}

function updateHistory() {
    document.getElementById("history").textContent = history[history.length - 1] || "";
}

// Keyboard support
document.addEventListener("keydown", function (e) {
    if (!isNaN(e.key)) appendNumber(e.key);
    else if (['+', '-', '*', '/'].includes(e.key)) appendOperator(e.key);
    else if (e.key === 'Enter') calculate();
    else if (e.key === 'Backspace') deleteLast();
    else if (e.key === 'Escape') clearDisplay();
});
