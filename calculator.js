const buttons = [
  "percentage",
  "cancel-entry",
  "clear",
  "delete",
  "inverse",
  "root",
  "square-root",
  "division",
  "seven",
  "eight",
  "nine",
  "multiplication",
  "four",
  "five",
  "six",
  "subtration",
  "one",
  "two",
  "three",
  "sum",
  "negate",
  "zero",
  "dot",
  "equal",
];

const unaryOperator = ["%", "1/x", "**", "√", "+/-"];

class Calculator {
  constructor() {
    this.MAX_VISOR_CHAR = 10;
    this.operator = null;
    this.currentNumber = null;

    for (let i = 0; i < buttons.length; i++) {
      this[buttons[i]] = document.getElementById(`${buttons[i]}`);
    }

    this.configureButtonsEvent();
    this.configureKeyboardEvent();
  }

  sumOperation(a, b) {
    return b + a;
  }

  subtrationOperation(a, b) {
    return b - a;
  }

  multiplicationOperation(a, b) {
    return b * a;
  }

  divisionOperation(a, b) {
    return b / a;
  }

  percentageOperation(number) {
    return number / 100;
  }

  inverseOperation(num) {
    return 1 / num;
  }

  squareOperation(num) {
    return Math.pow(num, 2);
  }

  squareRootOperation(num) {
    return Math.sqrt(num);
  }

  negateOperation(num) {
    return num * (-1);
  }

  getTotal() {
    const total = document.getElementById("total");

    return total;
  }

  getAccumulator() {
    const accumulator = document.getElementById("accumulator");

    return accumulator;
  }

  cleanCurrentEntry() {
    const currentEntry = this.getTotal();

    currentEntry.innerText = "";
  }

  cleanAll() {
    const currentEntry = this.getTotal();
    const accumulator = this.getAccumulator();

    currentEntry.innerText = "0";
    accumulator.innerText = "";
  }

  addNumber(num) {
    const currentEntry = this.getTotal();
    const accumulator = this.getAccumulator();

    if (accumulator.innerText.includes("=") && currentEntry.innerText.length > 0) {
      this.cleanAll();
    }

    if (currentEntry.innerText === "0" || (this.operator && !this.currentNumber)) {
      currentEntry.innerText = num;
    } else {
      if (currentEntry.innerText.length < this.MAX_VISOR_CHAR) {
        currentEntry.innerText += num;
      }
    }

    this.currentNumber += `${num}`;
  }

  addDot() {
    const currentEntry = this.getTotal();

    if (currentEntry.innerText.length < this.MAX_VISOR_CHAR) {
      if (!currentEntry.innerHTML.includes(".")) {
        currentEntry.innerHTML += ".";
      }
    }
  }

  setOperator(operator) {
    const accumulator = this.getAccumulator();
    const currentEntry = this.getTotal();

    this.operator = operator;
    this.currentNumber = null;

    switch (operator) {
      case "%":
        accumulator.innerHTML = "";
        break;
      case "1/x":
        accumulator.innerHTML = `1/(${currentEntry.innerHTML})`;
        break;
      case "**":
        accumulator.innerHTML = `sqr(${currentEntry.innerHTML})`;
        break;
      case "√":
        accumulator.innerHTML = `√(${currentEntry.innerHTML})`;
        break;
      case "/":
        accumulator.innerHTML = `${currentEntry.innerHTML} /`;
        break;
      case "*":
        accumulator.innerHTML = `${currentEntry.innerHTML} *`;
        break;
      case "-":
        accumulator.innerHTML = `${currentEntry.innerHTML} -`;
        break;
      case "+":
        accumulator.innerHTML = `${currentEntry.innerHTML} +`;

        break;
      case "+/-":
        accumulator.innerHTML = "";
        break;
    }
  }

  deleteOperation() {
    const currentEntry = this.getTotal();

    if (currentEntry.innerText.length > 0) {
      currentEntry.innerText = currentEntry.innerText.slice(0, -1);
    }
  }

