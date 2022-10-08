%%raw(`
import '../styles/calculator-app.css';

const doOperation = {
  '+': (number1, number2) => +number1 + +number2,
  '-': (number1, number2) => +number1 - +number2,
  '÷': (number1, number2) => +number1 / +number2,
  x: (number1, number2) => +number1 * +number2,
};

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

function createRegex(signal) {
  const numberPattern = '(?:\\d+)\\.?(?:\\d+)?';
  const regex = new RegExp(\`\${numberPattern}(\${signal})\${numberPattern}\`);
  return regex;
}

function getResult(value) {
  const operation = getOperation(value, createRegex('[x÷]'));
  const result = getOperation(operation, createRegex('[-+]'));
  return result;
}

export default getResult;
`)
