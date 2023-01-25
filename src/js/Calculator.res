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
  let result = Js.Re.exec_(regex, operation)

  let fullMatch = switch result {
    | Some(res) => switch Js.Nullable.toOption(Js.Re.captures(res)[0]) {
      | Some(string) => string
      | None => ""
    }
    | None => ""
  }

  let operatorSignal = switch result {
  | Some(res) => switch Js.Nullable.toOption(Js.Re.captures(res)[1]) {
    | Some(string) => string
    | None => ""
  }
  | None => ""
  }

  let numbers = fullMatch -> Js.String2.split(operatorSignal)
  let result = doOperation(
    operatorSignal,
    Js.Float.fromString(numbers[0]),
    Js.Float.fromString(numbers[1]
  ))

  let addResultInOperation = operation
    -> Js.String2.split(fullMatch)
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
