%%raw(`import '../styles/calc-buttons.css'`)
open Webapi.Dom

let getResult = Calculator.getResult

let getElement = GetElement.getElement

let addCurrent = Screen.addCurrent
let clearResult = Screen.clearResult
let getCurrent = Screen.getCurrent
let showResult = Screen.showResult

let numberButtons = document -> Document.querySelectorAll("[data-js='button-number']")
let operationButtons = document -> Document.querySelectorAll("[data-js='button-operation']")
let allClearButton = getElement("button-ac")
let equalButton = getElement("button-equal")

let handleClickNumber = (value) => {
  let value = getCurrent() ++ value
  addCurrent(value)
  showResult(value)
}

let isLastItemAnOperator = (value) => {
  let operators = ["-", "+", "x", "÷"]
  let lastItem = value -> Js.String2.sliceToEnd(~from=-1)
  operators -> Js.Array2.includes(lastItem)
}

let removeLastOperator = (value) => {
  isLastItemAnOperator(value)
    ? value -> Js.String2.slice(~from=0, ~to_=-1)
    : value
}

let handleCLickOperator = (value) => {
  let current = getCurrent() -> removeLastOperator
  let value = current ++ value

  if current != "" {
    addCurrent(value)
  }
}

let handleClearButton = () => {
  addCurrent("")
  clearResult()
}

let handleEqualButton = () => {
  let current = getCurrent() -> removeLastOperator
  current -> getResult -> addCurrent
  clearResult()
}

switch equalButton {
  | Some(element)  => element -> Element.addClickEventListener((_e) => handleEqualButton())
  | None => ()
}

switch allClearButton {
  | Some(element)  => element -> Element.addClickEventListener((_e) => handleClearButton())
  | None => ()
}

numberButtons -> NodeList.forEach((button, _index) => {
  button -> Node.addClickEventListener(e => {
    e
      -> MouseEvent.target
      -> EventTarget.unsafeAsElement
      -> Element.asNode
      -> HtmlButtonElement.ofNode
      -> Belt.Option.getExn
      -> HtmlButtonElement.value
      -> handleClickNumber
    })
})

operationButtons -> NodeList.forEach((button, _index) => {
  button -> Node.addClickEventListener(e => {
    e
      -> MouseEvent.target
      -> EventTarget.unsafeAsElement
      -> Element.asNode
      -> HtmlButtonElement.ofNode
      -> Belt.Option.getExn
      -> HtmlButtonElement.value
      -> handleCLickOperator
    })
})
