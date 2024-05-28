const assert = require('assert')

const vscode = require('vscode')
const repeatSelection = require('../extension.js')

suite('Repeat Selection Test Suite', () => {
  vscode.window.showInformationMessage('Start all tests.')

  // The following tests all operate on a theoretical buffer with 4 lines:
  // line 1
  // line 2
  // line 3
  //

  const tests = [
    {
      name: 'forward-select entire line 2 including newline',
      numCopies: 3,
      text: 'line 2\n',
      numLines: 2,
      selection: {
        start: { line: 1, character: 0 },
        end: { line: 2, character: 0 },
        active: { line: 2, character: 0 },
        anchor: { line: 1, character: 0 },
      },
      want: 'line 2\nline 2\nline 2\n',
      wantNewPositions: [[2, 0], [3, 0], [4, 0]],
    },
    {
      name: 'forward-select line 2 start to end',
      numCopies: 3,
      text: 'line 2',
      numLines: 1,
      selection: {
        start: { line: 1, character: 0 },
        end: { line: 1, character: 6 },
        active: { line: 1, character: 6 },
        anchor: { line: 1, character: 0 },
      },
      want: 'line 2line 2line 2',
      wantNewPositions: [[1, 6], [1, 12], [1, 18]],
    },
  ]

  tests.forEach((tt) => {
    test(tt.name, () => {
      const newPositions = []
      const got = repeatSelection.processSelection({
        numCopies: tt.numCopies,
        text: tt.text,
        numLines: tt.numLines,
        selection: tt.selection,
        newPositions,
      })
      assert.strictEqual(got, tt.want)
      assert.deepStrictEqual(newPositions, tt.wantNewPositions)
    })
  })
})
