open Webapi.Dom

let getElement = (elementName) => {
  document -> Document.querySelector(`[data-js="${elementName}"]`)
}
