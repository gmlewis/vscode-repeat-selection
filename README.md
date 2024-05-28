# repeat-selection README

`Repeat Selection` copies selected text and pastes repeatedly based on user input.
It functions similarly to Vim yank, paste, and repeat.
For example, in Vim you would select the characters you want to copy then type `30p`
to paste the selected text 30 times.

In VSCode, you highlight your selection (using single or multiple cursors), then run
"Repeat Selection" (using either Cmd-Shift-P or Ctrl-Shift-P) and enter the number
of times (N) you want the selection(s) to be repeated.
The selected text will be repeated and you will now have N-times more cursors
than you previously had, one at the start or end of each selection's repeated text
(based on its starting position upon invoking the extension).

This was originally based on:
https://marketplace.visualstudio.com/items?itemName=nwbjjbb.repeat-paste
but has been fairly heavily modified.

## Building

To build this plugin, run:

```bash
$ ./build.sh
```

## Testing

To test this plugin, run:

```bash
$ ./test-all.sh
```

## Packaging

To package this plugin for use with VSCode, run:

```bash
$ ./package.sh
```

You will then have a file called `repeat-selection-0.1.0.vsix` that you can
install directly into VSCode as an extention:

* Click on Extensions
* Click the 3 dots to the right of the word "Extensions"
* Select "Install from VSIX..."
* Find the file `repeat-selection-0.1.0.vsix` and click "Open"

The plugin is now installed and is called "Repeat Selection".

### 0.1.0

Initial release of repeat-selection
