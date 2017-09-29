import DomRender from "./../helper/dom-render";
import DOMContainer from "../element/dom/dom-container";
import Base from "../element/base";
import Transform from "../helper/transform";
import Editor from "./editor";

import * as events from 'events'
import * as conf from './../../conf';

/**
 * HTML编辑框
 * 
 * @export
 * @class HtmlEditor
 * @extends {Editor}
 */
export default class HtmlEditor extends Editor {

  public static initialize(): HtmlEditor {
    return new HtmlEditor()
  }


  protected node: DOMContainer

  constructor() {
    super()
    this.el = document.querySelector('.html')
    this.domRender = new DomRender(document.querySelector('.html'))
    this.node = new DOMContainer()
    this.transform = new Transform(conf.view.mainWidth, this.el.offsetWidth, 'px')
    this.node.setTransform(this.transform)
    this.domRender.create(this.node.render())


    this.node.on('onselecthandler', o => this.onSelectNode(o))
  }

  resize() {
    super.resize()
    this.domRender.update(this.node.render())
  }
}