  executeOperations(numbers, action) {
    switch (action) {
      case "%": {
        return this.percentageOperation(...numbers);
      }

      case "1/x": {
        return this.inverseOperation(...numbers);
      }

      case "**": {
        return this.squareOperation(...numbers);
      }

      case "√": {
        return this.squareRootOperation(...numbers);
      }

      case "/": {
        const total = this.divisionOperation(...numbers);

        if (numbers[0] == 0) {
          const accumulator = this.getAccumulator();
          accumulator.innerText = "Cannot divide by zero";

          return 0;
        }

        return total;
      }

      case "*": {
        return this.multiplicationOperation(...numbers);
      }

      case "-": {
        return this.subtrationOperation(...numbers);
      }

      case "+": {
        return this.sumOperation(...numbers);
      }

      case "+/-": {
        return this.negateOperation(...numbers);
      }
    }
  }

  formatNumber(number, precision) {
    if (number.length > this.MAX_VISOR_CHAR) {
      return Number(number).toExponential(precision);
    } else {
      return number;
    }
  }

  getResult() {
    const currentEntry = this.getTotal();
    const accumulator = this.getAccumulator();

    if (accumulator.innerText.includes("=")) {
      return;
    }

    const num1 = Number(currentEntry.innerText ?? 0);
    const num2 = Number(accumulator.innerText.substring(0, accumulator.innerText.length - 2) ?? 0);

    const result = String(this.executeOperations([num1, num2], this.operator));

    if (accumulator.innerText.length && !unaryOperator.includes(this.operator)) {
      accumulator.innerText = `${num2} ${this.operator} ${num1} = `;
    }

    currentEntry.innerText = this.formatNumber(result, 3);
  }

  createButtonClickEvent(button, fn) {
    this[button].addEventListener("click", fn);
  }

  buttonHandlerMap(button) {
    switch (button) {
      case "percentage": {
        this.setOperator("%");
        this.getResult();
        break;
      }

      case "cancel-entry": {
        this.cleanCurrentEntry();
        break;
      }

      case "clear": {
        this.cleanAll();
        break;
      }

      case "delete": {
        this.deleteOperation();
        break;
      }

      case "inverse": {
        this.setOperator("1/x");
        this.getResult();
        break;
      }

      case "root": {
        this.setOperator("**");
        this.getResult();
        break;
      }

      case "square-root": {
        this.setOperator("√");
        this.getResult();
        break;
      }

      case "division": {
        this.setOperator("/");
        break;
      }

      case "seven": {
        this.addNumber(7);
        break;
      }

      case "eight": {
        this.addNumber(8);
        break;
      }

      case "nine": {
        this.addNumber(9);
        break;
      }

      case "multiplication": {
        this.setOperator("*");
        break;
      }

      case "four": {
        this.addNumber(4);
        break;
      }

      case "five": {
        this.addNumber(5);
        break;
      }

      case "six": {
        this.addNumber(6);
        break;
      }

      case "subtration": {
        this.setOperator("-");
        break;
      }

      case "one": {
        this.addNumber(1);
        break;
      }

      case "two": {
        this.addNumber(2);
        break;
      }

      case "three": {
        this.addNumber(3);
        break;
      }

      case "sum": {
        this.setOperator("+");
        break;
      }

      case "negate": {
        this.setOperator("+/-");
        this.getResult();
        break;
      }

      case "zero": {
        this.addNumber(0);
        break;
      }

      case "dot": {
        this.addDot();
        break;
      }

      case "equal": {
        this.getResult();
        break;
      }
    }
  }

  configureButtonsEvent() {
    for (let i = 0; i < buttons.length; i++) {
      this.createButtonClickEvent(buttons[i], () => this.buttonHandlerMap(buttons[i]));
    }
  }

  createKeyboardEvent(fn) {
    document.addEventListener("keydown", fn);
  }

  keyboardMap(key) {
    switch (key) {
      case "%":
        return "percentage";
      case "Backspace":
        return "clear";
      case "Delete":
        return "delete";
      case "²":
        return "square-root";
      case "/":
        return "division";
      case "7":
        return "seven";
      case "8":
        return "eight";
      case "9":
        return "nine";
      case "*":
        return "multiplication";
      case "4":
        return "four";
      case "5":
        return "five";
      case "6":
        return "six";
      case "-":
        return "subtration";
      case "1":
        return "one";
      case "2":
        return "two";
      case "3":
        return "three";
      case "+":
        return "sum";
      case "0":
        return "zero";
      case ".":
      case ",":
        return "dot";
      case "=":
      case "Enter":
        return "equal";
    }
  }

  configureKeyboardEvent() {
    this.createKeyboardEvent((event) => this.buttonHandlerMap(this.keyboardMap(event.key)));
  }
}

export default Calculator;
