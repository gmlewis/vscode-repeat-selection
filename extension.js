const vscode = require('vscode')

// Maximum length of pasted string (per selection).
const MAX_LENGTH = 10000000

/**
 * @param {vscode.ExtensionContext} context
 */
const activate = (context) => {
  console.log('Congratulations, your extension "repeat-selection" is now active!')

  let disposable = vscode.commands.registerCommand('repeat-selection.repeatSelection', function () {
    // The code you place here will be executed every time your command is executed

    // Get user input
    const opt = {
      placeHolder: "default: 1",
      prompt: "Input the number of times to paste selected text."
    }

    const input = vscode.window.showInputBox(opt)

    if (!input) {
      console.log(`Aborting: input='${input}'`)
      return
    }

    input.then(function (val) {
      // Convert string to int
      // console.log(`val=${val}`)
      let inputAsNumber = parseInt(val, 10)

      if (!inputAsNumber) {
        // If nothing entered default to pasting selected text inplace
        inputAsNumber = 1
      }
      // console.log(`inputAsNumber=${inputAsNumber}`)

      const newPositions = []

      let textEditor = vscode.window.activeTextEditor
      textEditor.edit
        (
          function (builder) {
            textEditor.selections.forEach(selection => {
              // console.log(`GML: selection=${JSON.stringify(selection)}`)
              // Get selected text
              const text = textEditor.document.getText(new vscode.Range(selection.start, selection.end))
              // console.log(`text.length=${text.length}: text='${text}'`)

              const numLines = text.split(/\r\n|\r|\n/).length

              if ((text.length * inputAsNumber) > MAX_LENGTH) {
                let msg = "Final text length exceeds max of " + MAX_LENGTH.toString() + "on line " + selection.start.line + "."
                vscode.window.showErrorMessage(msg)
                return
              }

              // Build string to insert
              let str = ""
              for (let i = 0; i < inputAsNumber; i++) {
                str += text
                newPositions.push([selection.end.line + (numLines - 1) * i, selection.start.character])
                // let cursorPosition = new vscode.Position(selection.end.line + (numLines - 1) * i, selection.start.character)
                // console.log(`GML: cursorPosition=${JSON.stringify(cursorPosition)}`)
                // let newSelection = new vscode.Selection(cursorPosition, cursorPosition)
                // console.log(`GML: newSelection=${JSON.stringify(newSelection)}`)
                // newSelections.push(newSelection)
              }
              // console.log(`str='${str}'`)

              // Replace selected text with repeated text
              builder.replace(selection, str)

              // // Reset cursor position
              // let cursorPosition = new vscode.Position(selection.end.line, selection.start.character)
              // console.log(`GML: cursorPosition=${JSON.stringify(cursorPosition)}`)
              // let newSelection = new vscode.Selection(cursorPosition, cursorPosition)
              // console.log(`GML: newSelection=${JSON.stringify(newSelection)}`)
              // newSelections.push(newSelection)
            })

          }
        )

      const newSelections = []
      newPositions.forEach((v) => {
        let cursorPosition = new vscode.Position(v[0], v[1])
        // console.log(`GML: cursorPosition=${JSON.stringify(cursorPosition)}`)
        let newSelection = new vscode.Selection(cursorPosition, cursorPosition)
        // console.log(`GML: newSelection=${JSON.stringify(newSelection)}`)
        newSelections.push(newSelection)
      })

      textEditor.selection = newSelections[0]
      textEditor.selections = newSelections
    })
  })

  context.subscriptions.push(disposable)
}

// this method is called when your extension is deactivated
const deactivate = () => { }

module.exports = {
  activate,
  deactivate,
}
