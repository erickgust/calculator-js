%%raw(`
import '../styles/calc-buttons.css';
import getResult from './calculator';
import getElement from './getElement';
import {
  addCurrent, clearResult, getCurrent, showResult,
} from './screen';

const numberButtons = document.querySelectorAll('[data-js="button-number"]');
const operationButtons = document.querySelectorAll('[data-js="button-operation"]');
const $allClearButton = getElement('button-ac');
const $equalButton = getElement('button-equal');

function handleClickNumber({ target }) {
  const value = getCurrent() + target.value;
  addCurrent(value);
  showResult(value);
}

function handleCLickOperator({ target }) {
  const current = removeLastOperator(getCurrent());
  const value = current + target.value;

  if (current === '') {
    return;
  }

  addCurrent(value);
}

function handleClearButton() {
  addCurrent('');
  clearResult();
}

function isLastItemAnOperator(value) {
  const operators = ['-', '+', 'x', '÷'];
  const lastItem = value.slice(-1);
  return operators.includes(lastItem);
}

function removeLastOperator(value) {
  if (isLastItemAnOperator(value)) {
    return value.slice(0, -1);
  }

  return value;
}

function handleEqualButton() {
  const current = removeLastOperator(getCurrent());
  addCurrent(getResult(current));
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
`)
