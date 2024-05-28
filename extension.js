const vscode = require('vscode')

// Maximum length of pasted string (per selection).
const MAX_LENGTH = 10000000

/**
 * @param {vscode.ExtensionContext} context
 */
const activate = (context) => {
  console.log('Congratulations, your extension "repeat-selection" is now active!')

  const disposable = vscode.commands.registerCommand('repeat-selection.repeatSelection', () => {
    const opt = {
      placeHolder: 'default: 1',
      prompt: 'Input the number of times to paste selected text.',
    }
    const input = vscode.window.showInputBox(opt)  // get user input
    if (!input) {
      console.log(`Aborting: input='${input}'`)
      return
    }

    input.then((val) => {
      // Convert string to int
      // console.log(`val=${val}`)
      const numCopies = parseInt(val, 10) || 1
      // console.log(`numCopies=${numCopies}`)

      const newPositions = []

      const textEditor = vscode.window.activeTextEditor
      textEditor.edit((builder) => {
        textEditor.selections.forEach(selection => {
          console.log(`GML: selection=${JSON.stringify(selection)}`)
          // Get selected text
          const text = textEditor.document.getText(new vscode.Range(selection.start, selection.end))
          console.log(`text.length=${text.length}: text='${text}'`)

          if ((text.length * numCopies) > MAX_LENGTH) {
            const msg = 'Final text length exceeds max of ' + MAX_LENGTH.toString() + 'on line ' + selection.start.line + '.'
            vscode.window.showErrorMessage(msg)
            return
          }

          const str = processSelection({ numCopies, text, selection, newPositions })

          // Replace selected text with repeated text
          builder.replace(selection, str)
        })
      })

      const newSelections = []
      newPositions.forEach((v) => {
        const cursorPosition = new vscode.Position(v[0], v[1])
        console.log(`GML: [${v[0]},${v[1]}] => cursorPosition=${JSON.stringify(cursorPosition)}`)
        const newSelection = new vscode.Selection(cursorPosition, cursorPosition)
        console.log(`GML: newSelection=${JSON.stringify(newSelection)}`)
        newSelections.push(newSelection)
      })

      textEditor.selection = newSelections[0]
      textEditor.selections = newSelections
    })
  })

  context.subscriptions.push(disposable)
}

const processSelection = ({ numCopies, text, selection, newPositions }) => {
  const numLines = Math.abs(selection.end.line - selection.start.line)
  const charDiff = numLines === 0 ? Math.abs(selection.end.character - selection.start.character) : 0
  let str = ''
  for (let i = 0; i < numCopies; i++) {
    str += text
    const linePos = selection.active.line + numLines * i
    const charPos = selection.active.character + charDiff * i
    newPositions.push([linePos, charPos])
  }
  return str
}

// this method is called when your extension is deactivated
const deactivate = () => { }

module.exports = {
  activate,
  deactivate,
  processSelection,
}
