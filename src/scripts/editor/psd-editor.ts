import DomRender from "../core/helper/dom-render";

import * as events from 'events'
import * as h from 'virtual-dom/h'

export default class PSDEditor extends events.EventEmitter {
  public static initialize(): PSDEditor {
    return new PSDEditor()
  }

  private domRender: DomRender
  private node: any

  constructor() {
    super()

    this.domRender = new DomRender(document.querySelector('.source'))
    this.domRender.create(this.render())
    // this.node.on('onselecthandler', o => this.onSelectNode(o))
  }

  onSelectNode(o: any) {

  }

  render() {
    return h('div.upload', {
      style: {
        position: 'relative',
        height: '100%',
        width: '100%'
      }
    }, [
        h('span'),
        h('button', null, '选择PSD文件')
      ])
  }
}