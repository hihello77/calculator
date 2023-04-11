const calculator = document.querySelector(".calculator");
const displayPrevious = document.querySelector(".previous");
const displayCurrent = document.querySelector(".current");
const clearBtn = document.querySelector(".clear");
const deleteBtn = document.querySelector(".delete");
const numberBtns = document.querySelectorAll(".number");
const operatorBtns = document.querySelectorAll(".operator");
const equalsBtn = document.querySelector(".equals");

let currentOperand = "";
let previousOperand = "";
let operator = undefined;

function appendNumber(number) {
  if (number === "." && currentOperand.includes(".")) return;
  currentOperand = currentOperand.toString() + number.toString();
}

function chooseOperator(selectedOperator) {
  if (currentOperand === "") return;
  if (previousOperand !== "") {
    calculate();
  }
  operator = selectedOperator;
  previousOperand = currentOperand;
  currentOperand = "";
}

function calculate() {
  let result;
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return;
  switch (operator) {
    case "+":
      result = prev + current;
      break;
    case "-":
      result = prev - current;
      break;
    case "*":
      result = prev * current;
      break;
    case "/":
      result = prev / current;
      break;
    default:
      return;
  }
  currentOperand = result;
  operator = undefined;
  previousOperand = "";
}

function updateDisplay() {
  displayCurrent.innerText = currentOperand;
  displayPrevious.innerText = previousOperand;
}

function clear() {
  currentOperand = "";
  previousOperand = "";
  operator = undefined;
}

function deleteNumber() {
  currentOperand = currentOperand.toString().slice(0, -1);
}

numberBtns.forEach((button) => {
  button.addEventListener("click", () => {
    appendNumber(button.value);
    updateDisplay();
  });
});

operatorBtns.forEach((button) => {
  button.addEventListener("click", () => {
    chooseOperator(button.value);
    updateDisplay();
  });
});

equalsBtn.addEventListener("click", () => {
  calculate();
  updateDisplay();
});

clearBtn.addEventListener("click", () => {
  clear();
  updateDisplay();
});

deleteBtn.addEventListener("click", () => {
  deleteNumber();
  updateDisplay();
});
