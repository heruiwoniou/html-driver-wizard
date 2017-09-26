import HtmlEditor from './editor/html-editor'
import { ipcRenderer } from 'electron';
import PSDEditor from './editor/psd-editor';

let graphic = {
  run() {
    this.registerEvent();
    this.initialize();
  },
  initialize() {
    HtmlEditor.initialize()
    PSDEditor.initialize()
  },
  registerEvent() {
    document.querySelector('header a').addEventListener('click', function () {
      ipcRenderer.sendSync('win-close')
    })
  }
}

window.addEventListener('load', function () {
  graphic.run()
});

export default graphic