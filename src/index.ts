import Tutch from 'tutch-worker';
import CodeMirror from 'codemirror';
import { Justification, SourceLocation } from 'tutch';

/**
 * Wrap the CodeMirror markText functionality to work with an esprima-style SourceLocation
 */
function markText(
    doc: CodeMirror.Doc,
    loc: SourceLocation,
    options?: CodeMirror.TextMarkerOptions
): CodeMirror.TextMarker {
    return doc.markText(
        { line: loc.start.line - 1, ch: loc.start.column - 1 },
        { line: loc.end.line - 1, ch: loc.end.column - 1 },
        options
    );
}

/**
 * Create a Tutch CodeMirror element.
 *
 * CodeMirror itself is a big honkin' thing. Sometimes you want to just load
 * `codemirror.js`, sometimes you want to import codemirror and have webpack
 * take care of it. I don't know which one is better, so whatever you do, just
 * pass the `CodeMirror` builder object to the function.
 *
 * The optional text is the initial program,
 */
export default function TutchCode(options: {
    url: string;
    host: HTMLElement;
    codemirror: (host: HTMLElement, options: CodeMirror.EditorConfiguration) => CodeMirror.Editor;

    text?: string;
    onSuccess?: (justs: Justification[]) => void;
    onError?: (errorMessage: string, loc: SourceLocation | null) => void;
}) {
    const { url, host, codemirror } = options;
    const initialText = options.text || '';
    const onSuccess = options.onSuccess || (() => {});
    const onError = options.onError || (() => {});

    let tutch: (text: string) => void;
    let value = initialText;
    const editor = codemirror(host, {
        value,
        lineNumbers: true,
    });
    const doc = editor.getDoc();
    editor.on('update', () => {
        const text = editor.getValue();
        if (text !== value) {
            value = text;
            doc.getAllMarks().forEach(mark => mark.clear());
            tutch(text);
        }
    });

    tutch = Tutch({
        url,
        onSuccess: justifications => {
            justifications.forEach(justification => {
                if (justification.loc) {
                    if (justification.type === 'Justified') {
                        markText(doc, justification.loc, { className: 'TutchJustified' });
                    } else {
                        markText(doc, justification.loc, { className: 'TutchNotJustified' });
                    }
                }
            });
            onSuccess(justifications);
        },
        onError: (errorMessage, loc) => {
            if (loc) {
                markText(doc, loc, { className: 'TutchSyntaxError' });
            }
            onError(errorMessage, loc);
        },
    });
    tutch(value);
}
