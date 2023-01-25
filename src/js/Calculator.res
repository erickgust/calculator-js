%%raw(`import '../styles/calculator-app.css'`)

let createRegex = (signal) => {
  let numberPattern = "(?:\\d+)\\.?(?:\\d+)?"
  let regex = Js.Re.fromString(numberPattern ++ "(" ++ signal ++ ")" ++ numberPattern)
  regex
}

let doOperation = (signal, number1, number2) => {
  switch signal {
  | "+" => number1 +. number2
  | "-" => number1 -. number2
  | "*" => number1 *. number2
  | "/" => number1 /. number2
  | _ => 0 -> Js.Int.toFloat
  }
}

let rec solveOperation = (operation, regex) => {
  let [match, signal] = switch Js.Re.exec_(regex, operation) {
    | Some(result) => {
      let match = switch Js.Nullable.toOption(Js.Re.captures(result)[0]) {
        | Some(string) => string
        | None => ""
      }
      let signal = switch Js.Nullable.toOption(Js.Re.captures(result)[1]) {
        | Some(string) => string
        | None => ""
      }
      [match, signal]
    }
    | None => []
  }

  let numbers = match -> Js.String2.split(signal)
  let result = doOperation(
    signal,
    Js.Float.fromString(numbers[0]),
    Js.Float.fromString(numbers[1]
  ))

  let addResultInOperation = operation
    -> Js.String2.split(match)
    -> Js.Array2.joinWith(Belt.Float.toString(result))

  getOperation(addResultInOperation, regex)
}
and getOperation = (operation, regex) => {
  regex -> Js.Re.test_(operation)
    ? solveOperation(operation, regex)
    : operation
}

let getResult = (value) => {
  let result = value
    -> getOperation(createRegex("[*/]"))
    -> getOperation(createRegex("[-+]"))
  result
}
