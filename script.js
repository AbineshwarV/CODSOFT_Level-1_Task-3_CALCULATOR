let display = document.getElementById("display");
let currentInput = "";
let operator = null;
let previousInput = "";

// Handle button clicks
document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", function () {
    const value = this.textContent;

    if (value === "C") {
      resetCalculator();
    } else if (value === "←") {
      backspace();
    } else if (value === "=") {
      calculateResult();
    } else if (["+", "-", "*", "/"].includes(value)) {
      setOperator(value);
    } else {
      handleNumberOrDecimal(value);
    }
  });
});

// Reset the calculator
function resetCalculator() {
  currentInput = "";
  previousInput = "";
  operator = null;
  display.textContent = "0";
}

// Backspace to remove last character
function backspace() {
  currentInput = currentInput.slice(0, -1);
  display.textContent = currentInput || "0";
  updateFullExpression();
}

// Handle operator input
function setOperator(value) {
  if (currentInput !== "") {
    if (previousInput !== "") {
      calculateResult();
    }
    operator = value;
    previousInput = currentInput;
    currentInput = "";
  }
  updateFullExpression();
}

// Handle number or decimal input
function handleNumberOrDecimal(value) {
  if (value === "." && currentInput.includes(".")) {
    return; // Prevent multiple decimals
  }
  if (currentInput === "0" && value !== ".") {
    currentInput = value; // Replace leading zero
  } else {
    currentInput += value; // Append number or decimal
  }
  display.textContent = currentInput;
  updateFullExpression();
}

// Update the full expression shown in the display
function updateFullExpression() {
  if (previousInput && operator) {
    display.textContent = previousInput + " " + operator + " " + currentInput;
  } else {
    display.textContent = currentInput || "0";
  }
}

// Calculate result
function calculateResult() {
  if (previousInput !== "" && operator !== null && currentInput !== "") {
    const result = calculate(previousInput, currentInput, operator);
    display.textContent = result;
    previousInput = result; // Update previous input for further calculation
    currentInput = "";
    operator = null;
  }
}

// Perform calculation based on operator
function calculate(num1, num2, operator) {
  num1 = parseFloat(num1);
  num2 = parseFloat(num2);

  switch (operator) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "*":
      return num1 * num2;
    case "/":
      if (num2 === 0) return "Error"; // Prevent division by zero
      return num1 / num2;
    default:
      return num2;
  }
}
