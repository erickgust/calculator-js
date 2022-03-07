import './src/styles/reset.css';
import './src/styles/colors.css';
import './src/styles/base.css';
import './src/styles/calculator-app.css';
import './src/styles/calc-screen.css';
import './src/styles/calc-buttons.css';

const $screen = getElement('screen');

function getElement(elementName) {
  return document.querySelector(`[data-js="${elementName}"]`);
}

function showCurrentOperation(value) {
  const $current = document.createElement('div');
  $current.className = 'current';
  $current.textContent = value;
  $screen.appendChild($current);
}

function showResultOperation(value) {
  const $result = document.createElement('div');
  $result.className = 'result';
  $result.textContent = value;
  $screen.appendChild($result);
}

showCurrentOperation('1 + 2');
showResultOperation('3');
