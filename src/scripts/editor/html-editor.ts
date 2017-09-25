import DomRender from "./../core/helper/dom-render";
import * as events from 'events'
import Background from "../core/element/dom/background";
import Base from "../core/element/base";

export default class HtmlEditor extends events.EventEmitter {

  public static initialize(): HtmlEditor {
    return new HtmlEditor()
  }
  private domRender: DomRender
  private node: Background

  constructor() {
    super()
    this.domRender = new DomRender(document.querySelector('.html'))
    this.node = new Background()
    this.domRender.create(this.node.render())

    this.node.on('onselecthandler', o => this.onSelectNode(o))
  }

  onSelectNode(o: Base) {

  }
}