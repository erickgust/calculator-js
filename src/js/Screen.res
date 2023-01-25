%%raw(`import '../styles/calc-screen.css'`)
open Webapi.Dom

let createScreenComponents = (className) => {
  let component = document
    -> Document.createElement("div")

  Element.setClassName(component, className)
  component
}

let getElement = GetElement.getElement
let getResult = Calculator.getResult

let screen = getElement("screen")
let cover = createScreenComponents("cover")
let current = createScreenComponents("current")
let result = createScreenComponents("result")

let getCurrent = () => {
  current
    -> Element.textContent
    -> Js.String2.replace("x", "*")
    -> Js.String2.replace("÷", "/")
}

let addCurrent = (value) => {
  current -> Element.setTextContent(
    value
      -> Js.String2.replace("*", "x")
      -> Js.String2.replace("/", "÷")
  )
}

let addResult = (value) => {
  result -> Element.setTextContent(value)
}

let clearResult = () => addResult("")

let showResult = (current) => {
  let result = getResult(current)
  if result != current {
    addResult(result)
  }
}

switch screen {
| Some(element) => {
  element -> Element.appendChild(~child=cover)
  element -> Element.appendChild(~child=result)
}
| None => ()
}

cover -> Element.appendChild(~child=current)
