import diff from 'virtual-dom/diff';
import patch from 'virtual-dom/patch';
import create from 'virtual-dom/create-element';
import { VNode } from 'virtual-dom';

export default class DomRender {
  private el: Element
  private tree: VNode
  private rootNode: Element
  constructor(dom: Element) {
    this.el = dom
  }
  create(tree) {
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