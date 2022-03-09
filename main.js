const $screen = getElement('screen');
const $current = createScreenComponents('current');
const $result = createScreenComponents('result');
const numberButtons = document.querySelectorAll('[data-js="button-number"]');
const operationButtons = document.querySelectorAll('[data-js="button-operation"]');
const $allClearButton = getElement('button-ac');
const $equalButton = getElement('button-equal');
const doOperation = {
  '+': (number1, number2) => +number1 + +number2,
  '-': (number1, number2) => +number1 - +number2,
  '÷': (number1, number2) => +number1 / +number2,
  x: (number1, number2) => +number1 * +number2,
};

function getElement(elementName) {
  return document.querySelector(`[data-js="${elementName}"]`);
}

function createScreenComponents(className) {
  const $div = document.createElement('div');
  $div.className = className;
  return $div;
}

function handleClickNumber({ target }) {
  $current.textContent += target.value;
  showResult();
}

function handleCLickOperator({ target }) {
  removeLastOperator();
  $current.textContent += target.value;
}

function handleClearButton() {
  $current.textContent = '';
  clearResult();
}

function isLastItemAnOperator() {
  const operators = ['-', '+', 'x', '÷'];
  const lastItem = $current.textContent.slice(-1);
  return operators.includes(lastItem);
}

function isFirstItemAnOperator() {
  const operators = ['-', '+', 'x', '÷'];
  const lastItem = $current.textContent.charAt(0);
  return operators.includes(lastItem);
}

function removeFirstOperator() {
  if (isFirstItemAnOperator()) {
    $current.textContent = $current.textContent.slice(1);
  }
}

function removeLastOperator() {
  if (isLastItemAnOperator()) {
    $current.textContent = $current.textContent.slice(0, -1);
  }
}

function solveOperation(operation, regex) {
  const [match, signal] = operation.match(regex);
  const numbers = match.split(signal);
  const result = doOperation[signal](...numbers);
  const addResultInOperation = operation.split(match).join(result);
  return getOperation(addResultInOperation, regex);
}

function getOperation(operation, regex) {
  const hasSignal = regex.test(operation);
  return hasSignal
    ? solveOperation(operation, regex)
    : operation;
}

function clearResult() {
  $result.textContent = '';
}

function showResult() {
  const result = getResult();
  if (result === $current.textContent) {
    clearResult();
    return;
  }

  $result.textContent = result;
}

function createRegex(signal) {
  const numberPattern = '(?:\\d+)\\.?(?:\\d+)?';
  const regex = new RegExp(`${numberPattern}(${signal})${numberPattern}`);
  return regex;
}

function getResult() {
  removeLastOperator();
  removeFirstOperator();

  const operation = $current.textContent;
  const solvedOperation = getOperation(operation, createRegex('[x÷]'));
  const result = +getOperation(solvedOperation, createRegex('[-+]'));
  return (+result.toFixed(6)).toString();
}

function handleEqualButton() {
  $current.textContent = getResult();
  clearResult();
}

$equalButton.addEventListener('click', handleEqualButton);

$allClearButton.addEventListener('click', handleClearButton);

numberButtons.forEach((button) => {
  button.addEventListener('click', handleClickNumber);
});

operationButtons.forEach((button) => {
  button.addEventListener('click', handleCLickOperator);
});

$screen.appendChild($current);
$screen.appendChild($result);
