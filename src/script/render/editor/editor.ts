import DomRender from "../helper/dom-render";
import DOMContainer from "../element/dom/dom-container";
import Transform from "../helper/transform";

import * as events from 'events';
import Base from "../element/base";

/**
 * 基本的编辑框类
 * 
 * @export
 * @class Editor
 * @extends {events.EventEmitter}
 */
export default class Editor extends events.EventEmitter {
  protected domRender: DomRender
  protected node: Base
  protected transform: Transform
  protected el: any

  constructor() {
    super()
  }

  onSelectNode(o: Base) {

  }

  resize() {
    this.transform.setMap(this.el.offsetWidth)
  }

  invoke(cmd, ...args) {
    cmd = cmd.replace(/-(\S)/g, function (m, m1) { return m1.toLocaleUpperCase(); })
    if (this[cmd]) {
      this[cmd](...args)
    }
  }
}