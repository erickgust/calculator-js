import getElement from './src/js/getElement';
import { addCurrent, addResult, getCurrent } from './src/js/screen';

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

function handleClickNumber({ target }) {
  const value = getCurrent() + target.value;
  addCurrent(value);
  showResult();
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
  addResult('');
}

function showResult() {
  const result = getResult();
  if (result === getCurrent()) {
    clearResult();
    return;
  }

  addResult(result);
}

function createRegex(signal) {
  const numberPattern = '(?:\\d+)\\.?(?:\\d+)?';
  const regex = new RegExp(`${numberPattern}(${signal})${numberPattern}`);
  return regex;
}

function getResult() {
  const operation = removeLastOperator(getCurrent());
  const solvedOperation = getOperation(operation, createRegex('[x÷]'));
  const result = getOperation(solvedOperation, createRegex('[-+]'));
  return result;
}

function handleEqualButton() {
  addCurrent(getResult());
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
