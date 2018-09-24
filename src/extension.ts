'use strict';
import { window, commands, ExtensionContext, TextEditor, Range } from 'vscode';

export function activate(context: ExtensionContext) {
    // ルビ記法を括弧書きに変換
    commands.registerCommand('extension.rubyNotationToParentheses', () => {
        if (window.activeTextEditor) {
            replaceRuby(window.activeTextEditor, /｜([^《]+?)《(.+?)》/g, rubyNotationToParentheses);
        }
    });
}

function rubyNotationToParentheses(match: any): string{
    return `${match[1]}（${match[2]}）`;
}

// 置換
function replaceRuby(editor: TextEditor, regEx:RegExp, newSubStrFunc:Function): Promise<boolean> {
    return new Promise((resolve, reject) => {
        editor.edit((editBuilder) => {
            const document = editor.document;
            const text = document.getText();
            let match;
            while (match = regEx.exec(text)) {
                editBuilder.replace(
                    new Range(document.positionAt(match.index), document.positionAt(match.index + match[0].length)),
                    newSubStrFunc(match)
                );
            }
        }).then(success => {
            resolve();
        });
    });
}

export function deactivate() {
}