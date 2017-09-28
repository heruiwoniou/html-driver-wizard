import { ipcRenderer } from 'electron';
import HtmlEditor from './editor/html-editor'
import PSDEditor from './editor/psd-editor';
import Bar from './bar/index';

import { addClass, removeClass, setStyle } from 'wind-dom';

let htmlEditor, psdEditor
let htmlbar, psdbar
let html, source
let graphic = {
  run() {

    html = document.querySelector('.html')
    source = document.querySelector('.psd')



    this.initialize();
    this.registerEvent();
  },
  initialize() {
    htmlEditor = HtmlEditor.initialize()
    psdEditor = PSDEditor.initialize()

    htmlbar = new Bar(
      [
        { name: '清空', cls: 'fa fa-trash-o', cmd: 'html-remove' }
      ]
    ).mount(document.querySelector('.html-toolbar'))

    psdbar = new Bar(
      [
        { name: '清空', cls: 'fa fa-trash-o', cmd: 'psd-remove' }
      ]
    ).mount(document.querySelector('.psd-toolbar'))

  },
  registerEvent() {

    psdbar.on('click', (e, ...args) => psdEditor.emit(...args))

    document.querySelector('header a.fa-close').addEventListener('click', function () {
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