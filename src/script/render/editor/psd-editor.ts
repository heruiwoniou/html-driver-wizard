import DomRender from "../helper/dom-render";
import { ipcRenderer } from 'electron';
import Tree from "../element/psd/tree";
import Editor from "./editor";
import Transform from "../helper/transform";
import { draggable } from '../utils';

import * as conf from '../../conf';
import * as  path from 'path';
import * as PSD from 'psd';
import * as events from 'events';
import * as h from 'virtual-dom/h';

/**
 * PSD呈现及编辑框
 * 
 * @export
 * @class PSDEditor
 * @extends {Editor}
 */
export default class PSDEditor extends Editor {
  public static initialize(): PSDEditor {
    return new PSDEditor()
  }

  private psd: any

  protected node: Tree

  spacePress: false

  constructor() {
    super()


    this.el = document.querySelector('.psd')
    this.domRender = new DomRender(this.el)
    this.transform = new Transform(conf.view.mainWidth, this.el.offsetWidth, 'px')

    this.domRender.create(this.render())

    ipcRenderer.on('selected-file', (event, files) => {
      if (files.length > 0) {
        this.analysis(files.pop())
      }
    })

    this.initDrag()
  }

  initDrag() {
    let ox, oy, tx, ty
    draggable(this.el, {
      start: (e) => {
        if (this.spacePress && this.node) {
          ox = e.clientX;
          oy = e.clientY;
        }
      },
      drag() {
        if (this.spacePress && this.node) {

        }
      },
      end() { }
    })
  }

  psdRemove(): any {
    if (this.node) this.node.destroy()
    this.node = null;
    this.domRender.create(this.render())
  }

  clearAllLayers() {
    if (this.node) this.node.clearAllLayers()
  }

  exportLayerImages() {
    if (this.node) this.node.exportLayerImages()
  }

  async analysis(filename) {
    this.psd = await PSD.open(filename)
    this.transform.setOrignal(this.psd.tree().width)
    this.node = new Tree(this.psd, this.transform)
    this.domRender.update(this.render())
  }


  onSelectFile() {
    ipcRenderer.send('open-file-dialog')
  }

  resize() {
    super.resize()
    this.domRender.update(this.render())
  }

  render() {
    if (this.node) {
      return this.node.render()
    } else {
      return h('div.ts-psd-upload', {
        style: {
          position: 'relative',
          height: '100%',
          width: '100%'
        }
      }, [
          h('span'),
          h('button', {
            onclick: () => this.onSelectFile()
          }, '选择PSD文件')
        ])
    }
  }
}