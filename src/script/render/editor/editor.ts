import DomRender from "../core/helper/dom-render";
import DOMContainer from "../core/element/dom/dom-container";
import Transform from "../core/helper/transform";

import * as events from 'events';
import Base from "../core/element/base";

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
}