const $screen = getElement('screen');
const $current = createScreenComponents('current');
const $result = createScreenComponents('result');
const numberButtons = document.querySelectorAll('[data-js="button-number"]');
const operationButtons = document.querySelectorAll('[data-js="button-operation"]');
const $allClearButton = getElement('button-ac');
const $equalButton = getElement('button-equal');
const doOperation = {
  '+': (number1, number2) => number1 + number2,
  '-': (number1, number2) => number1 - number2,
  '÷': (number1, number2) => number1 / number2,
  x: (number1, number2) => number1 * number2,
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
}

function handleCLickOperator({ target }) {
  removeLastOperator();
  $current.textContent += target.value;
}

function handleClearButton() {
  $current.textContent = '';
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

function handleEqualButton() {
  removeLastOperator();
  removeFirstOperator();
  console.log(doOperation['÷'](9, 3));
  console.log(doOperation.x(9, 3));
  console.log(doOperation['+'](4, 6));
  console.log(doOperation['-'](3, 3));
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
