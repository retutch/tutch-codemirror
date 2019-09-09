Tutch Component
===============
A [CodeMirror](https://codemirror.net/) component for [Tutch](https://github.com/retutch/tutch).

Creating a Tutch component
--------------------------
A Tutch component is created by passing in a `host` element that will host the component, a `url` where the [tutch-worker](https://github.com/retutch/tutch-worker) javascript file is located, and an instance of the [CodeMirror](https://codemirror.net/) library.

``` typescript
import Tutch from 'tutch';

Tutch({
    host: document.getElementById('host'),
    url: '/worker.js',
    codemirror: CodeMirror,
});
```

In addition, there are a number of optional arguments:

 - `text: string` - the initial text in the editor
 - `onSuccess: (justs: Justification[]) => void` - A callback called whenever Tutch successfully parses and check a file.
 - `onError: (errorMessage: string, loc: SourceLocation | null) => void` - A callback called whenever Tutch runs into a syntax error
 - `onUpdate: (text: string) => void` - A callback called whenever the text inside the editor changes

Styling a Tutch component
-------------------------
The component will only look right if you include the CSS file for [CodeMirror](https://codemirror.net/) in your code and give styles to the following four classes:

 - `TutchSyntaxError` - Style for syntax errors
 - `TutchJustified` - Style for propositions that are justified
 - `TutchNotJustified` - Style for propositions that are not justified

A example and reasonable set of defaults are at `demo/tutch.css`.

Demo
----
You can see the component in action by downloading this repository, running

``` shell
npm i
npm start
```

and going to http://localhost:8080/.