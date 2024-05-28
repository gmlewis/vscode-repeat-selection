const assert = require('assert')

const vscode = require('vscode')
// const repeatSelection = require('../extension.js')

suite('Repeat Selection Test Suite', () => {
  vscode.window.showInformationMessage('Start all tests.')

  test('Sample test', () => {
    assert.strictEqual(-1, [1, 2, 3].indexOf(5))
    assert.strictEqual(-1, [1, 2, 3].indexOf(0))
  })
})
