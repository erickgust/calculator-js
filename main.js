const $screen = getElement('screen');
const $current = createScreenComponents('current');
const $result = createScreenComponents('result');
const numberButtons = document.querySelectorAll('[data-js="button-number"]');
const operationButtons = document.querySelectorAll('[data-js="button-operation"]');

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
  $current.textContent += target.value;
}

numberButtons.forEach((button) => {
  button.addEventListener('click', handleClickNumber);
});

operationButtons.forEach((button) => {
  button.addEventListener('click', handleCLickOperator);
});

$screen.appendChild($current);
$screen.appendChild($result);
