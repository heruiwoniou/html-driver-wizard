import DomRender from "../core/helper/dom-render";
import { ipcRenderer } from 'electron';
import conf from '../../conf/index';

import * as  path from 'path';
import * as PSD from 'psd';
import * as events from 'events';
import * as h from 'virtual-dom/h';
import Tree from "../core/element/psd/tree";

export default class PSDEditor extends events.EventEmitter {
  public static initialize(): PSDEditor {
    return new PSDEditor()
  }

  private domRender: DomRender
  private node: any
  private psd: any

  constructor() {
    super()

    this.domRender = new DomRender(document.querySelector('.source'))
    this.domRender.create(this.render())
    // this.node.on('onselecthandler', o => this.onSelectNode(o))

    ipcRenderer.on('selected-file', (event, files) => {
      if (files.length > 0) {
        this.analysis(files.pop())
      }
    })
  }

  async analysis(filename) {
    this.psd = await PSD.open(filename)
    this.node = new Tree(this.psd)
    this.domRender.update(this.render())
  }

  onSelectNode(o: any) {
  }

  onSelectFile() {
    ipcRenderer.send('open-file-dialog')
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