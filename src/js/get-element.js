export default function getElement(elementName) {
  return document.querySelector(`[data-js="${elementName}"]`);
}
