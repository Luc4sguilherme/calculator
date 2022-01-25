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
    this.total = document.getElementById("total");
    this.accumulator = document.getElementById("accumulator");
    this.operator = null;
    this.currentNumber = null;

    for (let i = 0; i < buttons.length; i++) {
      this[buttons[i]] = document.getElementById(`${buttons[i]}`);
    }

    this.configureButtonsEvent();
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
    return ~num + 1;
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

  exececuteOperations(numbers, action) {
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

  getResult() {
    const currentEntry = this.getTotal();
    const accumulator = this.getAccumulator();

    if (accumulator.innerText.includes("=")) {
      return;
    }

    const num1 = Number(currentEntry.innerText ?? 0);
    const num2 = Number(accumulator.innerText.substring(0, accumulator.innerText.length - 2) ?? 0);

    const result = String(this.exececuteOperations([num1, num2], this.operator)).substring(0, 8);

    if (accumulator.innerText.length && !unaryOperator.includes(this.operator)) {
      accumulator.innerText = `${num2} ${this.operator} ${num1} = `;
    }

    currentEntry.innerText = result;
  }

  createButtonClickEvent(button, fn) {
    this[button].addEventListener("click", fn);
  }

  configureButtonsEvent() {
    this.createButtonClickEvent("percentage", () => {
      this.setOperator("%");
      this.getResult();
    });
    this.createButtonClickEvent("cancel-entry", () => this.cleanCurrentEntry());
    this.createButtonClickEvent("clear", () => this.cleanAll());
    this.createButtonClickEvent("delete", () => this.deleteOperation());
    this.createButtonClickEvent("inverse", () => {
      this.setOperator("1/x");
      this.getResult();
    });
    this.createButtonClickEvent("root", () => {
      this.setOperator("**");
      this.getResult();
    });
    this.createButtonClickEvent("square-root", () => {
      this.setOperator("√");
      this.getResult();
    });
    this.createButtonClickEvent("division", () => this.setOperator("/"));
    this.createButtonClickEvent("seven", () => this.addNumber(7));
    this.createButtonClickEvent("eight", () => this.addNumber(8));
    this.createButtonClickEvent("nine", () => this.addNumber(9));
    this.createButtonClickEvent("multiplication", () => this.setOperator("*"));
    this.createButtonClickEvent("four", () => this.addNumber(4));
    this.createButtonClickEvent("five", () => this.addNumber(5));
    this.createButtonClickEvent("six", () => this.addNumber(6));
    this.createButtonClickEvent("subtration", () => this.setOperator("-"));
    this.createButtonClickEvent("one", () => this.addNumber(1));
    this.createButtonClickEvent("two", () => this.addNumber(2));
    this.createButtonClickEvent("three", () => this.addNumber(3));
    this.createButtonClickEvent("sum", () => this.setOperator("+"));
    this.createButtonClickEvent("negate", () => {
      this.setOperator("+/-");
      this.getResult();
    });
    this.createButtonClickEvent("zero", () => this.addNumber(0));
    this.createButtonClickEvent("dot", () => this.addDot(","));
    this.createButtonClickEvent("equal", () => this.getResult());
  }
}

export default Calculator;
