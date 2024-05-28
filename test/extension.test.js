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
      name: 'reverse-select entire line 2 including newline',
      numCopies: 3,
      text: 'line 2\n',
      selection: {
        start: { line: 2, character: 0 },
        end: { line: 1, character: 0 },
        active: { line: 1, character: 0 },
        anchor: { line: 1, character: 0 },
      },
      want: 'line 2\nline 2\nline 2\n',
      wantNewPositions: [[1, 0], [2, 0], [3, 0]],
    },
    {
      name: 'forward-select line 2 start to end',
      numCopies: 3,
      text: 'line 2',
      selection: {
        start: { line: 1, character: 0 },
        end: { line: 1, character: 6 },
        active: { line: 1, character: 6 },
        anchor: { line: 1, character: 0 },
      },
      want: 'line 2line 2line 2',
      wantNewPositions: [[1, 6], [1, 12], [1, 18]],
    },
    {
      name: 'reverse-select line 2 end to start',
      numCopies: 3,
      text: 'line 2',
      selection: {
        start: { line: 1, character: 6 },
        end: { line: 1, character: 0 },
        active: { line: 1, character: 0 },
        anchor: { line: 1, character: 0 },
      },
      want: 'line 2line 2line 2',
      wantNewPositions: [[1, 0], [1, 6], [1, 12]],
    },
    {
      name: 'forward-select line 1 and part of line 2',
      numCopies: 3,
      text: 'line 1\n line ',
      selection: {
        start: { line: 0, character: 0 },
        end: { line: 1, character: 5 },
        active: { line: 1, character: 5 },
        anchor: { line: 0, character: 0 },
      },
      want: 'line 1\n line line 1\n line line 1\n line ',
      wantNewPositions: [[1, 5], [2, 5], [3, 5]],
    },
  ]

  tests.forEach((tt) => {
    test(tt.name, () => {
      const newPositions = []
      const got = repeatSelection.processSelection({
        numCopies: tt.numCopies,
        text: tt.text,
        selection: tt.selection,
        newPositions,
      })
      assert.strictEqual(got, tt.want)
      assert.deepStrictEqual(newPositions, tt.wantNewPositions)
    })
  })
})
