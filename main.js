const $screen = getElement('screen');
const $current = createScreenComponents('current');
const $result = createScreenComponents('result');
const numberButtons = document.querySelectorAll('[data-js="button-number"]');
const operationButtons = document.querySelectorAll('[data-js="button-operation"]');
const $allClearButton = getElement('button-ac');
const $equalButton = getElement('button-equal');

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

function isLastItemAnOperator() {
  const operators = ['-', '+', 'x', '÷'];
  const lastItem = $current.textContent.slice(-1);
  return operators.includes(lastItem);
}

function handleClearButton() {
  $current.textContent = '';
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
