import * as diff from 'virtual-dom/diff';
import * as patch from 'virtual-dom/patch';
import * as create from 'virtual-dom/create-element';
import { VNode } from 'virtual-dom';
import { forEach } from './../utils';

export default class DomRender {
  public el: Element
  private tree: VNode
  private rootNode: Element
  constructor(dom: Element) {
    this.el = dom
  }
  create(tree) {
    forEach(this.el.childNodes, el => this.el.removeChild(el))
    this.tree = tree
    this.rootNode = create(tree)
    this.el.appendChild(this.rootNode)
  }

  update(tree) {
    let patches = diff(this.tree, tree)
    this.rootNode = patch(this.rootNode, patches)
    this.tree = tree
  }

}