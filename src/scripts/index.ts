import HtmlEditor from './editor/html-editor'
import { ipcRenderer } from 'electron';

let graphic = {
  run() {
    document.querySelector('header a').addEventListener('click', function () {
      ipcRenderer.sendSync('win-close')
    })
    HtmlEditor.initialize()
  }
}

window.addEventListener('load', function () {
  graphic.run()
});

export default graphic