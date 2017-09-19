import DomRender from "./../core/helper/dom-render";
import Background from "./../core/dom/controls/background";
import Container from "./../core/dom/controls/container";
import Chart from "./../core/dom/controls/chart";
import Base from "../core/dom/controls/base";
import events = require('events')

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