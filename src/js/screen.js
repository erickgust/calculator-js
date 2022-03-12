import getElement from './getElement';

const $screen = getElement('screen');
const $cover = createScreenComponents('cover');
const $current = createScreenComponents('current');
const $result = createScreenComponents('result');

function createScreenComponents(className) {
  const $div = document.createElement('div');
  $div.className = className;
  return $div;
}

function getCurrent() {
  return $current.textContent;
}

function addCurrent(value) {
  $current.textContent = value;
}

function addResult(value) {
  $result.textContent = value;
}

$cover.appendChild($current);
$screen.appendChild($cover);
$screen.appendChild($result);

export { getCurrent, addCurrent, addResult };
