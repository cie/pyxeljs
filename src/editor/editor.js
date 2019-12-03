var editor = CodeMirror.fromTextArea(document.getElementById('code'), {
  parserfile: ['parsepython.js'],
  autofocus: true,
  theme: 'solarized dark',
  //path: "static/env/codemirror/js/",
  lineNumbers: true,
  textWrapping: false,
  indentUnit: 4,
  height: '160px',
  fontSize: '9pt',
  autoMatchParens: true,
  extraKeys: {
    'Ctrl-Enter': runit,
    'Shift-Enter': runit
  },
  parserConfig: { pythonVersion: 2, strictErrors: true }
})
editor.setValue(localStorage.getItem('code') || '')

editor.on('change', function () {
  window.localStorage.setItem('code', editor.getValue())
})

function outf (text, error = false) {
  var mypre = document.getElementById('output')
  mypre.innerHTML =
    mypre.innerHTML +
    (error ? '<span class="text-red-500">' : '') +
    text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;') +
    (error ? '<span class="text-red-500">' : '')
  mypre.scrollTop = mypre.scrollHeight - mypre.offsetHeight
}

function runit () {
  document.getElementById('output').innerHTML = ''
  if (Sk.interrupters) {
    Sk.interrupters.forEach(i => i())
    Sk.interrupters.splice(0)
  }
  Sk.interrupters = []
  Sk.configure({
    output: outf,
    read: builtinRead,
    __future__: Sk.python3
    /*setTimeout: function (fn, delay) {
      // TODO where to throw SystemExit?
      const interrupter = () => {
        clearTimeout(timeout)
        const i = Sk.interrupters.indexOf(interrupter)
        if (~i) Sk.interrupters.splice(i, 1)
      }
      const timeout = setTimeout(() => {
        const i = Sk.interrupters.indexOf(interrupter)
        if (~i) Sk.interrupters.splice(i, 1)
        fn()
      }, delay)
    }*/
  })
  Sk.canvas = 'canvas'
  Sk.canvas_container = 'canvas_container'
  Sk.pre = 'output'
  try {
    Sk.misceval
      .asyncToPromise(function () {
        return Sk.importMainWithBody('<stdin>', false, editor.getValue(), true)
      })
      .catch(outputError)
  } catch (e) {
    outputError(e)
  }
}

function outputError (e) {
  if (e instanceof Sk.builtin.SystemExit) {
    return
  }
  console.log(e)
  outf(e.toString() + ' in ' + e.traceback[0].filename + '\n', true)
}

function builtinRead (x) {
  if (
    Sk.builtinFiles === undefined ||
    Sk.builtinFiles['files'][x] === undefined
  )
    throw "File not found: '" + x + "'"
  return Sk.builtinFiles['files'][x]
}
