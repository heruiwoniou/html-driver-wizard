import HtmlEditor from './editor/html-editor'
import { ipcRenderer } from 'electron';
import PSDEditor from './editor/psd-editor';

import { addClass, removeClass, setStyle } from 'wind-dom';

let htmlEditor, psdEditor
let html, source
let graphic = {
  run() {

    html = document.querySelector('.html')
    source = document.querySelector('.source')

    this.initialize();
    this.registerEvent();
  },
  initialize() {
    htmlEditor = HtmlEditor.initialize()
    psdEditor = PSDEditor.initialize()
  },
  registerEvent() {
    document.querySelector('header a').addEventListener('click', function () {
      ipcRenderer.sendSync('win-close')
    })
    let resizeTime
    window.addEventListener('resize', function () {
      addClass(html, 'resize')
      addClass(source, 'resize')
      setStyle(source.querySelector('img'), 'display', 'none')
      clearTimeout(resizeTime)
      resizeTime =
        setTimeout(() => {
          htmlEditor.resize()
          psdEditor.resize()
          removeClass(html, 'resize')
          removeClass(source, 'resize')
        }, 200);
    })
  }
}

window.addEventListener('load', function () {
  setTimeout(() =>
    graphic.run()
  )
});

export default graphic