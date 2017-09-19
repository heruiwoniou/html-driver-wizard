import HtmlEditor from './editor/html-editor'

let graphic = {
  run() {
    HtmlEditor.initialize()
  }
}

window.addEventListener('load', function () {
  graphic.run()
});

export default graphic