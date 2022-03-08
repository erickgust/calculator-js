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

numberButtons.forEach((button) => {
  button.addEventListener('click', ({ target }) => {
    $current.textContent += target.value;
  });
});

operationButtons.forEach((button) => {
  button.addEventListener('click', ({ target }) => {
    $current.textContent += target.value;
  });
});

$screen.appendChild($current);
$screen.appendChild($result);
